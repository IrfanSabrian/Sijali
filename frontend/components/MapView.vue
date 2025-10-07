<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300"
  >
    <div class="flex h-[calc(100vh-8rem)] min-h-[600px]">
      <!-- Mobile Overlay -->
      <div
        v-if="showMainSidebar"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        @click="showMainSidebar = false"
      ></div>

      <!-- Main Sidebar Panel -->
      <div
        :class="[
          'sidebar-container transition-all duration-300 ease-in-out relative z-50',
          showMainSidebar ? 'w-full md:w-80' : 'w-0',
        ]"
      >
        <div v-if="showMainSidebar" class="h-full">
          <SidebarPanel
            @hide="showMainSidebar = false"
            @apply-layer="handleApplyLayer"
            @basemap-change="handleBasemapChange"
            @tool-change="handleToolChange"
          />
        </div>
      </div>

      <!-- Legacy Left Sidebar (for backward compatibility) -->
      <div
        v-if="showLeftSidebar && !showMainSidebar"
        class="flex-shrink-0 border-r border-gray-200 dark:border-gray-700"
      >
        <SearchPanel
          v-if="leftSidebarType === 'search'"
          @close="showLeftSidebar = false"
          @location-selected="handleLocationSelected"
          @coordinates-selected="handleCoordinatesSelected"
        />
        <LayerPanel
          v-else-if="leftSidebarType === 'layers'"
          @close="showLeftSidebar = false"
          @basemap-changed="handleBasemapChange"
          @layer-changed="handleLayerChange"
          @layer-loaded="handleLayerLoaded"
        />
        <DrawingSidebar
          v-else-if="leftSidebarType === 'drawing'"
          @close="showLeftSidebar = false"
          @tool-changed="handleToolChange"
          @style-changed="handleStyleChange"
          @import-geojson="handleImportGeoJSON"
          @export-geojson="handleExportGeoJSON"
          @clear-all="handleClearAll"
        />
        <MeasurementTools
          v-else-if="leftSidebarType === 'measurement'"
          ref="measurementToolsRef"
          @close="showLeftSidebar = false"
          @measurement-started="handleMeasurementStart"
          @measurement-cleared="handleMeasurementClear"
        />
      </div>

      <!-- Map Container -->
      <div class="flex-1 relative">
        <!-- Loading Indicator -->
        <div
          v-if="loading"
          class="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 z-50"
        >
          <div class="text-center">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"
            ></div>
            <p class="text-gray-600 dark:text-gray-400">Memuat peta...</p>
          </div>
        </div>

        <!-- Map Canvas -->
        <div ref="mapDiv" class="w-full h-full min-h-[500px] bg-gray-100"></div>

        <!-- Left Control Panel -->
        <div class="absolute top-4 left-4 z-40 space-y-2">
          <!-- Main Sidebar Toggle Button -->
          <button
            @click="toggleMainSidebar"
            :class="[
              'p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700',
              showMainSidebar
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-400',
            ]"
            title="Toggle Sidebar"
          >
            <svg
              v-if="showMainSidebar"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            <svg
              v-else
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>

        <!-- Vertical Control Panel (Left Edge) -->
        <div
          class="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 space-y-2"
        >
          <!-- Zoom In -->
          <button
            @click="zoomIn"
            class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
            title="Zoom In"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </button>

          <!-- Zoom Out -->
          <button
            @click="zoomOut"
            class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
            title="Zoom Out"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13H5v-2h14v2z" />
            </svg>
          </button>

          <!-- Search -->
          <button
            @click="toggleLeftSidebar('search')"
            :class="[
              'p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700',
              leftSidebarType === 'search' &&
              showLeftSidebar &&
              !showMainSidebar
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 dark:text-gray-400',
            ]"
            title="Pencarian"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Print -->
          <button
            @click="printMap"
            class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
            title="Print"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"
              />
            </svg>
          </button>

          <!-- Grid/Layers -->
          <button
            @click="toggleLeftSidebar('layers')"
            :class="[
              'p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700',
              leftSidebarType === 'layers' &&
              showLeftSidebar &&
              !showMainSidebar
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 dark:text-gray-400',
            ]"
            title="Layer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </button>
        </div>

        <!-- Right Control Panel -->
        <div class="absolute top-4 right-4 z-40 space-y-2">
          <!-- Legend Button -->
          <button
            @click="showRightSidebar = !showRightSidebar"
            :class="[
              'p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700',
              showRightSidebar
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 dark:text-gray-400',
            ]"
            title="Legend / Keterangan"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </button>

          <!-- Print Button -->
          <button
            @click="printMap"
            class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
            title="Print Map"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"
              />
            </svg>
          </button>

          <!-- Export Button -->
          <button
            @click="exportMap"
            class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
            title="Export Map"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
              />
              <path d="M14 2v6h6" />
              <path d="M12 12v6" />
              <path d="M15 15l-3-3-3 3" />
            </svg>
          </button>
        </div>

        <!-- Bottom Coordinate Display -->
        <div
          class="absolute bottom-4 left-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 px-3 py-2"
        >
          <div class="text-xs font-mono text-gray-600 dark:text-gray-400">
            <span class="mr-4">Lng: {{ mouseCoordinates.longitude }}</span>
            <span>Lat: {{ mouseCoordinates.latitude }}</span>
          </div>
        </div>

        <!-- Bottom Scale Display -->
        <div
          class="absolute bottom-16 right-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 px-3 py-2"
        >
          <div class="text-xs text-gray-600 dark:text-gray-400">
            <span class="mr-4">Zoom: {{ currentZoom }}</span>
            <span>Scale: 1:{{ currentScale.toLocaleString() }}</span>
          </div>
        </div>

        <!-- Help Button -->
        <div class="absolute bottom-4 right-4 z-40">
          <button
            @click="showHelp = !showHelp"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            title="Butuh Bantuan?"
          >
            Butuh Bantuan?
          </button>
        </div>
      </div>

      <!-- Right Sidebar (Legend) -->
      <div
        v-if="showRightSidebar"
        class="flex-shrink-0 border-l border-gray-200 dark:border-gray-700"
      >
        <LegendPanel
          @close="showRightSidebar = false"
          :current-scale="currentScale"
          :current-zoom="currentZoom"
          :map-center="mapCenter"
          :mouse-coordinates="mouseCoordinates"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import DrawingSidebar from "./DrawingSidebar.vue";
