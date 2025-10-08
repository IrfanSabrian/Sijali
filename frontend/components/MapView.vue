<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300"
  >
    <div class="relative h-[calc(100vh-8rem)] min-h-[600px]">
      <!-- Mobile Overlay -->
      <transition name="fade">
        <div
          v-if="showMainSidebar"
          class="absolute inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          @click="showMainSidebar = false"
        ></div>
      </transition>

      <!-- Main Sidebar Panel - Inside Canvas -->
      <transition name="slide-sidebar">
        <div
          v-if="showMainSidebar"
          :class="[
            'absolute top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out',
            'w-full md:w-80',
          ]"
        >
          <SidebarPanel
            @apply-layer="handleApplyLayer"
            @basemap-change="handleBasemapChange"
            @tool-change="handleToolChange"
          />
        </div>
      </transition>

      <!-- Legacy Left Sidebar - Inside Canvas -->
      <div
        v-if="showLeftSidebar && !showMainSidebar"
        class="absolute top-0 left-0 h-full w-full md:w-80 z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
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

      <!-- Map Container - Full Width -->
      <div class="w-full h-full relative">
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

        <!-- Roads Loading Indicator -->
        <div
          v-if="roadsLoading"
          class="absolute top-4 left-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 px-3 py-2"
        >
          <div class="flex items-center">
            <div
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"
            ></div>
            <span class="text-sm text-gray-600 dark:text-gray-400"
              >Memuat data jalan...</span
            >
          </div>
        </div>

        <!-- Roads Error Indicator -->
        <div
          v-if="roadsError"
          class="absolute top-4 left-4 z-40 bg-red-100 dark:bg-red-900 rounded-lg shadow-lg border border-red-200 dark:border-red-700 px-3 py-2"
        >
          <div class="flex items-center">
            <svg
              class="w-4 h-4 text-red-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="text-sm text-red-600 dark:text-red-400"
              >Error: {{ roadsError }}</span
            >
          </div>
        </div>

        <!-- Map Canvas -->
        <div ref="mapDiv" class="w-full h-full min-h-[500px] bg-gray-100"></div>

        <!-- Left Control Panel -->
        <div
          :class="[
            'controls-container absolute top-4 space-y-2 transition-all duration-300 ease-in-out',
            showMainSidebar || showLeftSidebar
              ? 'controls-container--sidebar-open'
              : 'controls-container--sidebar-closed',
          ]"
        >
          <!-- Main Sidebar Toggle Button -->
          <button
            @click="toggleMainSidebar"
            class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-500"
            :title="showMainSidebar ? 'Tutup Sidebar' : 'Buka Sidebar'"
          >
            <svg
              v-if="showMainSidebar"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <svg
              v-else
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <!-- Custom Zoom Controls -->
          <div class="zoom-controls">
            <button
              @click="zoomIn"
              class="p-2 bg-white dark:bg-gray-800 rounded-t-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 border-b-0 text-gray-600 dark:text-gray-400 hover:text-blue-500"
              title="Zoom In"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button
              @click="zoomOut"
              class="p-2 bg-white dark:bg-gray-800 rounded-b-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-500"
              title="Zoom Out"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from "vue";
import DrawingSidebar from "./DrawingSidebar.vue";
import LayerPanel from "./LayerPanel.vue";
import LegendPanel from "./LegendPanel.vue";
import MeasurementTools from "./MeasurementTools.vue";
import SearchPanel from "./SearchPanel.vue";
import SidebarPanel from "./SidebarPanel.vue";

// API Service
const { fetchRoads, convertRoadsToGeoJSON } = useApiService();

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
let roadsLayer = null;

// Widget variables
let searchWidget = null;
let basemapToggle = null;
let scaleBar = null;

// Road data
const roadsData = ref([]);
const roadsLoading = ref(false);
const roadsError = ref(null);

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

// Load roads data from API
const loadRoadsData = async (params = {}) => {
  try {
    roadsLoading.value = true;
    roadsError.value = null;

    const result = await fetchRoads({
      limit: params.limit || 100, // Load first 100 roads for performance
      ...params,
    });

    if (result.success) {
      roadsData.value = result.data;
      console.log(`Loaded ${result.data.length} roads from API`);

      // Convert to GeoJSON and add to map
      if (roadsLayer) {
        const geoJSON = convertRoadsToGeoJSON(result.data);
        await addRoadsToMap(geoJSON);
      }
    } else {
      roadsError.value = result.error;
      console.error("Failed to load roads:", result.error);
    }
  } catch (error) {
    roadsError.value = error.message;
    console.error("Error loading roads:", error);
  } finally {
    roadsLoading.value = false;
  }
};

