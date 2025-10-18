<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-80 h-full overflow-y-auto custom-scrollbar transition-colors duration-300"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Alat Ukur
      </h3>
      <button
        @click="$emit('close')"
        class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="text-gray-500 dark:text-gray-400"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Measurement Tools -->
    <div class="space-y-4">
      <!-- Distance Measurement -->
      <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Pengukuran Jarak
        </h4>
        <div class="space-y-2">
          <button
            @click="startDistanceMeasurement"
            :class="[
              'w-full flex items-center justify-center p-2 rounded-lg transition-colors',
              activeTool === 'distance'
                ? 'bg-primary-500 text-white'
                : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
            ]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="mr-2"
            >
              <path
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              />
            </svg>
            {{ activeTool === "distance" ? "Mengukur..." : "Ukur Jarak" }}
          </button>
          <div
            v-if="measurements.distance.length > 0"
            class="bg-gray-50 dark:bg-gray-700 rounded p-2"
          >
            <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">
              Hasil Pengukuran:
            </div>
            <div
              v-for="(measurement, index) in measurements.distance"
              :key="index"
              class="flex justify-between items-center text-sm"
            >
              <span class="text-gray-700 dark:text-gray-300"
                >Jarak {{ index + 1 }}:</span
              >
              <span class="font-mono text-primary-600 dark:text-primary-400">
                {{ formatDistance(measurement.distance) }}
              </span>
            </div>
            <div
              class="flex justify-between items-center text-sm font-medium border-t border-gray-300 dark:border-gray-600 pt-1 mt-1"
            >
              <span class="text-gray-700 dark:text-gray-300">Total:</span>
              <span class="font-mono text-primary-600 dark:text-primary-400">
                {{ formatDistance(totalDistance) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Area Measurement -->
      <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Pengukuran Luas
        </h4>
        <div class="space-y-2">
          <button
            @click="startAreaMeasurement"
            :class="[
              'w-full flex items-center justify-center p-2 rounded-lg transition-colors',
              activeTool === 'area'
                ? 'bg-primary-500 text-white'
                : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
            ]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="mr-2"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            {{ activeTool === "area" ? "Mengukur..." : "Ukur Luas" }}
          </button>
          <div
            v-if="measurements.area.length > 0"
            class="bg-gray-50 dark:bg-gray-700 rounded p-2"
          >
            <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">
              Hasil Pengukuran:
            </div>
            <div
              v-for="(measurement, index) in measurements.area"
              :key="index"
              class="space-y-1"
            >
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-700 dark:text-gray-300"
                  >Area {{ index + 1 }}:</span
                >
                <span class="font-mono text-primary-600 dark:text-primary-400">
                  {{ formatArea(measurement.area) }}
                </span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-600 dark:text-gray-400">Keliling:</span>
                <span class="font-mono text-gray-600 dark:text-gray-400">
                  {{ formatDistance(measurement.perimeter) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Coordinate Measurement -->
      <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Koordinat Titik
        </h4>
        <div class="space-y-2">
          <button
            @click="startCoordinateMeasurement"
            :class="[
              'w-full flex items-center justify-center p-2 rounded-lg transition-colors',
              activeTool === 'coordinate'
                ? 'bg-primary-500 text-white'
                : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
            ]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="mr-2"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              />
            </svg>
            {{
              activeTool === "coordinate" ? "Klik Peta..." : "Ambil Koordinat"
            }}
          </button>
          <div
            v-if="measurements.coordinates.length > 0"
            class="bg-gray-50 dark:bg-gray-700 rounded p-2 max-h-32 overflow-y-auto"
          >
            <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">
              Koordinat:
            </div>
            <div
              v-for="(coord, index) in measurements.coordinates"
              :key="index"
              class="text-xs font-mono space-y-1 border-b border-gray-300 dark:border-gray-600 pb-1 mb-1 last:border-b-0 last:mb-0 last:pb-0"
            >
              <div class="text-gray-700 dark:text-gray-300">
                Titik {{ index + 1 }}:
              </div>
              <div class="text-primary-600 dark:text-primary-400">
                Lng: {{ coord.longitude.toFixed(6) }}
              </div>
              <div class="text-primary-600 dark:text-primary-400">
                Lat: {{ coord.latitude.toFixed(6) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Control Buttons -->
      <div class="space-y-2">
        <button
          @click="clearMeasurements"
          class="w-full flex items-center justify-center p-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="mr-2"
          >
            <path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
          Hapus Semua
        </button>
        <button
          @click="exportMeasurements"
          class="w-full flex items-center justify-center p-2 border border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="mr-2"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
            />
            <path d="M14 2v6h6" />
            <path d="M12 12v6" />
            <path d="M15 15l-3-3-3 3" />
          </svg>
          Export Hasil
        </button>
      </div>

      <!-- Instructions -->
      <div
        class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3"
      >
        <h5 class="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          Petunjuk Penggunaan:
        </h5>
        <ul class="text-xs text-blue-700 dark:text-blue-400 space-y-1">
          <li>
            • <strong>Jarak:</strong> Klik titik-titik untuk mengukur jarak
          </li>
          <li>
            • <strong>Luas:</strong> Klik titik-titik untuk membuat polygon
          </li>
          <li>
            • <strong>Koordinat:</strong> Klik sekali untuk mendapatkan
            koordinat
          </li>
          <li>• Double-click untuk menyelesaikan pengukuran</li>
          <li>• Tekan ESC untuk membatalkan</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useToast } from "~/composables/useToast.js";

const emit = defineEmits([
  "close",
  "measurement-started",
  "measurement-cleared",
]);

const toast = useToast();

// State
const activeTool = ref(null);
const measurements = reactive({
  distance: [],
  area: [],
  coordinates: [],
});

// Computed
const totalDistance = computed(() => {
  return measurements.distance.reduce(
    (total, measurement) => total + measurement.distance,
    0
  );
});

// Methods
const startDistanceMeasurement = () => {
  if (activeTool.value === "distance") {
    stopMeasurement();
  } else {
    activeTool.value = "distance";
    emit("measurement-started", { type: "distance" });
    console.log("Distance measurement tool activated");
  }
};

const startAreaMeasurement = () => {
  if (activeTool.value === "area") {
    stopMeasurement();
  } else {
    activeTool.value = "area";
    emit("measurement-started", { type: "area" });
    console.log("Area measurement tool activated");
  }
};

const startCoordinateMeasurement = () => {
  if (activeTool.value === "coordinate") {
    stopMeasurement();
  } else {
    activeTool.value = "coordinate";
    emit("measurement-started", { type: "coordinate" });
    console.log("Coordinate measurement tool activated");
  }
};

const stopMeasurement = () => {
  activeTool.value = null;
  emit("measurement-started", { type: "stop" });
};

const addDistanceMeasurement = (distance) => {
  measurements.distance.push({ distance });
};

const addAreaMeasurement = (area, perimeter) => {
  measurements.area.push({ area, perimeter });
};

const addCoordinateMeasurement = (longitude, latitude) => {
  measurements.coordinates.push({ longitude, latitude });
};

const clearMeasurements = () => {
  measurements.distance = [];
  measurements.area = [];
  measurements.coordinates = [];
  activeTool.value = null;
  emit("measurement-cleared");
  console.log("All measurements cleared");
};

const exportMeasurements = () => {
  const data = {
    timestamp: new Date().toISOString(),
    measurements: {
      distance: measurements.distance.map((m, i) => ({
        id: i + 1,
        distance_meters: m.distance,
        distance_formatted: formatDistance(m.distance),
      })),
      area: measurements.area.map((m, i) => ({
        id: i + 1,
        area_sqmeters: m.area,
        area_formatted: formatArea(m.area),
        perimeter_meters: m.perimeter,
        perimeter_formatted: formatDistance(m.perimeter),
      })),
      coordinates: measurements.coordinates.map((c, i) => ({
        id: i + 1,
        longitude: c.longitude,
        latitude: c.latitude,
      })),
    },
    summary: {
      total_distance: totalDistance.value,
      total_distance_formatted: formatDistance(totalDistance.value),
      total_measurements:
        measurements.distance.length +
        measurements.area.length +
        measurements.coordinates.length,
    },
  };

  const totalMeasurements =
    measurements.distance.length +
    measurements.area.length +
    measurements.coordinates.length;

  if (totalMeasurements === 0) {
    toast.warning("Tidak ada data pengukuran untuk diekspor");
    return;
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pengukuran-peta-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log(
    `Measurements exported successfully (${totalMeasurements} measurements)`
  );
  toast.success(
    `Data pengukuran berhasil diekspor (${totalMeasurements} pengukuran)`
  );
};

const formatDistance = (meters) => {
  if (meters < 1000) {
    return `${meters.toFixed(2)} m`;
  } else {
    return `${(meters / 1000).toFixed(2)} km`;
  }
};

const formatArea = (sqMeters) => {
  if (sqMeters < 10000) {
    return `${sqMeters.toFixed(2)} m²`;
  } else {
    return `${(sqMeters / 10000).toFixed(2)} ha`;
  }
};

// Expose methods for parent component
defineExpose({
  addDistanceMeasurement,
  addAreaMeasurement,
  addCoordinateMeasurement,
  stopMeasurement,
});
</script>