import LayerPanel from "./LayerPanel.vue";
import LegendPanel from "./LegendPanel.vue";
import MeasurementTools from "./MeasurementTools.vue";
import SearchPanel from "./SearchPanel.vue";
import SidebarPanel from "./SidebarPanel.vue";

// Refs
const mapDiv = ref(null);
const loading = ref(true);
const showMainSidebar = ref(true); // Main sidebar (RDTR Interaktif)
const showLeftSidebar = ref(false); // Legacy sidebar panels
const showRightSidebar = ref(false);
const showHelp = ref(false);
const leftSidebarType = ref("search"); // 'search', 'layers', 'drawing', 'measurement'
const measurementToolsRef = ref(null);

// Map variables
let map = null;
let view = null;
let sketch = null;
let graphicsLayer = null;
let measurementLayer = null;

// Map state
const currentZoom = ref(10);
const currentScale = ref(50000);
const mapCenter = reactive({ longitude: "109.3425", latitude: "-0.0263" });
const mouseCoordinates = reactive({
  longitude: "109.3425",
  latitude: "-0.0263",
});

// Drawing state
const currentDrawingTool = ref("select");
const currentStyle = ref({
  fillColor: "#3c8dbc",
  strokeColor: "#2c5aa0",
  strokeWidth: 2,
});

