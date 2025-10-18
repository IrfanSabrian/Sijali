<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-80 h-full overflow-y-auto custom-scrollbar transition-colors duration-300"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Layer Peta
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

    <!-- Basemap Selection -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Peta Dasar
      </h4>
      <div class="space-y-2">
        <label
          v-for="basemap in basemapOptions"
          :key="basemap.id"
          class="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        >
          <input
            type="radio"
            :value="basemap.id"
            v-model="selectedBasemap"
            @change="changeBasemap(basemap.id)"
            class="mr-3 text-primary-500 focus:ring-primary-500"
          />
          <div class="flex items-center">
            <img
              :src="basemap.thumbnail"
              :alt="basemap.name"
              class="w-16 h-12 rounded border mr-3 object-cover"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ basemap.name }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ basemap.description }}
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>

    <!-- Layer Tree -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Layer Data
      </h4>
      <div class="space-y-1">
        <div
          v-for="layerGroup in layerGroups"
          :key="layerGroup.id"
          class="border border-gray-200 dark:border-gray-600 rounded-lg"
        >
          <!-- Group Header -->
          <div
            @click="toggleGroup(layerGroup.id)"
            class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                :checked="layerGroup.visible"
                @change="toggleGroupVisibility(layerGroup.id)"
                @click.stop
                class="mr-2 text-primary-500 focus:ring-primary-500"
              />
              <span
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {{ layerGroup.name }}
              </span>
            </div>
            <svg
              :class="[
                'w-4 h-4 transition-transform text-gray-500 dark:text-gray-400',
                layerGroup.expanded ? 'rotate-90' : '',
              ]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <!-- Group Layers -->
          <div
            v-if="layerGroup.expanded"
            class="border-t border-gray-200 dark:border-gray-600"
          >
            <div
              v-for="layer in layerGroup.layers"
              :key="layer.id"
              class="flex items-center justify-between p-3 pl-8 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div class="flex items-center flex-1">
                <input
                  type="checkbox"
                  :checked="layer.visible"
                  @change="toggleLayerVisibility(layerGroup.id, layer.id)"
                  class="mr-2 text-primary-500 focus:ring-primary-500"
                />
                <div class="flex items-center flex-1">
                  <div
                    class="w-4 h-4 rounded mr-2 border"
                    :style="{ backgroundColor: layer.color }"
                  ></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    {{ layer.name }}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-1">
                <!-- Opacity Slider -->
                <div class="relative group">
                  <button
                    @click="toggleOpacitySlider(layer.id)"
                    class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Opacity"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="text-gray-500 dark:text-gray-400"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      />
                    </svg>
                  </button>
                  <div
                    v-if="layer.showOpacity"
                    class="absolute right-0 top-8 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 shadow-lg z-10 w-32"
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      :value="layer.opacity"
                      @input="
                        updateLayerOpacity(
                          layerGroup.id,
                          layer.id,
                          $event.target.value
                        )
                      "
                      class="w-full"
                    />
                    <div
                      class="text-xs text-center text-gray-500 dark:text-gray-400 mt-1"
                    >
                      {{ Math.round(layer.opacity * 100) }}%
                    </div>
                  </div>
                </div>
                <!-- Info Button -->
                <button
                  @click="showLayerInfo(layer)"
                  class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  title="Info Layer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="text-gray-500 dark:text-gray-400"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Available Kecamatan Data -->
    <div v-if="isAuthenticated && canAccessLayers" class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Data Kecamatan Tersedia
      </h4>
      <div class="space-y-2 max-h-48 overflow-y-auto">
        <div
          v-for="kecamatan in availableDatasets"
          :key="kecamatan.id"
          class="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="flex-1">
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ kecamatan.name }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ kecamatan.desas.length }} Desa
            </div>
          </div>
          <button
            @click="loadKecamatanData(kecamatan)"
            :disabled="isLoadingData"
            class="px-3 py-1 text-xs bg-primary-500 text-white rounded hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {{ isLoadingData ? "Loading..." : "Load" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Layer Controls -->
    <div class="space-y-2">
      <button
        @click="addLayer"
        :disabled="!isAuthenticated || !canEditData"
        class="w-full flex items-center justify-center p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="mr-2"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        Tambah Layer
      </button>
      <button
        @click="refreshLayers"
        class="w-full flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="mr-2"
        >
          <path
            d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
          />
        </svg>
        Refresh Layer
      </button>
    </div>

    <!-- Login Required Message -->
    <div
      v-if="!isAuthenticated"
      class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
    >
      <div class="flex items-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="text-yellow-600 dark:text-yellow-400 mr-2"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </svg>
        <div>
          <div class="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            Login Diperlukan
          </div>
          <div class="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
            Silakan login untuk mengakses data layer
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useToast } from "~/composables/useToast.js";

