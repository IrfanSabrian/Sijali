import { ref, reactive } from "vue";

// Global state for data management
const availableDatasets = ref([]);
const loadedLayers = reactive(new Map());
const isLoading = ref(false);
const error = ref(null);

export const useDataService = () => {
  // Kecamatan data structure based on folder structure
  const kecamatanData = [
    {
      id: "sungai_kakap",
      name: "Kecamatan Sungai Kakap",
      code: "01",
      jsonFile:
        "/02. PETA TEMATIK/01. KECAMATAN SUNGAI KAKAP/KECAMATAN SUNGAI KAKAP.json",
      center: [109.3425, -0.0263],
      zoom: 12,
      desas: [
        { id: "jeruju_besar", name: "Desa Jeruju Besar" },
        { id: "kali_mas", name: "Desa Kali Mas" },
        { id: "pal_sembilan", name: "Desa Pal Sembilan" },
        { id: "parit_keladi", name: "Desa Parit Keladi" },
        { id: "punggur_besar", name: "Desa Punggur Besar" },
        { id: "punggur_kapuas", name: "Desa Punggur Kapuas" },
        { id: "punggur_kecil", name: "Desa Punggur Kecil" },
        { id: "rengas_kapuas", name: "Desa Rengas Kapuas" },
        { id: "sungai_belidak", name: "Desa Sungai Belidak" },
        { id: "sungai_itik", name: "Desa Sungai Itik" },
        { id: "sungai_kakap", name: "Desa Sungai Kakap" },
        { id: "sungai_kupah", name: "Desa Sungai Kupah" },
        { id: "sungai_rengas", name: "Desa Sungai Rengas" },
        { id: "tanjung_saleh", name: "Desa Tanjung Saleh" },
      ],
    },
    {
      id: "batu_ampar",
      name: "Kecamatan Batu Ampar",
      code: "02",
      jsonFile:
        "/02. PETA TEMATIK/02. KECAMATAN BATU AMPAR/KECAMATAN BATU AMPAR.json",
      center: [109.4425, -0.1263],
      zoom: 12,
      desas: [],
    },
    {
      id: "kuala_mandor",
      name: "Kecamatan Kuala Mandor",
      code: "03",
      jsonFile:
        "/02. PETA TEMATIK/03. KECAMATAN KUALA MANDOR/KECAMATAN KUALA MANDOR.json",
      center: [109.2425, -0.2263],
      zoom: 12,
      desas: [],
    },
    {
      id: "kubu",
      name: "Kecamatan Kubu",
      code: "04",
      jsonFile: "/02. PETA TEMATIK/04. KECAMATAN KUBU/KECAMATAN KUBU.json",
      center: [109.5425, -0.3263],
      zoom: 12,
      desas: [],
    },
    {
      id: "sungai_ambawang",
      name: "Kecamatan Sungai Ambawang",
      code: "05",
      jsonFile:
        "/02. PETA TEMATIK/05. KECAMATAN SUNGAI AMBAWANG/KECAMATAN SUNGAI AMBAWANG.json",
      center: [109.1425, -0.4263],
      zoom: 12,
      desas: [],
    },
    {
      id: "sungai_raya",
      name: "Kecamatan Sungai Raya",
      code: "06",
      jsonFile:
        "/02. PETA TEMATIK/06. KECAMATAN SUNGAI RAYA/KECAMATAN SUNGAI RAYA.json",
      center: [109.6425, -0.5263],
      zoom: 12,
      desas: [],
    },
    {
      id: "teluk_pakedai",
      name: "Kecamatan Teluk Pakedai",
      code: "07",
      jsonFile:
        "/02. PETA TEMATIK/07. KECAMATAN TELUK PAKEDAI/KECAMATAN TELUK PAKEDAI.json",
      center: [109.7425, -0.6263],
      zoom: 12,
      desas: [],
    },
    {
      id: "terentang",
      name: "Kecamatan Terentang",
      code: "08",
      jsonFile:
        "/02. PETA TEMATIK/08. KECAMATAN TERENTANG/KECAMATAN TERENTANG.json",
      center: [109.8425, -0.7263],
      zoom: 12,
      desas: [],
    },
    {
      id: "rasau_jaya",
      name: "Kecamatan Rasau Jaya",
      code: "09",
      jsonFile:
        "/02. PETA TEMATIK/09. KECAMATAN RASAU JAYA/KECAMATAN RASAU JAYA.json",
      center: [109.9425, -0.8263],
      zoom: 12,
      desas: [],
    },
  ];

  // Initialize available datasets
  const initializeDatasets = () => {
    availableDatasets.value = kecamatanData;
  };

  // Load GeoJSON data from file
  const loadGeoJSONData = async (filePath) => {
    isLoading.value = true;
    error.value = null;

    try {
      // In a real application, you would fetch from the server
      // For now, we'll simulate the data structure
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      error.value = `Failed to load data: ${err.message}`;
      console.error("Error loading GeoJSON:", err);

      // Return mock data for demonstration
      return generateMockGeoJSON(filePath);
    } finally {
      isLoading.value = false;
    }
  };

  // Generate mock GeoJSON data for demonstration
  const generateMockGeoJSON = (filePath) => {
    const kecamatanName =
      filePath.split("/")[3]?.replace(/^\d+\.\s*/, "") || "Unknown";

    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          id: 1,
          geometry: {
            type: "LineString",
            coordinates: [
              [109.3365, -0.108],
              [109.3372, -0.1086],
              [109.3378, -0.1091],
            ],
          },
          properties: {
            FID: 1,
            No_Ruas: "611292009001",
            Nama_Jalan: "Jl. Contoh " + kecamatanName,
            Panjang_M: 150.5,
            Lebar_m_: 3.5,
            Kondisi: "Baik",
            Keterangan: "Jalan Aspal",
            Kecamatan: kecamatanName,
            Tahun: "2022",
          },
        },
        {
          type: "Feature",
          id: 2,
          geometry: {
            type: "LineString",
            coordinates: [
              [109.3378, -0.1091],
              [109.3385, -0.1095],
              [109.3392, -0.11],
            ],
          },
          properties: {
            FID: 2,
            No_Ruas: "611292009002",
            Nama_Jalan: "Jl. Demo " + kecamatanName,
            Panjang_M: 200.3,
            Lebar_m_: 4.0,
            Kondisi: "Sedang",
            Keterangan: "Jalan Beton",
            Kecamatan: kecamatanName,
            Tahun: "2021",
          },
        },
      ],
    };
  };

  // Load layer data and add to map
  const loadLayer = async (layerId, layerConfig) => {
    if (loadedLayers.has(layerId)) {
      return loadedLayers.get(layerId);
    }

    try {
      const geoJsonData = await loadGeoJSONData(layerConfig.jsonFile);

      const layerData = {
        id: layerId,
        name: layerConfig.name,
        data: geoJsonData,
        visible: true,
        opacity: 1.0,
        style: getDefaultStyle(layerConfig.type || "road"),
        center: layerConfig.center,
        zoom: layerConfig.zoom,
      };

      loadedLayers.set(layerId, layerData);
      return layerData;
    } catch (err) {
      error.value = `Failed to load layer ${layerId}: ${err.message}`;
      throw err;
    }
  };

  // Get default style for different layer types
  const getDefaultStyle = (type) => {
    const styles = {
      road: {
        color: "#FFD700",
        width: 3,
        opacity: 0.8,
      },
      boundary: {
        color: "#FF0000",
        width: 2,
        opacity: 0.7,
        fillColor: "#FF0000",
        fillOpacity: 0.1,
      },
      building: {
        color: "#8B4513",
        width: 1,
        opacity: 0.9,
        fillColor: "#8B4513",
        fillOpacity: 0.3,
      },
      water: {
        color: "#00BFFF",
        width: 2,
        opacity: 0.8,
        fillColor: "#00BFFF",
        fillOpacity: 0.2,
      },
    };

    return styles[type] || styles.road;
  };

  // Remove layer from map
  const removeLayer = (layerId) => {
    loadedLayers.delete(layerId);
  };

  // Toggle layer visibility
  const toggleLayerVisibility = (layerId) => {
    const layer = loadedLayers.get(layerId);
    if (layer) {
      layer.visible = !layer.visible;
    }
  };

  // Update layer opacity
  const updateLayerOpacity = (layerId, opacity) => {
    const layer = loadedLayers.get(layerId);
    if (layer) {
      layer.opacity = opacity;
    }
  };

  // Search for features in loaded layers
  const searchFeatures = (query) => {
    const results = [];

    loadedLayers.forEach((layer) => {
      if (layer.data && layer.data.features) {
        layer.data.features.forEach((feature) => {
          const properties = feature.properties || {};
          const searchableFields = [
            "Nama_Jalan",
            "Nama",
            "Kecamatan",
            "Desa",
            "Keterangan",
          ];

          const matchFound = searchableFields.some((field) => {
            const value = properties[field];
            return (
              value &&
              value.toString().toLowerCase().includes(query.toLowerCase())
            );
          });

          if (matchFound) {
            results.push({
              id: feature.id || Math.random(),
              name: properties.Nama_Jalan || properties.Nama || "Unknown",
              address: `${properties.Kecamatan || ""}, ${
                properties.Desa || ""
              }`.trim(),
              coordinates: getFeatureCenter(feature.geometry),
              type: "road",
              layer: layer.name,
              properties: properties,
            });
          }
        });
      }
    });

    return results;
  };

  // Get center coordinates of a geometry
  const getFeatureCenter = (geometry) => {
    if (!geometry || !geometry.coordinates) {
      return { lat: -0.0263, lng: 109.3425 };
    }

    let coords = geometry.coordinates;

    if (geometry.type === "LineString") {
      // Get middle point of line
      const midIndex = Math.floor(coords.length / 2);
      return { lat: coords[midIndex][1], lng: coords[midIndex][0] };
    } else if (geometry.type === "Point") {
      return { lat: coords[1], lng: coords[0] };
    } else if (geometry.type === "Polygon") {
      // Get centroid of polygon (simplified)
      const ring = coords[0];
      let lat = 0,
        lng = 0;
      ring.forEach((coord) => {
        lng += coord[0];
        lat += coord[1];
      });
      return { lat: lat / ring.length, lng: lng / ring.length };
    }

    return { lat: -0.0263, lng: 109.3425 };
  };

  // Get layer statistics
  const getLayerStats = (layerId) => {
    const layer = loadedLayers.get(layerId);
    if (!layer || !layer.data) return null;

    const features = layer.data.features || [];
    const stats = {
      totalFeatures: features.length,
      totalLength: 0,
      conditions: {},
      years: {},
    };

    features.forEach((feature) => {
      const props = feature.properties || {};

      // Calculate total length
      if (props.Panjang_M) {
        stats.totalLength += parseFloat(props.Panjang_M) || 0;
      }

      // Count conditions
      if (props.Kondisi) {
        stats.conditions[props.Kondisi] =
          (stats.conditions[props.Kondisi] || 0) + 1;
      }

      // Count years
      if (props.Tahun) {
        stats.years[props.Tahun] = (stats.years[props.Tahun] || 0) + 1;
      }
    });

    return stats;
  };

  return {
    // State
    availableDatasets,
    loadedLayers,
    isLoading,
    error,

    // Methods
    initializeDatasets,
    loadGeoJSONData,
    loadLayer,
    removeLayer,
    toggleLayerVisibility,
    updateLayerOpacity,
    searchFeatures,
    getLayerStats,
    kecamatanData,
  };
};