onMounted(async () => {
  try {
    // Configure ArcGIS API
    const config = await import("@arcgis/core/config");
    // Use a free API key or leave empty for basic basemaps
    // config.default.apiKey = "your-api-key-here";

    // Dynamic import ArcGIS modules
    const [
      Map,
      MapView,
      GraphicsLayer,
      Sketch,
      BasemapToggle,
      ScaleBar,
      Search,
      LayerList,
      Expand,
      Fullscreen,
      Locate,
      Graphic,
    ] = await Promise.all([
      import("@arcgis/core/Map"),
      import("@arcgis/core/views/MapView"),
      import("@arcgis/core/layers/GraphicsLayer"),
      import("@arcgis/core/widgets/Sketch"),
      import("@arcgis/core/widgets/BasemapToggle"),
      import("@arcgis/core/widgets/ScaleBar"),
      import("@arcgis/core/widgets/Search"),
      import("@arcgis/core/widgets/LayerList"),
      import("@arcgis/core/widgets/Expand"),
      import("@arcgis/core/widgets/Fullscreen"),
      import("@arcgis/core/widgets/Locate"),
      import("@arcgis/core/Graphic"),
    ]);

    // Create graphics layers
    graphicsLayer = new GraphicsLayer.default({
      title: "Drawing Layer",
    });

    measurementLayer = new GraphicsLayer.default({
      title: "Measurement Layer",
    });

    // Create map with basic basemap that doesn't require API key
    map = new Map.default({
      basemap: "streets", // Basic basemap that works without API key
      layers: [graphicsLayer, measurementLayer],
    });

    // Create map view
    view = new MapView.default({
      container: mapDiv.value,
      map: map,
      center: [109.3425, -0.0263], // Koordinat Pontianak, Kalimantan Barat
      zoom: 12,
      ui: {
        components: ["attribution"],
      },
      constraints: {
        snapToZoom: false,
      },
    });

    // Create sketch widget
    sketch = new Sketch.default({
      layer: graphicsLayer,
      view: view,
      creationMode: "update",
      visibleElements: {
        createTools: {
          point: false,
          polyline: false,
          polygon: false,
          rectangle: false,
          circle: false,
        },
        selectionTools: {
          "lasso-selection": false,
          "rectangle-selection": false,
        },
        settingsMenu: false,
        undoRedoMenu: false,
      },
    });

    // Add widgets
    const basemapToggle = new BasemapToggle.default({
      view: view,
      nextBasemap: "satellite",
    });

    const scaleBar = new ScaleBar.default({
      view: view,
      unit: "metric",
    });

    const search = new Search.default({
      view: view,
      placeholder: "Cari lokasi...",
      includeDefaultSources: true,
    });

    const layerList = new LayerList.default({
      view: view,
      listItemCreatedFunction: function (event) {
        const item = event.item;
        if (item.layer.type !== "group") {
          item.panel = {
            content: "legend",
            open: false,
          };
        }
      },
    });

    const layerListExpand = new Expand.default({
      view: view,
      content: layerList,
      expandIconClass: "esri-icon-layers",
      expandTooltip: "Layer List",
    });

    const fullscreen = new Fullscreen.default({
      view: view,
    });

    const locate = new Locate.default({
      view: view,
      useHeadingEnabled: false,
      goToOverride: function (view, options) {
        options.target.scale = 1500;
        return view.goTo(options.target);
      },
    });

    // Add widgets to view
    view.ui.add(search, "top-right");
    view.ui.add(locate, "top-left");
    view.ui.add(fullscreen, "top-left");
    view.ui.add(basemapToggle, "bottom-right");
    view.ui.add(layerListExpand, "bottom-right");
    view.ui.add(scaleBar, "bottom-left");

    // Add sketch widget (hidden by default)
    view.ui.add(sketch, "top-right");
    sketch.container.style.display = "none";

    // Custom zoom controls
    view.ui.add("zoom", "top-left");

    // Wait for view to load
    await view.when();

    console.log("Map view loaded successfully");
    console.log("Map container:", mapDiv.value);
    console.log("View container:", view.container);
    console.log("Current basemap:", map.basemap);
    console.log("Available basemaps:", map.basemap?.baseLayers);

    // Add event listeners
    view.on("pointer-move", (event) => {
      const point = view.toMap({ x: event.x, y: event.y });
      if (point) {
        mouseCoordinates.longitude = point.longitude.toFixed(6);
        mouseCoordinates.latitude = point.latitude.toFixed(6);
      }
    });

    view.watch("zoom", (newZoom) => {
      currentZoom.value = Math.round(newZoom);
      currentScale.value = Math.round(view.scale);
    });

    view.watch("center", (newCenter) => {
      mapCenter.longitude = newCenter.longitude.toFixed(6);
      mapCenter.latitude = newCenter.latitude.toFixed(6);
    });

    view.watch("scale", (newScale) => {
      currentScale.value = Math.round(newScale);
    });

    // Hide loading indicator
    loading.value = false;

    console.log("Map loaded successfully");
  } catch (error) {
    console.error("Error loading map:", error);
    console.error("Error details:", error.message);
    loading.value = false;

    // Show error message to user
    alert(
      "Gagal memuat peta. Silakan refresh halaman atau periksa koneksi internet."
    );
  }
});