const emit = defineEmits([
  "close",
  "basemap-changed",
  "layer-changed",
  "layer-loaded",
]);

const { isAuthenticated, canAccessLayers, canEditData } = useAuth();
const toast = useToast();

// Mobile detection
const isMobile = () => {
  return window.innerWidth <= 768;
};

// Mock data for layers - can be replaced with API calls later
const availableDatasets = ref([]);
const loadedLayers = ref(new Map());
const isLoadingData = ref(false);

// Basemap options - RDTR Interaktif style
const selectedBasemap = ref("hybrid");
const basemapOptions = ref([
  {
    id: "streets-vector",
    name: "Peta Jalan",
    description: "Peta dengan fokus pada jaringan jalan",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA0OCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjMyIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMCAxNkgzOCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjIiLz4KPHA=",
  },
  {
    id: "satellite",
    name: "Citra Satelit",
    description: "Citra satelit resolusi tinggi",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA0OCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjMyIiBmaWxsPSIjNEE5MDQyIi8+CjxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSIzMiIgaGVpZ2h0PSIxNiIgZmlsbD0iIzJENjAyRCIvPgo8L3N2Zz4K",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    description: "Kombinasi citra satelit dan label jalan",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA0OCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjMyIiBmaWxsPSIjNEE5MDQyIi8+CjxwYXRoIGQ9Ik0xMCAxNkgzOCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=",
  },
  {
    id: "topo",
    name: "Topografi",
    description: "Peta topografi dengan kontur ketinggian",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA0OCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjMyIiBmaWxsPSIjRkZGOEVEIi8+CjxwYXRoIGQ9Ik04IDI0UTE2IDE2IDI0IDIwUTMyIDE2IDQwIDI0IiBzdHJva2U9IiM4QjQ1MTMiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K",
  },
  {
    id: "osm",
    name: "OpenStreetMap",
    description: "Peta OpenStreetMap dengan detail lengkap",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA0OCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjMyIiBmaWxsPSIjRjJGMkYyIi8+CjxwYXRoIGQ9Ik0xMCAxNkgzOCIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjEiLz4KPGNpcmNsZSBjeD0iMjQiIGN5PSIxNiIgcj0iMyIgZmlsbD0iIzMzOCIvPgo8L3N2Zz4K",
  },
]);

