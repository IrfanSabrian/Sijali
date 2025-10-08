export const useApiService = () => {
  const config = useRuntimeConfig();

  const apiBaseUrl = config.public.apiBaseUrl || "http://localhost:3001";
  const apiUrl = config.public.apiUrl || "http://localhost:3001/api";

  // Fetch roads data from backend API
  const fetchRoads = async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();

      // Add pagination
      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);

      // Add filters
      if (params.kecamatan) queryParams.append("kecamatan", params.kecamatan);
      if (params.desa) queryParams.append("desa", params.desa);
      if (params.kondisi) queryParams.append("kondisi", params.kondisi);
      if (params.tahun) queryParams.append("tahun", params.tahun);
      if (params.search) queryParams.append("search", params.search);

      const url = `${apiUrl}/jalan${
        queryParams.toString() ? "?" + queryParams.toString() : ""
      }`;

      const response = await $fetch(url);

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch roads");
      }

      return {
        success: true,
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      console.error("Error fetching roads:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch roads",
      };
    }
  };

  // Fetch road statistics
  const fetchRoadStats = async () => {
    try {
      const response = await $fetch(`${apiUrl}/jalan/stats/summary`);

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch road stats");
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching road stats:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch road stats",
      };
    }
  };

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      const response = await $fetch(`${apiUrl}/jalan/filters/options`);

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch filter options");
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching filter options:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch filter options",
      };
    }
  };

  // Fetch road geometry
  const fetchRoadGeometry = async (id) => {
    try {
      const response = await $fetch(`${apiUrl}/jalan/${id}/geometry`);

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch road geometry");
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching road geometry:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch road geometry",
      };
    }
  };

  // Convert road data to GeoJSON format for map display
  const convertRoadsToGeoJSON = (roads) => {
    const features = roads.map((road) => {
      // Data sudah dalam format longitude/latitude (WGS84)
      // Tidak perlu konversi UTM
      const coordinates = [
        [road.utmXAwal, road.utmYAwal], // Longitude, Latitude
        [road.utmXAkhi, road.utmYAkhi], // Longitude, Latitude
      ];

      return {
        type: "Feature",
        properties: {
          id: road.id,
          fid: road.fid,
          noRuas: road.noRuas,
          nama: road.nama,
          namaJalan: road.namaJalan,
          panjangM: road.panjangM,
          lebarM: road.lebarM,
          tahun: road.tahun,
          kondisi: road.kondisi,
          nilai: road.nilai,
          bobot: road.bobot,
          keterangan: road.keterangan,
          kecamatan: road.kecamatan,
          desa: road.desa,
          pngnlAwal: road.pngnlAwal,
          pngnlAkhi: road.pngnlAkhi,
          shapeLeng: road.shapeLeng,
        },
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      };
    });

    return {
      type: "FeatureCollection",
      features: features,
    };
  };

  return {
    fetchRoads,
    fetchRoadStats,
    fetchFilterOptions,
    fetchRoadGeometry,
    convertRoadsToGeoJSON,
  };
};