onUnmounted(() => {
  if (view) {
    view.destroy();
  }
});

// Sidebar management
const toggleMainSidebar = () => {
  showMainSidebar.value = !showMainSidebar.value;
  // Hide legacy sidebar when main sidebar is shown
  if (showMainSidebar.value) {
    showLeftSidebar.value = false;
  }
};

const toggleLeftSidebar = (type) => {
  if (leftSidebarType.value === type && showLeftSidebar.value) {
    showLeftSidebar.value = false;
  } else {
    leftSidebarType.value = type;
    showLeftSidebar.value = true;
    // Hide main sidebar when legacy sidebar is shown
    showMainSidebar.value = false;
  }
};

// Basemap and layer handlers
const handleBasemapChange = (basemapId) => {
  if (map) {
    try {
      console.log("Changing basemap to:", basemapId);
      map.basemap = basemapId;
      console.log("Basemap changed successfully to:", basemapId);
    } catch (error) {
      console.error("Error changing basemap:", error);
      // Fallback to streets if basemap change fails
      try {
        map.basemap = "streets";
        console.log("Fallback to streets successful");
        alert(
          `Basemap "${basemapId}" tidak tersedia, menggunakan Streets sebagai gantinya.`
        );
      } catch (fallbackError) {
        console.error("Fallback basemap also failed:", fallbackError);
        alert("Gagal mengubah basemap. Silakan coba lagi.");
      }
    }
  }
};

const handleApplyLayer = (layerData) => {
  console.log("Applying layer from sidebar:", layerData);
  // Here you can implement the logic to load RDTR data based on selection
  // For now, we'll just log the data
  alert(
    `Menerapkan layer untuk:\nProvinsi: ${layerData.province}\nKabupaten: ${layerData.regency}\nRDTR: ${layerData.rdtr}\nKegiatan: ${layerData.activity}`
  );
};

// Zoom controls
const zoomIn = () => {
  if (view) {
    view.goTo({
      zoom: view.zoom + 1,
    });
  }
};

const zoomOut = () => {
  if (view) {
    view.goTo({
      zoom: view.zoom - 1,
    });
  }
};

const handleLayerChange = (layerData) => {
  console.log("Layer changed:", layerData);
  // Implement layer visibility and opacity changes
};

// Measurement handlers
const handleMeasurementStart = async (measurementData) => {
  console.log("Measurement started:", measurementData);

  if (!view) return;

  try {
    // Import measurement widgets
    const [DistanceMeasurement2D, AreaMeasurement2D, CoordinateConversion] =
      await Promise.all([
        import("@arcgis/core/widgets/DistanceMeasurement2D"),
        import("@arcgis/core/widgets/AreaMeasurement2D"),
        import("@arcgis/core/widgets/CoordinateConversion"),
      ]);

    // Clear existing measurement widgets
    const existingWidgets = view.ui.find("measurement-widget");
    if (existingWidgets) {
      view.ui.remove(existingWidgets);
    }

    if (measurementData.type === "distance") {
      const distanceWidget = new DistanceMeasurement2D.default({
        view: view,
        id: "measurement-widget",
      });
      view.ui.add(distanceWidget, "top-right");
      distanceWidget.viewModel.start();
    } else if (measurementData.type === "area") {
      const areaWidget = new AreaMeasurement2D.default({
        view: view,
        id: "measurement-widget",
      });
      view.ui.add(areaWidget, "top-right");
      areaWidget.viewModel.start();
    } else if (measurementData.type === "coordinate") {
      const coordWidget = new CoordinateConversion.default({
        view: view,
        id: "measurement-widget",
      });
      view.ui.add(coordWidget, "top-right");
    } else if (measurementData.type === "stop") {
      // Remove measurement widgets
      const widgets = view.ui.find("measurement-widget");
      if (widgets) {
        view.ui.remove(widgets);
      }
    }
  } catch (error) {
    console.error("Error starting measurement:", error);
    alert("Gagal memulai pengukuran");
  }
};