// Layer groups - RDTR Interaktif structure
const layerGroups = reactive([
  {
    id: "rdtr_zones",
    name: "Zona RDTR",
    visible: true,
    expanded: true,
    layers: [
      {
        id: "zona_lindung",
        name: "Zona Lindung",
        visible: true,
        color: "#00FF7F",
        opacity: 0.6,
        showOpacity: false,
      },
      {
        id: "zona_budidaya",
        name: "Zona Budidaya",
        visible: true,
        color: "#FFA500",
        opacity: 0.6,
        showOpacity: false,
      },
      {
        id: "zona_peruntukan_khusus",
        name: "Zona Peruntukan Khusus",
        visible: false,
        color: "#9370DB",
        opacity: 0.6,
        showOpacity: false,
      },
      {
        id: "zona_kawasan_strategis",
        name: "Zona Kawasan Strategis",
        visible: false,
        color: "#FF6B6B",
        opacity: 0.6,
        showOpacity: false,
      },
    ],
  },
  {
    id: "administrative_boundaries",
    name: "Batas Administrasi",
    visible: true,
    expanded: false,
    layers: [
      {
        id: "batas_provinsi",
        name: "Batas Provinsi",
        visible: true,
        color: "#FF0000",
        opacity: 0.8,
        showOpacity: false,
      },
      {
        id: "batas_kabupaten_kota",
        name: "Batas Kabupaten/Kota",
        visible: true,
        color: "#00AA00",
        opacity: 0.7,
        showOpacity: false,
      },
      {
        id: "batas_kecamatan",
        name: "Batas Kecamatan",
        visible: false,
        color: "#0066CC",
        opacity: 0.6,
        showOpacity: false,
      },
      {
        id: "batas_desa_kelurahan",
        name: "Batas Desa/Kelurahan",
        visible: false,
        color: "#FF8800",
        opacity: 0.5,
        showOpacity: false,
      },
    ],
  },
  {
    id: "transportation_network",
    name: "Jaringan Transportasi",
    visible: true,
    expanded: false,
    layers: [
      {
        id: "jalan_arteri",
        name: "Jalan Arteri",
        visible: true,
        color: "#FFD700",
        opacity: 0.9,
        showOpacity: false,
      },
      {
        id: "jalan_kolektor",
        name: "Jalan Kolektor",
        visible: true,
        color: "#FFA500",
        opacity: 0.8,
        showOpacity: false,
      },
      {
        id: "jalan_lokal",
        name: "Jalan Lokal",
        visible: false,
        color: "#FF6347",
        opacity: 0.7,
        showOpacity: false,
      },
      {
        id: "jalan_lingkungan",
        name: "Jalan Lingkungan",
        visible: false,
        color: "#CD853F",
        opacity: 0.6,
        showOpacity: false,
      },
    ],
  },
  {
    id: "public_facilities",
    name: "Fasilitas Umum",
    visible: false,
    expanded: false,
    layers: [
      {
        id: "fasilitas_pendidikan",
        name: "Fasilitas Pendidikan",
        visible: false,
        color: "#4169E1",
        opacity: 0.8,
        showOpacity: false,
      },
      {
        id: "fasilitas_kesehatan",
        name: "Fasilitas Kesehatan",
        visible: false,
        color: "#DC143C",
        opacity: 0.8,
        showOpacity: false,
      },
      {
        id: "fasilitas_peribadatan",
        name: "Fasilitas Peribadatan",
        visible: false,
        color: "#32CD32",
        opacity: 0.8,
        showOpacity: false,
      },
      {
        id: "fasilitas_perdagangan",
        name: "Fasilitas Perdagangan",
        visible: false,
        color: "#FF1493",
        opacity: 0.8,
        showOpacity: false,
      },
    ],
  },
  {
    id: "utilities_infrastructure",
    name: "Infrastruktur Utilitas",
    visible: false,
    expanded: false,
    layers: [
      {
        id: "jaringan_air_minum",
        name: "Jaringan Air Minum",
        visible: false,
        color: "#00BFFF",
        opacity: 0.8,
        showOpacity: false,
      },
      {
        id: "jaringan_listrik",
        name: "Jaringan Listrik",
        visible: false,
        color: "#FFD700",
        opacity: 0.8,
        showOpacity: false,
      },
      {
        id: "jaringan_telekomunikasi",
        name: "Jaringan Telekomunikasi",
        visible: false,
        color: "#9370DB",
        opacity: 0.8,
        showOpacity: false,
      },
      {
        id: "sistem_drainase",
        name: "Sistem Drainase",
        visible: false,
        color: "#20B2AA",
        opacity: 0.8,
        showOpacity: false,
      },
    ],
  },
  {
    id: "environmental_features",
    name: "Fitur Lingkungan",
    visible: false,
    expanded: false,
    layers: [
      {
        id: "sungai_danau",
        name: "Sungai & Danau",
        visible: false,
        color: "#00CED1",
        opacity: 0.8,
        showOpacity: false,
      },
      {
        id: "hutan_lindung",
        name: "Hutan Lindung",
        visible: false,
        color: "#228B22",
        opacity: 0.7,
        showOpacity: false,
      },
      {
        id: "ruang_terbuka_hijau",
        name: "Ruang Terbuka Hijau",
        visible: false,
        color: "#90EE90",
        opacity: 0.7,
        showOpacity: false,
      },
      {
        id: "kawasan_rawan_bencana",
        name: "Kawasan Rawan Bencana",
        visible: false,
        color: "#FF4500",
        opacity: 0.6,
        showOpacity: false,
      },
    ],
  },
]);

