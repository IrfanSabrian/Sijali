<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-80 h-full overflow-y-auto custom-scrollbar transition-colors duration-300"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Drawing Tools
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

    <!-- Drawing Tools -->
    <div class="space-y-4">
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Geometry Tools
        </h4>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="setDrawingTool('point')"
            :class="[
              'flex flex-col items-center p-3 rounded-lg border-2 transition-all',
              activeDrawingTool === 'point'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 text-gray-600 dark:text-gray-400',
            ]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="mb-1"
            >
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span class="text-xs">Point</span>
          </button>

          <button
            @click="setDrawingTool('polyline')"
            :class="[
              'flex flex-col items-center p-3 rounded-lg border-2 transition-all',
              activeDrawingTool === 'polyline'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 text-gray-600 dark:text-gray-400',
            ]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="mb-1"
            >
              <path d="M3 12h18m-9-9l9 9-9 9" />
            </svg>
            <span class="text-xs">Line</span>
          </button>

          <button
            @click="setDrawingTool('polygon')"
            :class="[
              'flex flex-col items-center p-3 rounded-lg border-2 transition-all',
              activeDrawingTool === 'polygon'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 text-gray-600 dark:text-gray-400',
            ]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="mb-1"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            <span class="text-xs">Polygon</span>
          </button>

          <button
            @click="setDrawingTool('rectangle')"
            :class="[
              'flex flex-col items-center p-3 rounded-lg border-2 transition-all',
              activeDrawingTool === 'rectangle'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 text-gray-600 dark:text-gray-400',
            ]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="mb-1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            </svg>
            <span class="text-xs">Rectangle</span>
          </button>
        </div>
      </div>

      <!-- Edit Tools -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Edit Tools
        </h4>
        <div class="space-y-2">
          <button
            @click="setDrawingTool('select')"
            :class="[
              'w-full flex items-center p-3 rounded-lg border-2 transition-all',
              activeDrawingTool === 'select'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 text-gray-600 dark:text-gray-400',
            ]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="mr-2"
            >
              <path
                d="M2 2v6h2V4h4V2H2zm18 0h-4v2h4v4h2V2h-2zM4 18H2v4h6v-2H4v-4zm16 0v4h-4v2h6v-6h-2z"
              />
            </svg>
            <span class="text-sm">Select & Edit</span>
          </button>

          <button
            @click="clearAll"
            class="w-full flex items-center p-3 rounded-lg border-2 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-600 text-red-600 dark:text-red-400 transition-all"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="mr-2"
            >
              <path
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
              />
            </svg>
            <span class="text-sm">Clear All</span>
          </button>
        </div>
      </div>

      <!-- Style Options -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Style Options
        </h4>
        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1"
              >Fill Color</label
            >
            <input
              v-model="fillColor"
              type="color"
              class="w-full h-8 rounded border border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1"
              >Stroke Color</label
            >
            <input
              v-model="strokeColor"
              type="color"
              class="w-full h-8 rounded border border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1"
              >Stroke Width</label
            >
            <input
              v-model="strokeWidth"
              type="range"
              min="1"
              max="10"
              class="w-full"
            />
            <span class="text-xs text-gray-500 dark:text-gray-400"
              >{{ strokeWidth }}px</span
            >
          </div>
        </div>
      </div>

      <!-- GeoJSON Import/Export -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          GeoJSON
        </h4>
        <div class="space-y-2">
          <button
            @click="importGeoJSON"
            class="w-full flex items-center p-3 rounded-lg border-2 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 text-green-600 dark:text-green-400 transition-all"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="mr-2"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
              />
              <path d="M14 2v6h6" />
              <path d="M12 18v-6" />
              <path d="M9 15l3 3 3-3" />
            </svg>
            <span class="text-sm">Import GeoJSON</span>
          </button>

          <button
            @click="exportGeoJSON"
            class="w-full flex items-center p-3 rounded-lg border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 text-blue-600 dark:text-blue-400 transition-all"
          >
            <svg
              width="20"
              height="20"
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
            <span class="text-sm">Export GeoJSON</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Hidden file input for GeoJSON import -->
    <input
      ref="fileInput"
      type="file"
      accept=".geojson,.json"
      @change="handleFileImport"
      class="hidden"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useToast } from "~/composables/useToast.js";

const emit = defineEmits([
  "close",
  "tool-changed",
  "style-changed",
  "import-geojson",
  "export-geojson",
  "clear-all",
]);

const toast = useToast();

// Drawing tool state
const activeDrawingTool = ref("select");
const fillColor = ref("#3c8dbc");
const strokeColor = ref("#2c5aa0");
const strokeWidth = ref(2);

// File input ref
const fileInput = ref(null);

// Methods
const setDrawingTool = (tool) => {
  activeDrawingTool.value = tool;
  emit("tool-changed", {
    tool,
    style: {
      fillColor: fillColor.value,
      strokeColor: strokeColor.value,
      strokeWidth: strokeWidth.value,
    },
  });

  // Show tool selection feedback
  const toolNames = {
    point: "Point",
    polyline: "Polyline",
    polygon: "Polygon",
    rectangle: "Rectangle",
    circle: "Circle",
    select: "Select",
    move: "Move",
    delete: "Delete",
  };

  console.log(`Drawing tool selected: ${toolNames[tool] || tool}`);
};

const clearAll = () => {
  emit("clear-all");
};

const importGeoJSON = () => {
  fileInput.value?.click();
};

const handleFileImport = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const geojson = JSON.parse(e.target.result);
        emit("import-geojson", geojson);
      } catch (error) {
        console.error("Error parsing GeoJSON:", error);
        toast.error("Invalid GeoJSON file");
      }
    };
    reader.readAsText(file);
  }
};

const exportGeoJSON = () => {
  emit("export-geojson");
};

// Watch for style changes
watch(
  [fillColor, strokeColor, strokeWidth],
  () => {
    emit("style-changed", {
      fillColor: fillColor.value,
      strokeColor: strokeColor.value,
      strokeWidth: strokeWidth.value,
    });
  },
  { deep: true }
);
</script>
