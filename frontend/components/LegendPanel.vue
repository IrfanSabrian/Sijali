<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-80 h-full overflow-y-auto custom-scrollbar transition-colors duration-300"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Keterangan Peta
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

    <!-- Layer Controls -->
    <div class="space-y-4 mb-6">
      <!-- Opasitas Layer -->
      <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-3 w-full">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Opasitas Layer
        </h4>
        <div class="w-full">
          <input
            type="range"
            min="0"
            max="100"
            value="100"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0%</span>
            <span class="font-medium">100%</span>
          </div>
        </div>
      </div>

      <!-- Visibilitas Layer -->
      <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Visibilitas Layer
        </h4>
        <div class="space-y-2">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span class="text-sm text-gray-600 dark:text-gray-400">Tampilkan semua layer</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span class="text-sm text-gray-600 dark:text-gray-400">Layer infrastruktur</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span class="text-sm text-gray-600 dark:text-gray-400">Layer administratif</span>
          </label>
        </div>
      </div>

      <!-- Kunci Area -->
      <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Kunci Area
        </h4>
        <div class="space-y-2">
          <button
            class="w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md transition-colors duration-200"
          >
            Pilih Area
          </button>
          <button
            class="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
          >
            Reset Pilihan
          </button>
        </div>
      </div>
    </div>

    <!-- Legend Items -->
    <div class="space-y-4">
      <div
        v-for="legendGroup in legendItems"
        :key="legendGroup.id"
        class="border border-gray-200 dark:border-gray-600 rounded-lg p-3"
      >
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {{ legendGroup.name }}
        </h4>
        <div class="space-y-2">
          <div
            v-for="item in legendGroup.items"
            :key="item.id"
            class="flex items-center space-x-3"
          >
            <!-- Symbol -->
            <div class="flex-shrink-0">
              <div
                v-if="item.type === 'fill'"
                class="w-6 h-4 border border-gray-400 rounded"
                :style="{
                  backgroundColor: item.color,
                  opacity: item.opacity || 1,
                  borderColor: item.strokeColor || '#666',
                }"
              ></div>
              <div
                v-else-if="item.type === 'line'"
                class="w-6 h-1 rounded"
                :style="{
                  backgroundColor: item.color,
                  height: `${item.width || 2}px`,
                }"
              ></div>
              <div
                v-else-if="item.type === 'point'"
                class="w-3 h-3 rounded-full border"
                :style="{
                  backgroundColor: item.color,
                  borderColor: item.strokeColor || '#666',
                }"
              ></div>
              <div
                v-else-if="item.type === 'pattern'"
                class="w-6 h-4 border border-gray-400 rounded relative overflow-hidden"
                :style="{ backgroundColor: item.backgroundColor || '#fff' }"
              >
                <div
                  class="absolute inset-0"
                  :style="{
                    backgroundImage: item.pattern,
                    backgroundSize: '4px 4px',
                  }"
                ></div>
              </div>
            </div>

            <!-- Label -->
            <span class="text-sm text-gray-600 dark:text-gray-400 flex-1">
              {{ item.label }}
            </span>

            <!-- Value/Count (if available) -->
            <span
              v-if="item.value"
              class="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
            >
              {{ item.value }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scale Bar -->
    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Skala Peta
      </h4>
      <div class="flex items-center space-x-2">
        <div class="flex-1">
          <div class="h-2 bg-white border border-gray-400 relative">
            <div class="absolute left-0 top-0 w-1/4 h-full bg-black"></div>
            <div class="absolute left-1/2 top-0 w-1/4 h-full bg-black"></div>
          </div>
          <div
            class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1"
          >
            <span>0</span>
            <span>{{ scaleText }}</span>
          </div>
        </div>
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Skala: 1:{{ currentScale.toLocaleString() }}
      </div>
    </div>

    <!-- Coordinate Display -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Koordinat Mouse
      </h4>
      <div class="bg-gray-50 dark:bg-gray-700 rounded p-2 font-mono text-xs">
        <div class="text-gray-600 dark:text-gray-400">
          Longitude: {{ mouseCoordinates.longitude }}
        </div>
        <div class="text-gray-600 dark:text-gray-400">
          Latitude: {{ mouseCoordinates.latitude }}
        </div>
      </div>
    </div>

    <!-- Map Info -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Informasi Peta
      </h4>
      <div class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
        <div>Proyeksi: WGS 84 / Web Mercator</div>
        <div>Zoom Level: {{ currentZoom }}</div>
        <div>Center: {{ mapCenter.longitude }}, {{ mapCenter.latitude }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const emit = defineEmits(["close"]);

// Props
const props = defineProps({
  currentScale: {
    type: Number,
    default: 50000,
  },
  currentZoom: {
    type: Number,
    default: 10,
  },
  mapCenter: {
    type: Object,
    default: () => ({ longitude: "109.3425", latitude: "-0.0263" }),
  },
  mouseCoordinates: {
    type: Object,
    default: () => ({ longitude: "109.3425", latitude: "-0.0263" }),
  },
});

// Scale text calculation
const scaleText = computed(() => {
  if (props.currentScale < 1000) {
    return `${props.currentScale}m`;
  } else {
    return `${(props.currentScale / 1000).toFixed(1)}km`;
  }
});

// Legend items
const legendItems = reactive([
  {
    id: "administrative",
    name: "Batas Administrasi",
    items: [
      {
        id: "provinsi",
        type: "line",
        color: "#FF0000",
        width: 3,
        label: "Batas Provinsi",
      },
      {
        id: "kabupaten",
        type: "line",
        color: "#00FF00",
        width: 2,
        label: "Batas Kabupaten/Kota",
      },
      {
        id: "kecamatan",
        type: "line",
        color: "#0000FF",
        width: 1,
        label: "Batas Kecamatan",
      },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastruktur",
    items: [
      {
        id: "jalan_arteri",
        type: "line",
        color: "#FFD700",
        width: 4,
        label: "Jalan Arteri",
      },
      {
        id: "jalan_kolektor",
        type: "line",
        color: "#FFA500",
        width: 3,
        label: "Jalan Kolektor",
      },
      {
        id: "jalan_lokal",
        type: "line",
        color: "#FF6347",
        width: 2,
        label: "Jalan Lokal",
      },
      {
        id: "sungai",
        type: "line",
        color: "#00BFFF",
        width: 2,
        label: "Sungai",
      },
      {
        id: "bangunan",
        type: "fill",
        color: "#8B4513",
        strokeColor: "#654321",
        opacity: 0.7,
        label: "Bangunan",
      },
    ],
  },
  {
    id: "landuse",
    name: "Penggunaan Lahan",
    items: [
      {
        id: "permukiman",
        type: "fill",
        color: "#FF69B4",
        opacity: 0.6,
        label: "Permukiman",
        value: "2,450 Ha",
      },
      {
        id: "pertanian",
        type: "fill",
        color: "#32CD32",
        opacity: 0.6,
        label: "Pertanian",
        value: "15,230 Ha",
      },
      {
        id: "hutan",
        type: "fill",
        color: "#228B22",
        opacity: 0.7,
        label: "Hutan",
        value: "8,750 Ha",
      },
      {
        id: "industri",
        type: "pattern",
        backgroundColor: "#D3D3D3",
        pattern:
          "repeating-linear-gradient(45deg, #666, #666 2px, transparent 2px, transparent 4px)",
        label: "Kawasan Industri",
        value: "1,120 Ha",
      },
    ],
  },
  {
    id: "rdtr",
    name: "Rencana Detail Tata Ruang",
    items: [
      {
        id: "zona_lindung",
        type: "fill",
        color: "#00FF7F",
        opacity: 0.5,
        label: "Zona Lindung",
        value: "5,680 Ha",
      },
      {
        id: "zona_budidaya",
        type: "fill",
        color: "#FFA500",
        opacity: 0.5,
        label: "Zona Budidaya",
        value: "12,340 Ha",
      },
      {
        id: "zona_khusus",
        type: "fill",
        color: "#9370DB",
        opacity: 0.5,
        label: "Zona Khusus",
        value: "890 Ha",
      },
      {
        id: "zona_resapan",
        type: "pattern",
        backgroundColor: "#90EE90",
        pattern:
          "repeating-linear-gradient(0deg, #228B22, #228B22 1px, transparent 1px, transparent 3px)",
        label: "Zona Resapan Air",
        value: "2,150 Ha",
      },
    ],
  },
  {
    id: "facilities",
    name: "Fasilitas Umum",
    items: [
      {
        id: "sekolah",
        type: "point",
        color: "#FF4500",
        strokeColor: "#8B0000",
        label: "Sekolah",
        value: "45 Unit",
      },
      {
        id: "rumah_sakit",
        type: "point",
        color: "#FF1493",
        strokeColor: "#8B008B",
        label: "Rumah Sakit",
        value: "8 Unit",
      },
      {
        id: "masjid",
        type: "point",
        color: "#00CED1",
        strokeColor: "#008B8B",
        label: "Masjid",
        value: "127 Unit",
      },
      {
        id: "pasar",
        type: "point",
        color: "#FFD700",
        strokeColor: "#B8860B",
        label: "Pasar",
        value: "12 Unit",
      },
    ],
  },
]);
</script>