// Methods
const changeBasemap = (basemapId) => {
  emit("basemap-changed", basemapId);

  // Close sidebar on mobile after changing basemap
  if (isMobile()) {
    emit("close");
  }
};

const toggleGroup = (groupId) => {
  const group = layerGroups.find((g) => g.id === groupId);
  if (group) {
    group.expanded = !group.expanded;
  }
};

const toggleGroupVisibility = (groupId) => {
  const group = layerGroups.find((g) => g.id === groupId);
  if (group) {
    group.visible = !group.visible;
    // Toggle all layers in group
    group.layers.forEach((layer) => {
      layer.visible = group.visible;
    });
    emit("layer-changed", { type: "group", groupId, visible: group.visible });
  }
};

const toggleLayerVisibility = (groupId, layerId) => {
  const group = layerGroups.find((g) => g.id === groupId);
  if (group) {
    const layer = group.layers.find((l) => l.id === layerId);
    if (layer) {
      layer.visible = !layer.visible;
      emit("layer-changed", {
        type: "layer",
        groupId,
        layerId,
        visible: layer.visible,
      });
    }
  }
};

const toggleOpacitySlider = (layerId) => {
  layerGroups.forEach((group) => {
    group.layers.forEach((layer) => {
      if (layer.id === layerId) {
        layer.showOpacity = !layer.showOpacity;
      } else {
        layer.showOpacity = false;
      }
    });
  });
};

const updateLayerOpacity = (groupId, layerId, opacity) => {
  const group = layerGroups.find((g) => g.id === groupId);
  if (group) {
    const layer = group.layers.find((l) => l.id === layerId);
    if (layer) {
      layer.opacity = parseFloat(opacity);
      emit("layer-changed", {
        type: "opacity",
        groupId,
        layerId,
        opacity: layer.opacity,
      });
    }
  }
};

const showLayerInfo = (layer) => {
  toast.info(
    `Info Layer: ${layer.name} - Opacity: ${Math.round(
      layer.opacity * 100
    )}% - Visible: ${layer.visible ? "Ya" : "Tidak"}`
  );
};

const addLayer = () => {
  // Implement add layer functionality
  toast.warning("Fitur tambah layer akan diimplementasikan");
};

const refreshLayers = () => {
  // Implement refresh layers functionality
  emit("layer-changed", { type: "refresh" });
};

// Load kecamatan data
const loadKecamatanData = async (kecamatan) => {
  if (!isAuthenticated.value || !canAccessLayers.value) {
    toast.warning("Silakan login terlebih dahulu untuk mengakses data.");
    return;
  }

  try {
    // Mock layer data - can be replaced with API calls later
    const layerData = {
      id: kecamatan.id,
      name: kecamatan.name,
      data: null, // Will be loaded from API
      visible: true,
      opacity: 1.0,
    };

    emit("layer-loaded", layerData);

    // Show success message
    toast.success(`Data ${kecamatan.name} berhasil dimuat!`);
  } catch (error) {
    console.error("Error loading kecamatan data:", error);
    toast.error(`Gagal memuat data ${kecamatan.name}. Silakan coba lagi.`);
  }
};

// Initialize datasets on mount
onMounted(() => {
  // Initialize with empty datasets - can be populated with API calls later
  availableDatasets.value = [];
});
</script>