// Add roads to map as graphics
const addRoadsToMap = async (geoJSON) => {
  try {
    // Clear existing roads
    if (roadsLayer) {
      roadsLayer.removeAll();
    }

    // Import required modules
    const [Graphic, Polyline, SimpleLineSymbol] = await Promise.all([
      import("@arcgis/core/Graphic"),
      import("@arcgis/core/geometry/Polyline"),
      import("@arcgis/core/symbols/SimpleLineSymbol"),
    ]);

    // Create graphics from GeoJSON features
    const graphics = geoJSON.features.map((feature) => {
      const polyline = new Polyline.default({
        paths: [feature.geometry.coordinates],
        spatialReference: { wkid: 4326 },
      });

      // Style based on road condition
      let color = "#666666"; // Default color
      let width = 2;

      switch (feature.properties.kondisi) {
        case "Beton":
          color = "#2E8B57"; // Sea Green
          width = 3;
          break;
        case "Aspal":
          color = "#696969"; // Dim Gray
          width = 3;
          break;
        case "Kayu":
          color = "#8B4513"; // Saddle Brown
          width = 2;
          break;
        case "Tanah":
          color = "#D2691E"; // Chocolate
          width = 2;
          break;
        default:
          color = "#666666";
          width = 2;
      }

      const symbol = new SimpleLineSymbol.default({
        color: color,
        width: width,
        style: "solid",
      });

      return new Graphic.default({
        geometry: polyline,
        symbol: symbol,
        attributes: feature.properties,
        popupTemplate: {
          title: feature.properties.nama,
          content: `
            <div class="p-2">
              <p><strong>Nama Jalan:</strong> ${feature.properties.nama}</p>
              <p><strong>Kecamatan:</strong> ${feature.properties.kecamatan}</p>
              <p><strong>Desa:</strong> ${feature.properties.desa}</p>
              <p><strong>Kondisi:</strong> ${feature.properties.kondisi}</p>
              <p><strong>Panjang:</strong> ${feature.properties.panjangM?.toFixed(
                2
              )} m</p>
              <p><strong>Lebar:</strong> ${feature.properties.lebarM} m</p>
              <p><strong>Tahun:</strong> ${feature.properties.tahun}</p>
            </div>
          `,
        },
      });
    });

    // Add graphics to roads layer
    roadsLayer.addMany(graphics);
    console.log(`Added ${graphics.length} road graphics to map`);
  } catch (error) {
    console.error("Error adding roads to map:", error);
  }
};

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
      Graphic,
    ] = await Promise.all([
      import("@arcgis/core/Map"),
      import("@arcgis/core/views/MapView"),
      import("@arcgis/core/layers/GraphicsLayer"),
      import("@arcgis/core/widgets/Sketch"),
      import("@arcgis/core/widgets/BasemapToggle"),
      import("@arcgis/core/widgets/ScaleBar"),
      import("@arcgis/core/widgets/Search"),
      import("@arcgis/core/Graphic"),
    ]);

    // Create graphics layers
    graphicsLayer = new GraphicsLayer.default({
      title: "Drawing Layer",
    });

    measurementLayer = new GraphicsLayer.default({
      title: "Measurement Layer",
    });

    // Create roads layer
    roadsLayer = new GraphicsLayer.default({
      title: "Jalan Lingkungan",
      visible: true,
    });

    // Create map with basic basemap that doesn't require API key
    map = new Map.default({
      basemap: "streets", // Basic basemap that works without API key
      layers: [roadsLayer, graphicsLayer, measurementLayer],
    });

    // Create map view
    view = new MapView.default({
      container: mapDiv.value,
      map: map,
      center: [109.3425, -0.0263], // Koordinat Pontianak, Kalimantan Barat
      zoom: 12,
      ui: {
        components: ["attribution"], // Remove default zoom widget, only keep attribution
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
    basemapToggle = new BasemapToggle.default({
      view: view,
      nextBasemap: "satellite",
    });

    scaleBar = new ScaleBar.default({
      view: view,
      unit: "metric",
    });

    searchWidget = new Search.default({
      view: view,
      placeholder: "Cari lokasi...",
      includeDefaultSources: true,
    });

    // Add widgets to view (initial positioning, will be adjusted later)
    view.ui.add(searchWidget, "top-right");
    view.ui.add(basemapToggle, "bottom-right");
    view.ui.add(scaleBar, {
      position: "manual",
    });

    // Add sketch widget (hidden by default)
    view.ui.add(sketch, "top-right");
    sketch.container.style.display = "none";

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

    // Load roads data from API
    await loadRoadsData();

    // Set initial widget positioning after view is created
    adjustWidgetPositioning();

    // Add window resize listener for responsive scale bar
    window.addEventListener("resize", adjustWidgetPositioning);
  } catch (error) {
    console.error("Error loading map:", error);
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
    loading.value = false;

    // Show detailed error message to user
    let errorMessage = "Gagal memuat peta. ";

    if (error.message.includes("Failed to fetch")) {
      errorMessage +=
        "Tidak dapat terhubung ke server backend. Pastikan server backend berjalan di port 3001.";
    } else if (error.message.includes("CORS")) {
      errorMessage += "Error CORS. Periksa konfigurasi CORS di backend.";
    } else if (error.message.includes("ArcGIS")) {
      errorMessage += "Error memuat library ArcGIS. Periksa koneksi internet.";
    } else {
      errorMessage += `Detail error: ${error.message}`;
    }

    alert(errorMessage);
  }
});

