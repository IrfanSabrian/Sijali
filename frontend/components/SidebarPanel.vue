<template>
  <div class="sidebar-panel">
    <!-- Header dengan Logo dan Tombol Hide -->
    <div class="sidebar-header">
      <div class="logo-section">
        <div class="logo">
          <div class="logo-image">
            <img
              src="/assets/images/sijali-logo.svg"
              alt="SIJALI Logo"
              class="w-12 h-12 object-contain"
            />
          </div>
          <div class="logo-text">
            <h2>SIJALI Kab. Kubu Raya</h2>
            <p class="text-xs text-gray-600">
              Sistem Informasi Jalan Lingkungan Kab. Kubu Raya
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="navigation-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
      >
        <div class="tab-icon">
          <font-awesome-icon :icon="tab.icon" />
        </div>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Layer Tab -->
      <div v-if="activeTab === 'layer'" class="tab-panel">
        <!-- Filter Jalan Section -->
        <div class="filter-section">
          <h4 class="section-title">Filter Data Jalan</h4>

          <div class="form-group">
            <label class="form-label">Pilih Kecamatan</label>
            <select
              v-model="selectedKecamatan"
              class="form-select"
              @change="fetchDesaOptions"
            >
              <option value="">-- Semua Kecamatan --</option>
              <option
                v-for="kecamatan in kecamatanOptions"
                :key="kecamatan"
                :value="kecamatan"
              >
                {{ kecamatan }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Pilih Desa</label>
            <select
              v-model="selectedDesa"
              class="form-select"
              :disabled="!selectedKecamatan"
              :class="{ 'opacity-50 cursor-not-allowed': !selectedKecamatan }"
            >
              <option value="">-- Semua Desa --</option>
              <option v-for="desa in desaOptions" :key="desa" :value="desa">
                {{ desa }}
              </option>
            </select>
            <p v-if="!selectedKecamatan" class="text-xs text-gray-500 mt-1">
              Pilih kecamatan terlebih dahulu
            </p>
          </div>

          <button class="apply-button" @click="applyLayer">
            Terapkan Filter
          </button>
        </div>
      </div>

      <!-- Pengaturan Tab -->
      <div v-if="activeTab === 'pengaturan'" class="tab-panel">
        <div class="settings-content">
          <h3>Pengaturan Peta</h3>

          <!-- Controls Row -->
          <div class="grid grid-cols-1 gap-4">
            <!-- Opacity Card -->
            <div
              class="p-4 rounded-xl border border-gray-200 shadow-sm bg-white"
            >
              <div class="text-sm font-semibold text-gray-800 mb-3">
                Opasitas Layer
              </div>
              <div class="flex items-center space-x-3">
                <input
                  type="range"
                  v-model="opacity"
                  min="0"
                  max="100"
                  class="flex-1"
                  @input="emit('opacity-change', parseInt($event.target.value))"
                />
                <span class="text-sm text-gray-600 w-10 text-right"
                  >{{ opacity }}%</span
                >
              </div>
            </div>
          </div>

          <!-- Basemap Gallery -->
          <div
            class="mt-4 p-4 rounded-xl border border-gray-200 shadow-sm bg-white"
          >
            <div class="text-sm font-semibold text-gray-800 mb-3">
              Peta Dasar
            </div>
            <div class="grid grid-cols-1 gap-3">
              <div
                v-for="bm in basemapOptions"
                :key="bm.id"
                @click="selectBasemap(bm.id)"
                class="flex items-center space-x-4 p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition"
                :class="{ 'ring-2 ring-blue-500': selectedBasemap === bm.id }"
              >
                <img
                  :src="resolveThumbnail(bm.thumbnail)"
                  :alt="bm.label"
                  referrerpolicy="no-referrer"
                  loading="lazy"
                  @error="onThumbError($event, bm)"
                  class="w-20 h-20 object-cover rounded-md bg-gray-100 border border-gray-200"
                />
                <div class="text-gray-700 font-medium">{{ bm.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alat Tab -->
      <div v-if="activeTab === 'alat'" class="tab-panel">
        <div class="tools-content">
          <h3>Alat Peta</h3>
          <div class="tool-buttons">
            <button class="tool-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Pencarian
            </button>
            <button class="tool-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                />
              </svg>
              Gambar
            </button>
            <button class="tool-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
                />
              </svg>
              Ukur
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faLayerGroup,
  faCog,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

// Props
defineProps({
  isVisible: {
    type: Boolean,
    default: true,
  },
});

// Emits
const emit = defineEmits([
  "hide",
  "apply-layer",
  "basemap-change",
  "tool-change",
  "opacity-change",
]);

// Reactive data
const activeTab = ref("layer");
const selectedKecamatan = ref("");
const selectedDesa = ref("");
const selectedBasemap = ref("streets");
const opacity = ref(100);

// Options for dropdowns
const kecamatanOptions = ref([]);
const desaOptions = ref([]);

// Watch for opacity changes and emit event
watch(opacity, (newOpacity) => {
  emit("opacity-change", newOpacity);
});

// Tabs configuration with Font Awesome icons
const tabs = [
  {
    id: "layer",
    label: "Layer",
    icon: faLayerGroup,
  },
  {
    id: "pengaturan",
    label: "Pengaturan",
    icon: faCog,
  },
  {
    id: "alat",
    label: "Alat",
    icon: faTools,
  },
];

// Get runtime config for API URL
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl || "http://localhost:3001/api";

// Fetch kecamatan options from API
const fetchKecamatanOptions = async () => {
  try {
    const response = await fetch(`${apiUrl}/jalan/filters/kecamatan`);
    const data = await response.json();
    if (data.success) {
      kecamatanOptions.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching kecamatan options:", error);
  }
};

// Fetch desa options based on selected kecamatan
const fetchDesaOptions = async () => {
  // Reset selected desa when kecamatan changes
  selectedDesa.value = "";

  // Clear desa options if no kecamatan selected
  if (!selectedKecamatan.value) {
    desaOptions.value = [];
    return;
  }

  try {
    let url = `${apiUrl}/jalan/filters/desa`;
    if (selectedKecamatan.value) {
      url += `?kecamatan=${encodeURIComponent(selectedKecamatan.value)}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      desaOptions.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching desa options:", error);
  }
};

// Methods
const applyLayer = () => {
  // Emit event to parent component
  emit("apply-layer", {
    kecamatan: selectedKecamatan.value,
    desa: selectedDesa.value,
  });
};

const handleBasemapChange = () => {
  // Emit basemap change event
  emit("basemap-change", selectedBasemap.value);
};

const basemapOptions = [
  // Imagery (example using working arcgis.com item thumbnail)
  {
    id: "satellite",
    label: "Citra",
    thumbnail:
      "https://www.arcgis.com/sharing/rest/content/items/81c82e5d0f9241469f78f94b0037581a/info/thumbnail/thumbnail1591224931210.jpeg",
  },
  {
    id: "hybrid",
    label: "Citra Hibrida",
    style: "/styles/arcgis/imagery/labels",
  },
  { id: "streets", label: "Jalan", style: "/styles/arcgis/streets" },
  {
    id: "topographic",
    label: "Topografi",
    style: "/styles/arcgis/topographic",
  },
  { id: "gray", label: "Abu-abu", style: "/styles/arcgis/light-gray" },
  {
    id: "dark-gray",
    label: "Abu-abu Gelap",
    style: "/styles/arcgis/dark-gray",
  },
  { id: "oceans", label: "Lautan", style: "/styles/arcgis/oceans" },
  {
    id: "arcgis-navigation",
    label: "Navigation",
    style: "/styles/arcgis/navigation",
  },
  {
    id: "arcgis-navigation-night",
    label: "Navigation Night",
    style: "/styles/arcgis/navigation-night",
  },
  {
    id: "national-geographic",
    label: "National Geographic",
    style: "/styles/arcgis/charted-territory",
  },
  { id: "arcgis-terrain", label: "Terrain", style: "/styles/arcgis/terrain" },
  {
    id: "arcgis-human-geography",
    label: "Human Geography",
    style: "/styles/arcgis/human-geography",
  },
  { id: "arcgis-nova", label: "Nova", style: "/styles/arcgis/nova" },
];

const selectBasemap = (id) => {
  selectedBasemap.value = id;
  handleBasemapChange();
};

// Lifecycle hooks
onMounted(() => {
  fetchKecamatanOptions();
  fetchDesaOptions();
});

// Thumbnail error fallback
const onThumbError = (event, bm) => {
  // Inline SVG placeholder (gray chequered)
  event.target.src =
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23e5e7eb'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='10' fill='%239ca3af'%3ENo Img%3C/text%3E%3C/svg%3E";
};

// Normalize/resolve incoming thumbnail URLs so they are image URLs
const resolveThumbnail = (thumbnailOrStyle) => {
  if (!thumbnailOrStyle) return null;
  // If it's an arcgis.com sharing thumbnail URL, just strip ?f=json
  if (/arcgis\.com\/sharing\/rest\//i.test(thumbnailOrStyle)) {
    return thumbnailOrStyle.replace(/\?f=json.*/i, "");
  }
  // If it's a Basemaps style path from your list, use Basemaps API thumbnail
  if (/^\/?styles\//.test(thumbnailOrStyle)) {
    const stylePath = thumbnailOrStyle.startsWith("/")
      ? thumbnailOrStyle
      : `/${thumbnailOrStyle}`;
    // Public thumbnail endpoint (no key required for image preview)
    return `https://basemaps-api.arcgis.com/arcgis/rest/services${stylePath}/resources/thumbnail?f=image`;
  }
  return thumbnailOrStyle;
};
</script>

<style scoped>
.sidebar-panel {
  @apply w-full h-full bg-white border-r border-gray-200 flex flex-col shadow-lg;
}

@media (min-width: 768px) {
  .sidebar-panel {
    @apply w-80;
  }
}

.sidebar-header {
  @apply flex items-center justify-between p-4 border-b border-gray-200;
}

.logo-section {
  @apply flex items-center space-x-3;
}

.logo {
  @apply flex items-center space-x-2;
}

.logo-image {
  @apply flex items-center justify-center;
}

.logo-text h2 {
  @apply text-lg font-bold text-gray-800;
}

.navigation-tabs {
  @apply flex border-b border-gray-200;
}

.tab-button {
  @apply flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors;
  min-height: 48px;
}

.tab-button.active {
  @apply text-blue-600 border-b-2 border-blue-600 bg-blue-50;
}

.tab-icon {
  @apply w-5 h-5 flex-shrink-0;
}

.tab-icon svg {
  @apply w-5 h-5;
}

.tab-content {
  @apply flex-1 overflow-y-auto;
}

.tab-panel {
  @apply p-4 space-y-4;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700;
}

.form-select {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.apply-button {
  @apply w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium;
}

.settings-content,
.tools-content {
  @apply space-y-4;
}

.settings-content h3,
.tools-content h3 {
  @apply text-lg font-semibold text-gray-800 mb-4;
}

.setting-item {
  @apply space-y-2;
}

.setting-item label {
  @apply block text-sm font-medium text-gray-700;
}

.slider {
  @apply w-full;
}

.tool-buttons {
  @apply grid grid-cols-1 gap-3;
}

.tool-button {
  @apply flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors;
}

.tool-button svg {
  @apply text-gray-600;
}

/* Boundary Section Styles */
.boundary-section,
.filter-section {
  @apply space-y-4;
}

.section-title {
  @apply text-base font-semibold text-gray-800 mb-3;
}

.boundary-toggle-item {
  @apply p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors;
}

.boundary-label {
  @apply flex items-center text-sm font-medium text-gray-700;
}

.boundary-description {
  @apply mt-2 text-xs text-gray-500;
}

/* Toggle Switch Styles */
.toggle-switch {
  @apply relative inline-block w-12 h-6 cursor-pointer;
}

.toggle-switch input {
  @apply opacity-0 w-0 h-0;
}

.toggle-slider {
  @apply absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300;
}

.toggle-slider:before {
  @apply absolute content-[''] h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-all duration-300;
}

.toggle-switch input:checked + .toggle-slider {
  @apply bg-blue-600;
}

.toggle-switch input:checked + .toggle-slider:before {
  @apply transform translate-x-6;
}

.toggle-switch input:focus + .toggle-slider {
  @apply ring-2 ring-blue-300;
}

/* Divider */
.divider {
  @apply border-t border-gray-200 my-4;
}
</style>
