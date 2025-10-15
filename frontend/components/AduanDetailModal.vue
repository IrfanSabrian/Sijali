<template>
  <transition name="fade">
    <div
      v-if="visible"
      @click="closeModal"
      class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-2 lg:p-4"
    >
      <div
        @click.stop
        class="w-full max-w-6xl h-[95vh] lg:h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
      >
        <!-- Header -->
        <div
          class="bg-blue-600 text-white px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between"
        >
          <h3 class="text-lg lg:text-xl font-bold">
            Detail Aduan #{{ aduan?.id }} - Ruas {{ aduan?.nomor_ruas }}
          </h3>
          <button
            @click="closeModal"
            class="text-white hover:text-gray-200 transition-colors p-2"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <!-- Left Side - Complaint Details -->
          <div
            class="w-full lg:w-1/2 p-4 lg:p-6 overflow-y-auto border-r-0 lg:border-r border-b lg:border-b-0 border-gray-200 dark:border-gray-700 order-2 lg:order-1"
          >
            <div class="space-y-6">
              <!-- Basic Info -->
              <div>
                <h4
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                >
                  Informasi Aduan
                </h4>
                <div class="grid grid-cols-1 gap-4">
                  <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300"
                      >Nomor Ruas</label
                    >
                    <p class="text-gray-900 dark:text-white font-medium">
                      {{ aduan?.nomor_ruas || "-" }}
                    </p>
                  </div>
                  <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300"
                      >Nama Pelapor</label
                    >
                    <p class="text-gray-900 dark:text-white font-medium">
                      {{
                        aduan?.nama_pelapor || (aduan?.anonim ? "Anonim" : "-")
                      }}
                    </p>
                  </div>
                  <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300"
                      >Email</label
                    >
                    <p class="text-gray-900 dark:text-white font-medium">
                      {{ aduan?.email || "-" }}
                    </p>
                  </div>
                  <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300"
                      >Status</label
                    >
                    <span
                      :class="getStatusClass(aduan?.status)"
                      class="px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {{ getStatusLabel(aduan?.status) }}
                    </span>
                  </div>
                  <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300"
                      >Tanggal</label
                    >
                    <p class="text-gray-900 dark:text-white">
                      {{ formatDate(aduan?.created_at) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Road Information -->
              <div v-if="roadInfo">
                <h4
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                >
                  Informasi Jalan
                </h4>
                <div class="grid grid-cols-1 gap-4">
                  <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300"
                      >Nama Jalan</label
                    >
                    <p class="text-gray-900 dark:text-white font-medium">
                      {{ roadInfo.namaJalan || roadInfo.nama || "-" }}
                    </p>
                  </div>
                  <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300"
                      >Kecamatan</label
                    >
                    <p class="text-gray-900 dark:text-white">
                      {{ roadInfo.kecamatan || "-" }}
                    </p>
                  </div>
                  <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300"
                      >Desa</label
                    >
                    <p class="text-gray-900 dark:text-white">
                      {{ roadInfo.desa || "-" }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div>
                <label class="text-sm text-gray-600 dark:text-gray-300"
                  >Keterangan</label
                >
                <p class="text-gray-900 dark:text-white mt-1">
                  {{ aduan?.description || "-" }}
                </p>
              </div>

              <!-- Photos -->
              <div v-if="aduan?.photos && aduan.photos.length">
                <label class="text-sm text-gray-600 dark:text-gray-300">
                  Foto ({{ aduan.photos.length }})
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <a
                    v-for="(photo, idx) in aduan.photos"
                    :key="idx"
                    :href="`/aduan/${aduan.nomor_ruas}/${photo}`"
                    :data-fancybox="`gallery-${aduan.id}`"
                    :data-caption="`Foto ${idx + 1} - Aduan #${aduan.id}`"
                    class="block"
                    @click.prevent="openFancybox(photo, idx)"
                  >
                    <img
                      :src="`/aduan/${aduan.nomor_ruas}/${photo}`"
                      :alt="`Foto ${idx + 1}`"
                      class="w-full h-32 object-cover rounded border border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </a>
                </div>
              </div>

              <!-- Status Update (for admin) -->
              <div v-if="isAdmin">
                <h4
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                >
                  Update Status
                </h4>
                <div class="flex items-center gap-3">
                  <select
                    v-model="newStatus"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="diajukan">Diajukan</option>
                    <option value="ditinjau">Ditinjau</option>
                    <option value="selesai">Selesai</option>
                    <option value="ditolak">Ditolak</option>
                  </select>
                  <button
                    @click="updateStatus"
                    :disabled="updateLoading"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {{ updateLoading ? "Updating..." : "Update" }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Map -->
          <div class="w-full lg:w-1/2 relative order-1 lg:order-2">
            <div ref="mapContainer" class="w-full h-64 lg:h-full relative">
              <!-- Map Controls Container -->
              <div class="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <!-- Zoom Controls -->
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

                <!-- Basemap Selector Button -->
                <button
                  @click="showBasemapSelector = !showBasemapSelector"
                  class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-500"
                  title="Pilih Basemap"
                >
                  <FontAwesomeIcon :icon="faLayerGroup" class="text-lg" />
                </button>
              </div>

              <!-- Legend Toggle Button (Top Right) -->
              <div class="absolute top-4 right-4 z-10">
                <button
                  v-if="!legendVisible"
                  @click="legendVisible = true"
                  class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  title="Tampilkan Legenda"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="text-gray-700 dark:text-gray-300"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
              </div>

              <!-- Basemap Selector -->
              <div
                v-if="showBasemapSelector"
                class="absolute top-4 left-16 z-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-xs"
              >
                <div class="flex items-center justify-between mb-3">
                  <h4
                    class="text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Pilih Basemap
                  </h4>
                  <button
                    @click="showBasemapSelector = false"
                    class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div class="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                  <button
                    v-for="bm in basemapOptions"
                    :key="bm.id"
                    @click="
                      handleBasemapChange(bm.id);
                      showBasemapSelector = false;
                    "
                    :class="[
                      'flex items-center space-x-3 p-2 rounded-lg border transition-colors',
                      currentBasemap === bm.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10',
                    ]"
                  >
                    <img
                      :src="bm.thumbnail"
                      :alt="bm.label"
                      class="w-8 h-8 rounded object-cover"
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      {{ bm.label }}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div
              v-if="mapLoading"
              class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
            >
              <div class="text-center">
                <div
                  class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
                ></div>
                <p class="mt-2 text-gray-600 dark:text-gray-400">
                  Memuat peta...
                </p>
              </div>
            </div>

            <!-- Map Legend -->
            <div
              v-if="legendVisible"
              class="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
                  Legenda
                </h4>
                <button
                  @click="legendVisible = false"
                  class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title="Sembunyikan Legenda"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div class="space-y-1 text-xs">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-0.5 bg-[#3b82f6] rounded"></div>
                  <span class="text-gray-700 dark:text-gray-300"
                    >Kabupaten</span
                  >
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-8 h-0.5 bg-[#ec4899] rounded"></div>
                  <span class="text-gray-700 dark:text-gray-300"
                    >Kecamatan</span
                  >
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-8 h-0.5 bg-[#a855f7] rounded"></div>
                  <span class="text-gray-700 dark:text-gray-300">Desa</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-8 h-1 bg-[#10b981] rounded"></div>
                  <span class="text-gray-700 dark:text-gray-300">Baik</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-8 h-1 bg-[#eab308] rounded"></div>
                  <span class="text-gray-700 dark:text-gray-300">Sedang</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-8 h-1 bg-[#f97316] rounded"></div>
                  <span class="text-gray-700 dark:text-gray-300"
                    >Rusak Ringan</span
                  >
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-8 h-1 bg-[#dc2626] rounded"></div>
                  <span class="text-gray-700 dark:text-gray-300"
                    >Rusak Berat</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useApiService } from "~/composables/useApiService";
import { useToast } from "~/composables/useToast";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  aduan: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "updated"]);

const { fetchAduan, updateAduanStatus } = useApiService();
const toast = useToast();

// Refs
const mapContainer = ref(null);
const mapLoading = ref(false);
const newStatus = ref("");
const updateLoading = ref(false);
const roadInfo = ref(null);
const legendVisible = ref(true);
const currentBasemap = ref("topo");
const showBasemapSelector = ref(false);

// Map variables
let map = null;
let view = null;
let roadsLayer = null;

// Basemap options
const basemapOptions = [
  {
    id: "satellite",
    label: "Imagery",
    thumbnail: "/basemap/imagery.png",
  },
  {
    id: "hybrid",
    label: "Imagery With Labels",
    thumbnail: "/basemap/imageryWithLabels.png",
  },
  {
    id: "streets",
    label: "Streets",
    thumbnail: "/basemap/streets.png",
  },
  {
    id: "topo",
    label: "Topographic",
    thumbnail: "/basemap/topographic.png",
  },
  {
    id: "terrain",
    label: "Terrain With Labels",
    thumbnail: "/basemap/terrainWithLabels.png",
  },
  {
    id: "gray",
    label: "Light Gray Canvas",
    thumbnail: "/basemap/lightGrayCanvas.png",
  },
  {
    id: "national-geographic",
    label: "National Geographic",
    thumbnail: "/basemap/nationalGeographic.png",
  },
  {
    id: "oceans",
    label: "Ocean",
    thumbnail: "/basemap/ocean.png",
  },
  {
    id: "osm",
    label: "OpenStreetMap",
    thumbnail: "/basemap/openStreetMap.png",
  },
];

// Check if user is admin
const isAdmin = ref(false);

onMounted(() => {
  // Check if user is admin
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("sijali_user") || "{}");
    isAdmin.value = user.role === "ADMIN";
  }
});

watch(
  () => props.visible,
  async (newVal) => {
    if (newVal) {
      newStatus.value = props.aduan?.status || "";
      await loadRoadInfo();
      await nextTick();
      initMap();

      // Initialize Fancybox when modal opens
      if (typeof window !== "undefined" && window.Fancybox) {
        // Destroy any existing Fancybox instances first
        window.Fancybox.destroy();

        // Configure Fancybox with single close button
        window.Fancybox.bind("[data-fancybox]", {
          Toolbar: {
            display: {
              left: ["infobar"],
              middle: [
                "zoomIn",
                "zoomOut",
                "toggle1to1",
                "rotateCCW",
                "rotateCW",
                "flipX",
                "flipY",
              ],
              right: ["slideshow", "thumbs"],
            },
          },
          Thumbs: {
            autoStart: false,
          },
          closeButton: "top",
          click: "close",
          wheel: "slide",
          keyboard: {
            Escape: "close",
          },
          backdropClick: "close",
        });
      }
    } else {
      destroyMap();

      // Destroy Fancybox when modal closes
      if (typeof window !== "undefined" && window.Fancybox) {
        window.Fancybox.destroy();
      }
    }
  }
);

watch(
  () => props.aduan,
  async (newVal) => {
    if (newVal && props.visible) {
      newStatus.value = newVal.status || "";
      await loadRoadInfo();
      await nextTick();
      initMap();
    }
  }
);

const loadRoadInfo = async () => {
  if (!props.aduan?.nomor_ruas) return;

  try {
    const config = useRuntimeConfig();
    const API_BASE = config.public.apiBaseUrl || "http://localhost:3001";

    // First get basic road info
    const response = await fetch(
      `${API_BASE}/api/jalan?noRuas=${props.aduan.nomor_ruas}`
    );
    const data = await response.json();

    if (data.success && data.data.length > 0) {
      roadInfo.value = data.data[0];

      // Then get geometry data from GeoJSON endpoint
      const geoResponse = await fetch(`${API_BASE}/api/jalan/geojson`);
      const geoData = await geoResponse.json();

      if (geoData.success && geoData.data.features) {
        // Find the road with matching noRuas
        const roadFeature = geoData.data.features.find(
          (feature) => feature.properties.noRuas === props.aduan.nomor_ruas
        );

        if (roadFeature) {
          // Add geometry to road info
          roadInfo.value.geometry = JSON.stringify(roadFeature.geometry);
        }
      }
    }
  } catch (error) {
    console.error("Error loading road info:", error);
  }
};

const initMap = async () => {
  if (!mapContainer.value || !props.aduan?.nomor_ruas) return;

  mapLoading.value = true;

  try {
    // Load ArcGIS modules
    const [
      Map,
      MapView,
      GraphicsLayer,
      Graphic,
      SimpleLineSymbol,
      SimpleFillSymbol,
    ] = await Promise.all([
      import("@arcgis/core/Map"),
      import("@arcgis/core/views/MapView"),
      import("@arcgis/core/layers/GraphicsLayer"),
      import("@arcgis/core/Graphic"),
      import("@arcgis/core/symbols/SimpleLineSymbol"),
      import("@arcgis/core/symbols/SimpleFillSymbol"),
    ]);

    // Create map
    map = new Map.default({
      basemap: "streets-navigation-vector",
    });

    // Create view
    view = new MapView.default({
      container: mapContainer.value,
      map: map,
      center: [109.5, -0.5], // Center on Kubu Raya
      zoom: 10,
      ui: {
        components: [], // Disable all default UI components including zoom
      },
    });

    // Create layers
    const batasKabupatenLayer = new GraphicsLayer.default({
      title: "Batas Kabupaten",
    });

    const batasKecamatanLayer = new GraphicsLayer.default({
      title: "Batas Kecamatan",
    });

    const batasDesaLayer = new GraphicsLayer.default({
      title: "Batas Desa",
    });

    roadsLayer = new GraphicsLayer.default({
      title: "Roads",
    });

    map.add(batasKabupatenLayer);
    map.add(batasKecamatanLayer);
    map.add(batasDesaLayer);
    map.add(roadsLayer);

    // Wait for view to be ready
    await view.when();

    // Load all data
    await loadAllMapData(
      batasKabupatenLayer,
      batasKecamatanLayer,
      batasDesaLayer,
      roadsLayer
    );

    mapLoading.value = false;
  } catch (error) {
    console.error("Error initializing map:", error);
    mapLoading.value = false;
  }
};

const loadAllMapData = async (
  batasKabupatenLayer,
  batasKecamatanLayer,
  batasDesaLayer,
  roadsLayer
) => {
  try {
    // Load roads data
    const config = useRuntimeConfig();
    const API_BASE = config.public.apiBaseUrl || "http://localhost:3001";

    const response = await fetch(`${API_BASE}/api/jalan/geojson`);
    const data = await response.json();

    if (data.success && data.data.features) {
      console.log(
        "🔍 Looking for road with nomor_ruas:",
        props.aduan.nomor_ruas
      );
      console.log(
        "🔍 Available roads:",
        data.data.features.slice(0, 3).map((f) => f.properties.noRuas)
      );

      // Find and show only the specific road
      const targetRoad = data.data.features.find(
        (feature) =>
          feature.properties.noRuas === props.aduan.nomor_ruas ||
          feature.properties.noRuas === String(props.aduan.nomor_ruas) ||
          feature.properties.noRuas === Number(props.aduan.nomor_ruas) ||
          String(feature.properties.noRuas) === String(props.aduan.nomor_ruas)
      );

      console.log("🔍 Target road found:", targetRoad);

      if (targetRoad) {
        console.log("✅ Adding road to map and zooming");
        // Add only the specific road to the map
        await addSpecificRoadToMap(targetRoad, roadsLayer);
        await zoomToRoad(targetRoad);
      } else {
        // Try alternative property names with robust comparison
        const alternativeRoad = data.data.features.find(
          (feature) =>
            feature.properties.nomor_ruas === props.aduan.nomor_ruas ||
            feature.properties.NOMOR_RUAS === props.aduan.nomor_ruas ||
            feature.properties.no_ruas === props.aduan.nomor_ruas ||
            String(feature.properties.nomor_ruas) ===
              String(props.aduan.nomor_ruas) ||
            String(feature.properties.NOMOR_RUAS) ===
              String(props.aduan.nomor_ruas) ||
            String(feature.properties.no_ruas) ===
              String(props.aduan.nomor_ruas)
        );

        if (alternativeRoad) {
          console.log("✅ Found road with alternative property");
          await addSpecificRoadToMap(alternativeRoad, roadsLayer);
          await zoomToRoad(alternativeRoad);
        } else {
          console.log("❌ No road found, showing all roads for debugging");
          await addAllRoadsToMap(data.data, roadsLayer);
        }
      }
    }

    // Always load kabupaten boundary first
    await loadKabupatenBoundary(batasKabupatenLayer);

    // Load boundary data based on road location
    if (roadInfo.value) {
      await loadRelevantBoundaries(
        batasKabupatenLayer,
        batasKecamatanLayer,
        batasDesaLayer
      );
    } else {
      // Load all boundaries as fallback
      await loadAllBoundaries(
        batasKabupatenLayer,
        batasKecamatanLayer,
        batasDesaLayer
      );
    }
  } catch (error) {
    console.error("Error loading map data:", error);
  }
};

const addSpecificRoadToMap = async (roadFeature, roadsLayer) => {
  try {
    console.log("🛣️ Adding road to map:", roadFeature.properties);

    const [Graphic, Polyline, SimpleLineSymbol] = await Promise.all([
      import("@arcgis/core/Graphic"),
      import("@arcgis/core/geometry/Polyline"),
      import("@arcgis/core/symbols/SimpleLineSymbol"),
    ]);

    const polyline = new Polyline.default({
      paths: [roadFeature.geometry.coordinates],
      spatialReference: { wkid: 4326 },
    });

    const colorHex = getRoadColor(roadFeature);
    console.log(
      "🛣️ Road color:",
      colorHex,
      "Road condition:",
      roadFeature.properties.keterangan || roadFeature.properties.kondisi
    );

    // Convert hex color to RGBA array for ArcGIS
    const color = hexToRgba(colorHex);

    const symbol = new SimpleLineSymbol.default({
      color: color,
      width: 4, // Make it thicker since it's the only road shown
      style: "solid",
    });

    const graphic = new Graphic.default({
      geometry: polyline,
      symbol: symbol,
      attributes: roadFeature.properties,
    });

    roadsLayer.add(graphic);
    console.log("✅ Road graphic added to layer");
  } catch (error) {
    console.error("Error adding specific road to map:", error);
  }
};

const addAllRoadsToMap = async (geoJSON, roadsLayer) => {
  try {
    const [Graphic, Polyline, SimpleLineSymbol] = await Promise.all([
      import("@arcgis/core/Graphic"),
      import("@arcgis/core/geometry/Polyline"),
      import("@arcgis/core/symbols/SimpleLineSymbol"),
    ]);

    const graphics = geoJSON.features.map((feature) => {
      const polyline = new Polyline.default({
        paths: [feature.geometry.coordinates],
        spatialReference: { wkid: 4326 },
      });

      const colorHex = getRoadColor(feature);
      const color = hexToRgba(colorHex);

      const symbol = new SimpleLineSymbol.default({
        color: color,
        width: 1.2,
        style: "solid",
      });

      return new Graphic.default({
        geometry: polyline,
        symbol: symbol,
        attributes: feature.properties,
      });
    });

    roadsLayer.addMany(graphics);
  } catch (error) {
    console.error("Error adding all roads to map:", error);
  }
};

// Convert hex color to RGBA array for ArcGIS
const hexToRgba = (hex) => {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse hex values
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return [r, g, b, 1]; // Return RGBA array
};

// Handle basemap change
const handleBasemapChange = async (basemapId) => {
  if (map) {
    try {
      console.log("Changing basemap to:", basemapId);

      // Special handling for National Geographic basemap (uses Portal Item)
      if (basemapId === "national-geographic") {
        try {
          const [Basemap, PortalItem] = await Promise.all([
            import("@arcgis/core/Basemap"),
            import("@arcgis/core/portal/PortalItem"),
          ]);

          // Create basemap from National Geographic Portal Item
          const portalItem = new PortalItem.default({
            id: "d94dcdbe78e141c2b2d3a91d5ca8b9c9", // National Geographic Style basemap
          });

          const natGeoBasemap = new Basemap.default({
            portalItem: portalItem,
          });

          map.basemap = natGeoBasemap;
          console.log("National Geographic basemap loaded successfully");

          // Update current basemap state
          currentBasemap.value = basemapId;
        } catch (natGeoError) {
          console.error(
            "Error loading National Geographic basemap:",
            natGeoError
          );
          throw natGeoError;
        }
      } else {
        // Standard basemap IDs
        map.basemap = basemapId;
        console.log("Basemap changed successfully to:", basemapId);

        // Update current basemap state
        currentBasemap.value = basemapId;
      }
    } catch (error) {
      console.error("Error changing basemap:", error);
      // Fallback to topo if basemap change fails
      try {
        map.basemap = "topo";
        currentBasemap.value = "topo";
        console.log("Fallback to topo successful");
        alert(
          `Basemap "${basemapId}" tidak tersedia, menggunakan Topographic sebagai gantinya.`
        );
      } catch (fallbackError) {
        console.error("Fallback basemap also failed:", fallbackError);
        alert("Gagal mengubah basemap. Silakan coba lagi.");
      }
    }
  }
};

const getRoadColor = (feature) => {
  let color = "#666666"; // Default color (gray for unknown)

  switch (feature.properties.keterangan) {
    case "Baik":
      color = "#10b981"; // Green - Good condition
      break;
    case "Sedang":
      color = "#eab308"; // Yellow - Fair condition
      break;
    case "Rusak Ringan":
      color = "#f97316"; // Orange - Light damage
      break;
    case "Rusak Berat":
      color = "#dc2626"; // Red - Heavy damage (bright red)
      break;
    default:
      // Fallback to material type if keterangan not available
      switch (feature.properties.kondisi) {
        case "Beton":
          color = "#10b981"; // Green for concrete
          break;
        case "Aspal":
          color = "#eab308"; // Yellow for asphalt
          break;
        case "Paving":
          color = "#3b82f6"; // Blue for paving
          break;
        case "Tanah":
          color = "#a855f7"; // Purple for dirt
          break;
        default:
          color = "#6b7280"; // Gray for unknown
      }
  }

  return color;
};

const zoomToRoad = async (roadFeature) => {
  try {
    console.log("🔍 Zooming to road:", roadFeature.properties);

    // Create polyline geometry for the road
    const [Polyline] = await Promise.all([
      import("@arcgis/core/geometry/Polyline"),
    ]);

    const polyline = new Polyline.default({
      paths: [roadFeature.geometry.coordinates],
      spatialReference: { wkid: 4326 },
    });

    console.log("🔍 Road geometry created:", polyline);

    // Use the same zoom approach as homepage
    await view.goTo(
      {
        target: polyline,
        zoom: 16, // Zoom in close to see the road
      },
      {
        duration: 1000,
        easing: "ease-in-out",
      }
    );

    console.log("✅ Zoom completed");
  } catch (error) {
    console.error("Error zooming to road:", error);
  }
};

const loadKabupatenBoundary = async (batasKabupatenLayer) => {
  try {
    const kabupatenResponse = await fetch(
      "/geojson/Batas Kabupaten Kubu Raya.geojson"
    );
    const kabupatenData = await kabupatenResponse.json();

    if (kabupatenData.features && kabupatenData.features.length > 0) {
      console.log("Adding kabupaten boundary");
      await addBoundaryToLayer(
        kabupatenData.features[0],
        batasKabupatenLayer,
        [239, 68, 68, 1], // Red - same as homepage
        1.5
      );
    }
  } catch (error) {
    console.error("Error loading kabupaten boundary:", error);
  }
};

const loadRelevantBoundaries = async (
  batasKabupatenLayer,
  batasKecamatanLayer,
  batasDesaLayer
) => {
  if (!roadInfo.value) return;

  try {
    // Load district boundaries
    const districtResponse = await fetch(
      "/geojson/Batas Kecamatan Kubu Raya.geojson"
    );
    const districtData = await districtResponse.json();

    // Filter to show only the district where the road is located
    const relevantDistrict = districtData.features.find(
      (feature) => feature.properties.NAMOBJ === roadInfo.value.kecamatan
    );

    if (relevantDistrict) {
      console.log("Adding district boundary for:", roadInfo.value.kecamatan);
      await addBoundaryToLayer(
        relevantDistrict,
        batasKecamatanLayer,
        [59, 130, 246, 1], // Blue - same as homepage
        1.25
      );
    } else {
      console.log("District not found for:", roadInfo.value.kecamatan);
    }

    // Load village boundaries
    const villageResponse = await fetch(
      "/geojson/Batas Desa Kubu Raya.geojson"
    );
    const villageData = await villageResponse.json();

    // Filter to show only the village where the road is located
    const relevantVillage = villageData.features.find(
      (feature) => feature.properties.NAMOBJ === roadInfo.value.desa
    );

    if (relevantVillage) {
      console.log("Adding village boundary for:", roadInfo.value.desa);
      await addBoundaryToLayer(
        relevantVillage,
        batasDesaLayer,
        [168, 85, 247, 1], // Purple - same as homepage
        0.9
      );
    } else {
      console.log("Village not found for:", roadInfo.value.desa);
    }
  } catch (error) {
    console.error("Error loading relevant boundaries:", error);
  }
};

const loadAllBoundaries = async (
  batasKabupatenLayer,
  batasKecamatanLayer,
  batasDesaLayer
) => {
  try {
    // Load all district boundaries
    const districtResponse = await fetch(
      "/geojson/Batas Kecamatan Kubu Raya.geojson"
    );
    const districtData = await districtResponse.json();

    for (const feature of districtData.features) {
      await addBoundaryToLayer(
        feature,
        batasKecamatanLayer,
        [59, 130, 246, 1], // Blue - same as homepage
        1.25
      );
    }

    // Load all village boundaries
    const villageResponse = await fetch(
      "/geojson/Batas Desa Kubu Raya.geojson"
    );
    const villageData = await villageResponse.json();

    for (const feature of villageData.features) {
      await addBoundaryToLayer(feature, batasDesaLayer, [168, 85, 247, 1], 0.9); // Purple - same as homepage
    }
  } catch (error) {
    console.error("Error loading all boundaries:", error);
  }
};

const addBoundaryToLayer = async (feature, layer, color, width) => {
  try {
    const [Graphic, Polygon, SimpleFillSymbol, SimpleLineSymbol] =
      await Promise.all([
        import("@arcgis/core/Graphic"),
        import("@arcgis/core/geometry/Polygon"),
        import("@arcgis/core/symbols/SimpleFillSymbol"),
        import("@arcgis/core/symbols/SimpleLineSymbol"),
      ]);

    let rings = [];
    if (feature.geometry.type === "MultiPolygon") {
      feature.geometry.coordinates.forEach((polygon) => {
        rings.push(...polygon);
      });
    } else if (feature.geometry.type === "Polygon") {
      rings = feature.geometry.coordinates;
    }

    const polygon = new Polygon.default({
      rings: rings,
      spatialReference: { wkid: 4326 },
    });

    const symbol = new SimpleFillSymbol.default({
      color: [0, 0, 0, 0], // Transparent fill
      outline: new SimpleLineSymbol.default({
        color: color,
        width: width,
        style: "solid",
      }),
    });

    const graphic = new Graphic.default({
      geometry: polygon,
      symbol: symbol,
      attributes: feature.properties,
    });

    layer.add(graphic);
  } catch (error) {
    console.error("Error adding boundary to layer:", error);
  }
};

const destroyMap = () => {
  if (roadsLayer) {
    roadsLayer.removeAll();
    roadsLayer = null;
  }
  if (view) {
    view.destroy();
    view = null;
  }
  if (map) {
    map = null;
  }
};

const openFancybox = (photo, index) => {
  if (typeof window !== "undefined" && window.Fancybox) {
    const photos = props.aduan.photos.map((p, idx) => ({
      src: `/aduan/${props.aduan.nomor_ruas}/${p}`,
      caption: `Foto ${idx + 1} - Aduan #${props.aduan.id}`,
    }));

    window.Fancybox.show(photos, {
      startIndex: index,
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: [
            "zoomIn",
            "zoomOut",
            "toggle1to1",
            "rotateCCW",
            "rotateCW",
            "flipX",
            "flipY",
          ],
          right: ["slideshow", "thumbs"],
        },
      },
      Thumbs: {
        autoStart: false,
      },
      closeButton: "top",
      click: "close",
      wheel: "slide",
      keyboard: {
        Escape: "close",
      },
      backdropClick: "close",
    });
  }
};

const closeModal = () => {
  emit("close");
};

// Zoom functions
const zoomIn = () => {
  if (view) {
    view.goTo(
      {
        zoom: view.zoom + 1,
      },
      {
        duration: 500,
        easing: "ease-in-out",
      }
    );
  }
};

const zoomOut = () => {
  if (view) {
    view.goTo(
      {
        zoom: view.zoom - 1,
      },
      {
        duration: 500,
        easing: "ease-in-out",
      }
    );
  }
};

const updateStatus = async () => {
  if (!props.aduan || !newStatus.value) return;

  updateLoading.value = true;
  try {
    const result = await updateAduanStatus(props.aduan.id, {
      status: newStatus.value,
    });

    if (result.success) {
      toast.success(
        `Status berhasil diupdate menjadi "${getStatusLabel(newStatus.value)}"!`
      );
      emit("updated");
    } else {
      toast.error("Gagal update status: " + result.error);
    }
  } catch (error) {
    toast.error("Gagal update status: " + error.message);
  } finally {
    updateLoading.value = false;
  }
};

const getStatusLabel = (status) => {
  const map = {
    diajukan: "Diajukan",
    ditinjau: "Ditinjau",
    selesai: "Selesai",
    ditolak: "Ditolak",
  };
  return map[status] || status;
};

const getStatusClass = (status) => {
  const map = {
    diajukan:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    ditinjau: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    selesai:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    ditolak: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };
  return (
    map[status] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
  );
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  try {
    // Handle PostgreSQL timestamp format: "2025-10-15 13:00:11.656273+07"
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "-";
  }
};

onUnmounted(() => {
  destroyMap();
});
</script>

<style scoped>
/* Zoom Controls Styling - matching homepage */
.zoom-controls {
  display: flex;
  flex-direction: column;
}

.zoom-controls button {
  display: block;
  width: 100%;
}

.zoom-controls button:hover {
  z-index: 10;
}

.zoom-controls button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