const handleMeasurementClear = () => {
  console.log("Measurements cleared");

  if (!view) return;

  // Remove measurement widgets
  const widgets = view.ui.find("measurement-widget");
  if (widgets) {
    view.ui.remove(widgets);
  }

  // Clear measurement graphics
  if (measurementLayer) {
    measurementLayer.removeAll();
  }

  // Clear graphics from the view
  if (view.graphics) {
    view.graphics.removeAll();
  }
};

// Print and export handlers
const printMap = () => {
  if (view) {
    view.takeScreenshot().then((screenshot) => {
      const link = document.createElement("a");
      link.href = screenshot.dataUrl;
      link.download = `peta-sijali-${
        new Date().toISOString().split("T")[0]
      }.png`;
      link.click();
    });
  }
};

const exportMap = () => {
  // Create export options dialog
  const exportOptions = [
    { format: "PNG", extension: "png" },
    { format: "JPEG", extension: "jpg" },
    { format: "PDF", extension: "pdf" },
  ];

  const format = prompt(
    `Pilih format export:\n${exportOptions
      .map((opt, i) => `${i + 1}. ${opt.format}`)
      .join("\n")}`
  );

  if (format && format >= 1 && format <= exportOptions.length) {
    const selectedFormat = exportOptions[format - 1];

    if (view) {
      view
        .takeScreenshot({ format: selectedFormat.extension })
        .then((screenshot) => {
          const link = document.createElement("a");
          link.href = screenshot.dataUrl;
          link.download = `peta-sijali-${
            new Date().toISOString().split("T")[0]
          }.${selectedFormat.extension}`;
          link.click();
        });
    }
  }
};

// Drawing tool handlers
const handleToolChange = ({ tool, style }) => {
  currentDrawingTool.value = tool;
  currentStyle.value = style;

  if (sketch) {
    // Reset sketch widget
    sketch.cancel();

    // Set active tool
    switch (tool) {
      case "point":
        sketch.create("point");
        break;
      case "polyline":
        sketch.create("polyline");
        break;
      case "polygon":
        sketch.create("polygon");
        break;
      case "rectangle":
        sketch.create("rectangle");
        break;
      case "select":
        // Enable selection mode
        break;
      default:
        break;
    }
  }
};

const handleStyleChange = (style) => {
  currentStyle.value = style;
  // Update existing graphics with new style
  if (graphicsLayer) {
    graphicsLayer.graphics.forEach((graphic) => {
      updateGraphicStyle(graphic, style);
    });
  }
};

const updateGraphicStyle = (graphic, style) => {
  const { fillColor, strokeColor, strokeWidth } = style;

  if (graphic.geometry.type === "point") {
    graphic.symbol = {
      type: "simple-marker",
      color: fillColor,
      outline: {
        color: strokeColor,
        width: strokeWidth,
      },
      size: 8,
    };
  } else if (graphic.geometry.type === "polyline") {
    graphic.symbol = {
      type: "simple-line",
      color: strokeColor,
      width: strokeWidth,
    };
  } else if (graphic.geometry.type === "polygon") {
    graphic.symbol = {
      type: "simple-fill",
      color: fillColor + "80", // Add transparency
      outline: {
        color: strokeColor,
        width: strokeWidth,
      },
    };
  }
};

