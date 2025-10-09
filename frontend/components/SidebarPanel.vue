<template>
  <div class="sidebar-panel">
    <!-- Header dengan Logo dan Tombol Hide -->
    <div class="sidebar-header">
      <div class="logo-section">
        <div class="logo">
          <div class="logo-squares">
            <div class="square square-1"></div>
            <div class="square square-2"></div>
            <div class="square square-3"></div>
            <div class="square square-4"></div>
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
          <component :is="tab.icon" />
        </div>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Layer Tab -->
      <div v-if="activeTab === 'layer'" class="tab-panel">
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
          <select v-model="selectedDesa" class="form-select">
            <option value="">-- Semua Desa --</option>
            <option v-for="desa in desaOptions" :key="desa" :value="desa">
              {{ desa }}
            </option>
          </select>
        </div>

        <button class="apply-button" @click="applyLayer">Terapkan Layer</button>
      </div>

      <!-- Pengaturan Tab -->
      <div v-if="activeTab === 'pengaturan'" class="tab-panel">
        <div class="settings-content">
          <h3>Pengaturan Peta</h3>
          <div class="setting-item">
            <label>Basemap</label>
            <select
              v-model="selectedBasemap"
              @change="handleBasemapChange"
              class="form-select"
            >
              <option value="streets">Streets</option>
              <option value="satellite">Satellite</option>
              <option value="hybrid">Hybrid</option>
              <option value="topographic">Topographic</option>
              <option value="gray">Gray</option>
              <option value="dark-gray">Dark Gray</option>
              <option value="oceans">Oceans</option>
              <option value="national-geographic">National Geographic</option>
            </select>
          </div>
          <div class="setting-item">
            <label>Opacity</label>
            <input
              type="range"
              v-model="opacity"
              min="0"
              max="100"
              class="slider"
            />
            <span>{{ opacity }}%</span>
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
import { ref, onMounted } from "vue";

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

// Tabs configuration
const tabs = [
  {
    id: "layer",
    label: "Layer",
    icon: "LayerIcon",
  },
  {
    id: "pengaturan",
    label: "Pengaturan",
    icon: "SettingsIcon",
  },
  {
    id: "alat",
    label: "Alat",
    icon: "ToolsIcon",
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
    // Reset selected desa when kecamatan changes
    selectedDesa.value = "";
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

// Lifecycle hooks
onMounted(() => {
  fetchKecamatanOptions();
  fetchDesaOptions();
});

// Icon components
const LayerIcon = {
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  `,
};

const SettingsIcon = {
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
    </svg>
  `,
};

const ToolsIcon = {
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.7,19l-9.1-9.1c0.9-2.3,0.4-5-1.5-6.9c-2-2-5-2.4-7.4-1.3L9,6.6L6.6,9L1.6,4.7C0.4,7.1,0.9,10.1,2.9,12.1 c1.9,1.9,4.6,2.4,6.9,1.5l9.1,9.1c0.4,0.4,1,0.4,1.4,0l2.3-2.3C23.1,20,23.1,19.4,22.7,19z"/>
    </svg>
  `,
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

.logo-squares {
  @apply flex flex-col space-y-1;
}

.square {
  @apply w-3 h-3 bg-blue-500;
}

.square-1 {
  @apply bg-blue-600;
}

.square-2 {
  @apply bg-blue-500;
}

.square-3 {
  @apply bg-blue-400;
}

.square-4 {
  @apply bg-blue-300;
}

.logo-text h2 {
  @apply text-lg font-bold text-gray-800;
}

.navigation-tabs {
  @apply flex border-b border-gray-200;
}

.tab-button {
  @apply flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors;
}

.tab-button.active {
  @apply text-blue-600 border-b-2 border-blue-600 bg-blue-50;
}

.tab-icon {
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
</style>