onUnmounted(() => {
  // Remove window resize listener
  window.removeEventListener("resize", adjustWidgetPositioning);

  if (view) {
    view.destroy();
  }
});

// Watch for sidebar state changes and adjust widget positioning
watch(
  [showMainSidebar, showLeftSidebar],
  () => {
    adjustWidgetPositioning();
  },
  { deep: true }
);

// Sidebar management
const toggleMainSidebar = () => {
  showMainSidebar.value = !showMainSidebar.value;
  // Hide legacy sidebar when main sidebar is shown
  if (showMainSidebar.value) {
    showLeftSidebar.value = false;
  }
  // Adjust widget positioning when sidebar state changes
  adjustWidgetPositioning();
};

// Function to adjust ESRI widget positioning based on sidebar state
const adjustWidgetPositioning = () => {
  if (!view || !searchWidget || !scaleBar) return;

  // Determine positioning based on sidebar state
  const isSidebarOpen = showMainSidebar.value || showLeftSidebar.value;

  // Position scale bar based on sidebar state
  const scaleBarContainer = scaleBar.container;
  if (scaleBarContainer) {
    if (isSidebarOpen) {
      // When sidebar is open on desktop, shift scale bar right
      scaleBarContainer.style.left =
        window.innerWidth >= 768 ? "21rem" : "1rem";
    } else {
      // When sidebar is closed, position at left
      scaleBarContainer.style.left = "1rem";
    }
    scaleBarContainer.style.bottom = "1rem";
    scaleBarContainer.style.position = "absolute";
    scaleBarContainer.style.transition = "left 0.3s ease-in-out";
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
  // Adjust widget positioning when sidebar state changes
  adjustWidgetPositioning();
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
  handleApplyLayer,
  handleBasemapChange,
  handleToolChange,
  handleLocationSelected,
  handleCoordinatesSelected,
  handleLayerChange,
  handleLayerLoaded,
  handleStyleChange,
  handleImportGeoJSON,
  handleExportGeoJSON,
  handleClearAll,
  handleMeasurementStart,
  handleMeasurementClear,
});
</script>

<style scoped>
/* Fade Animation for Overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Sidebar Slide Animation */
.slide-sidebar-enter-active,
.slide-sidebar-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.slide-sidebar-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-sidebar-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-sidebar-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Controls Container - holds both toggle button and zoom controls */
.controls-container {
  display: flex;
  flex-direction: column;
}

/* When sidebar is closed - normal position at left */
.controls-container--sidebar-closed {
  left: 1rem; /* left-4 */
}

/* When sidebar is open - shift right on desktop */
.controls-container--sidebar-open {
  left: 1rem; /* left-4 */
}

/* Desktop styles - shift controls when sidebar is open */
@media (min-width: 768px) {
  .controls-container--sidebar-open {
    left: 21rem; /* 320px (w-80) + 16px (left-4) */
  }

  .controls-container--sidebar-closed {
    left: 1rem; /* left-4 */
  }
}

/* Mobile styles - keep controls in place */
@media (max-width: 767px) {
  .controls-container--sidebar-open,
  .controls-container--sidebar-closed {
    left: 1rem; /* left-4 - stay at left on mobile */
  }
}

/* Zoom Controls Styling */
.zoom-controls {
  display: flex;
  flex-direction: column;
}

/* Button group styling */
.zoom-controls button,
.controls-container > button {
  display: block;
  width: 100%;
}

.zoom-controls button:hover,
.controls-container > button:hover {
  z-index: 10;
}

.zoom-controls button:focus,
.controls-container > button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