const handleImportGeoJSON = async (geojson) => {
  try {
    const [Graphic, geometryEngine] = await Promise.all([
      import("@arcgis/core/Graphic"),
      import("@arcgis/core/geometry/geometryEngine"),
    ]);

    // Clear existing graphics
    graphicsLayer.removeAll();

    // Convert GeoJSON to ArcGIS graphics
    if (geojson.type === "FeatureCollection") {
      geojson.features.forEach((feature) => {
        const graphic = new Graphic.default({
          geometry: feature.geometry,
          attributes: feature.properties,
        });
        updateGraphicStyle(graphic, currentStyle.value);
        graphicsLayer.add(graphic);
      });
    } else if (geojson.type === "Feature") {
      const graphic = new Graphic.default({
        geometry: geojson.geometry,
        attributes: geojson.properties,
      });
      updateGraphicStyle(graphic, currentStyle.value);
      graphicsLayer.add(graphic);
    }

    // Zoom to imported graphics
    if (graphicsLayer.graphics.length > 0) {
      view.goTo(graphicsLayer.graphics);
    }
  } catch (error) {
    console.error("Error importing GeoJSON:", error);
    alert("Error importing GeoJSON");
  }
};

const handleExportGeoJSON = () => {
  try {
    const features = [];

    graphicsLayer.graphics.forEach((graphic) => {
      const feature = {
        type: "Feature",
        geometry: graphic.geometry.toJSON(),
        properties: graphic.attributes || {},
      };
      features.push(feature);
    });

    const geojson = {
      type: "FeatureCollection",
      features: features,
    };

    // Download as file
    const blob = new Blob([JSON.stringify(geojson, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sijali-drawings.geojson";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting GeoJSON:", error);
    alert("Error exporting GeoJSON");
  }
};

const handleClearAll = () => {
  if (graphicsLayer) {
    graphicsLayer.removeAll();
  }
};

// Search handlers
const handleLocationSelected = (location) => {
  if (view) {
    view.goTo({
      center: [location.coordinates.lng, location.coordinates.lat],
      zoom: 16,
    });
  }
};

const handleCoordinatesSelected = (coordinates) => {
  if (view) {
    view.goTo({
      center: [coordinates.lng, coordinates.lat],
      zoom: 16,
    });
  }
};

// Handle layer loaded from data service
const handleLayerLoaded = async (layerData) => {
  if (!view || !layerData || !layerData.data) return;

  try {
    // Import GeoJSON module
    const GeoJSONLayer = await import("@arcgis/core/layers/GeoJSONLayer");

    // Create a blob URL for the GeoJSON data
    const blob = new Blob([JSON.stringify(layerData.data)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    // Create GeoJSON layer
    const geoJsonLayer = new GeoJSONLayer.default({
      url: url,
      title: layerData.name,
      visible: layerData.visible,
      opacity: layerData.opacity,
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-line",
          color: layerData.style.color || "#FFD700",
          width: layerData.style.width || 3,
        },
      },
      popupTemplate: {
        title: "{Nama_Jalan}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              { fieldName: "Nama_Jalan", label: "Nama Jalan" },
              { fieldName: "Panjang_M", label: "Panjang (m)" },
              { fieldName: "Lebar_m_", label: "Lebar (m)" },
              { fieldName: "Kondisi", label: "Kondisi" },
              { fieldName: "Keterangan", label: "Keterangan" },
              { fieldName: "Tahun", label: "Tahun" },
              { fieldName: "Kecamatan", label: "Kecamatan" },
              { fieldName: "Desa", label: "Desa" },
            ],
          },
        ],
      },
    });

    // Add layer to map
    map.add(geoJsonLayer);

    // Zoom to layer extent if center and zoom are provided
    if (layerData.center && layerData.zoom) {
      view.goTo({
        center: layerData.center,
        zoom: layerData.zoom,
      });
    }

    // Clean up blob URL after layer is loaded
    geoJsonLayer.when(() => {
      URL.revokeObjectURL(url);
    });

    console.log(`Layer ${layerData.name} loaded successfully`);
  } catch (error) {
    console.error("Error adding layer to map:", error);
    alert("Gagal menambahkan layer ke peta");
  }
};

// Expose methods to parent component
defineExpose({
  toggleMainSidebar,
});
</script>
