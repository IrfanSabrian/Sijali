<template>
  <div class="app">
    <Navbar
      @toggle-sidebar="handleToggleSidebar"
      @go-back-to-rtr="handleGoBackToRTR"
    />

    <!-- Hero Section -->
    <section id="hero" class="hero-section">
      <!-- Background Elements -->
      <div class="hero-bg-elements">
        <div class="hero-bg-circle hero-bg-circle-1"></div>
        <div class="hero-bg-circle hero-bg-circle-2"></div>
        <div class="hero-bg-circle hero-bg-circle-3"></div>
        <div class="hero-grid"></div>
      </div>

      <div class="hero-content">
        <div class="hero-text hero-text-animated">
          <h1 class="hero-title">
            <span class="title-line-1 animate-slide-in-1"
              >Sistem Informasi</span
            >
            <span class="title-line-2 animate-slide-in-2"
              >Jalan Lingkungan</span
            >
            <span class="title-highlight animate-slide-in-3"
              >Kabupaten Kubu Raya</span
            >
          </h1>

          <p class="hero-description animate-fade-in">
            Platform GIS terintegrasi untuk pengelolaan dan analisis data jalan
            lingkungan di Kabupaten Kubu Raya dengan teknologi ArcGIS terdepan.
            Monitor, analisis, dan kelola infrastruktur jalan secara real-time.
          </p>

          <div class="hero-buttons animate-fade-in-up">
            <button @click="scrollToSection('map')" class="btn-primary">
              <div class="btn-icon">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  ></path>
                </svg>
              </div>
              <div class="btn-content">
                <span class="btn-title">Lihat Peta Interaktif</span>
                <span class="btn-subtitle">Eksplorasi data GIS</span>
              </div>
            </button>

            <button @click="scrollToSection('analisis')" class="btn-secondary">
              <div class="btn-icon">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <div class="btn-content">
                <span class="btn-title">Analisis Data</span>
                <span class="btn-subtitle">Dashboard komprehensif</span>
              </div>
            </button>
          </div>
        </div>

        <div class="hero-visual hero-visual-animated">
          <WeatherWidget />
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="hero-stats">
        <div class="stat-card">
          <div class="stat-icon">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              ></path>
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-number">5,575</h3>
            <p class="stat-label">Ruas Jalan</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-number">12</h3>
            <p class="stat-label">Kecamatan</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-number">127</h3>
            <p class="stat-label">Desa/Kelurahan</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-number" id="goodConditionCount">-</h3>
            <p class="stat-label">Jalan Kondisi Baik</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section id="map" class="map-section">
      <div class="section-header">
        <h2 class="section-title">Peta Interaktif</h2>
        <p class="section-description">
          Eksplorasi data jalan lingkungan dengan peta interaktif yang
          dilengkapi dengan berbagai layer dan alat analisis GIS.
        </p>
      </div>
      <div class="map-container">
        <!-- Map Title Frame -->
        <div class="map-title-frame">
          <div class="title-frame-content">
            <h3 class="map-title-text">
              Sistem Informasi Jalan Lingkungan Kab. Kubu Raya
            </h3>
          </div>
        </div>
        <!-- Map Canvas -->
        <div class="map-canvas-wrapper">
          <MapView ref="mapViewRef" />
        </div>
      </div>
    </section>

    <!-- Analisis Section -->
    <section id="analisis" class="analisis-section">
      <div class="section-header">
        <h2 class="section-title">Analisis Kerusakan & Kondisi Jalan</h2>
        <p class="section-description">
          Dashboard analisis komprehensif untuk memahami kerusakan jalan dan
          kondisi material infrastruktur jalan lingkungan di Kabupaten Kubu
          Raya.
        </p>
      </div>
      <div class="analisis-content">
        <div class="analisis-grid">
          <!-- Material Analysis -->
          <!-- Combined Donut Charts -->
          <div class="analisis-card">
            <div class="card-header">
              <h3 class="card-title">Analisis Kondisi & Material Jalan</h3>
              <div class="flex items-center gap-3">
                <select
                  id="kondisiMaterialFilter"
                  class="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Kecamatan</option>
                </select>
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="dual-donut-container">
              <!-- Condition Donut Chart -->
              <div class="donut-section">
                <h4 class="donut-title">Kondisi Jalan</h4>
                <div class="donut-chart">
                  <canvas id="conditionChart" width="200" height="200"></canvas>
                  <div class="chart-center">
                    <div class="center-number">5,575</div>
                    <div class="center-label">Jalan</div>
                  </div>
                </div>
              </div>

              <!-- Material Donut Chart -->
              <div class="donut-section">
                <h4 class="donut-title">Material Jalan</h4>
                <div class="donut-chart">
                  <canvas id="materialChart" width="200" height="200"></canvas>
                  <div class="chart-center">
                    <div class="center-number">5,575</div>
                    <div class="center-label">Jalan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- District Damage Analysis -->
          <div class="analisis-card">
            <div class="card-header">
              <h3 class="card-title">Tingkat Kerusakan per Kecamatan</h3>
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <div class="chart-container">
              <canvas id="districtChart" width="400" height="300"></canvas>
            </div>
          </div>

          <!-- Condition Assessment -->
          <div class="analisis-card">
            <div class="card-header">
              <h3 class="card-title">Tingkat Kerusakan per Material</h3>
              <div class="flex items-center gap-3">
                <select
                  id="materialDamageFilter"
                  class="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Kecamatan</option>
                </select>
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="chart-container">
              <canvas
                id="materialDamageChart"
                width="400"
                height="300"
              ></canvas>
            </div>
          </div>

          <!-- Road Length by District -->
          <div class="analisis-card">
            <div class="card-header">
              <h3 class="card-title">Panjang Jalan per Kecamatan</h3>
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <div class="chart-container">
              <canvas
                id="districtLengthChart"
                width="400"
                height="300"
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Laporan Section -->
    <section id="laporan" class="laporan-section">
      <div class="section-header">
        <h2 class="section-title">Laporan Dinamis</h2>
        <p class="section-description">
          Generate laporan komprehensif berdasarkan filter dan parameter yang
          Anda tentukan.
        </p>
      </div>
      <div class="laporan-content">
        <div class="laporan-controls">
          <div class="control-group">
            <label class="control-label">Jenis Laporan</label>
            <select class="control-select">
              <option value="summary">Ringkasan Eksekutif</option>
              <option value="detail">Laporan Detail</option>
              <option value="comparison">Perbandingan Kecamatan</option>
              <option value="trend">Analisis Tren</option>
            </select>
          </div>

          <div class="control-group">
            <label class="control-label">Periode</label>
            <select class="control-select">
              <option value="2024">Tahun 2024</option>
              <option value="2023">Tahun 2023</option>
              <option value="2022">Tahun 2022</option>
              <option value="all">Semua Periode</option>
            </select>
          </div>

          <div class="control-group">
            <label class="control-label">Format</label>
            <select class="control-select">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="word">Word</option>
            </select>
          </div>

          <button class="generate-btn">
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Generate Laporan
          </button>
        </div>

        <div class="laporan-preview">
          <div class="preview-header">
            <h3 class="preview-title">Preview Laporan</h3>
            <div class="preview-actions">
              <button class="action-btn">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
                Download
              </button>
              <button class="action-btn">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
                Print
              </button>
            </div>
          </div>

          <div class="preview-content">
            <div class="report-template">
              <div class="report-header">
                <h1 class="report-title">
                  Laporan Sistem Informasi Jalan Lingkungan
                </h1>
                <h2 class="report-subtitle">Kabupaten Kubu Raya</h2>
                <p class="report-date">Periode: Januari - Desember 2024</p>
              </div>

              <div class="report-body">
                <div class="report-section">
                  <h3 class="section-title">Ringkasan Eksekutif</h3>
                  <p class="section-content">
                    Sistem Informasi Jalan Lingkungan Kabupaten Kubu Raya telah
                    berhasil mengintegrasikan data dari 5,575 ruas jalan yang
                    tersebar di 12 kecamatan dan 127 desa/kelurahan. Platform
                    GIS ini memungkinkan monitoring real-time dan analisis
                    komprehensif kondisi infrastruktur jalan lingkungan.
                  </p>
                </div>

                <div class="report-section">
                  <h3 class="section-title">Statistik Utama</h3>
                  <div class="stats-grid">
                    <div class="stat-item">
                      <span class="stat-label">Total Ruas Jalan</span>
                      <span class="stat-value">5,575</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">Kondisi Baik</span>
                      <span class="stat-value">4,890 (87.7%)</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">Kondisi Sedang</span>
                      <span class="stat-value">485 (8.7%)</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">Kondisi Rusak</span>
                      <span class="stat-value">200 (3.6%)</span>
                    </div>
                  </div>
                </div>

                <div class="report-section">
                  <h3 class="section-title">Rekomendasi</h3>
                  <ul class="recommendations">
                    <li>
                      Prioritaskan perbaikan 200 ruas jalan dengan kondisi rusak
                    </li>
                    <li>
                      Implementasi program pemeliharaan rutin untuk 485 ruas
                      jalan kondisi sedang
                    </li>
                    <li>
                      Pengembangan sistem monitoring real-time untuk semua ruas
                      jalan
                    </li>
                    <li>Peningkatan kapasitas SDM dalam pengelolaan GIS</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
// Import components
import Navbar from "~/components/Navbar.vue";
import MapView from "~/components/MapView.vue";
import WeatherWidget from "~/components/WeatherWidget.vue";

// Refs
const mapViewRef = ref(null);

// Handle toggle sidebar from navbar
const handleToggleSidebar = () => {
  if (mapViewRef.value && mapViewRef.value.toggleMainSidebar) {
    mapViewRef.value.toggleMainSidebar();
  }
};

// Handle go back to RTR
const handleGoBackToRTR = () => {
  // Navigate to RTR page or show alert for now
  alert("Navigasi ke halaman RTR");
  // You can implement actual navigation here
  // navigateTo('/rtr');
};

// Scroll to section function
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Scroll detection for navbar
const handleScroll = () => {
  const sections = ["hero", "map", "analisis", "laporan"];
  const scrollPosition = window.scrollY + 100; // Offset for navbar height

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        // Emit event to navbar to update active section
        const event = new CustomEvent("section-change", {
          detail: { activeSection: sectionId },
        });
        window.dispatchEvent(event);
        break;
      }
    }
  }
};

// Add scroll listener on mount
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// Remove scroll listener on unmount
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Set page meta
useHead({
  title: "SIJALI Web GIS - Sistem Informasi Jalan Lingkungan",
  meta: [
    {
      name: "description",
      content:
        "Web GIS untuk Sistem Informasi Jalan Lingkungan menggunakan ArcGIS JS API",
    },
  ],
});
</script>

<style scoped>
.app {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300;
}

/* Hero Section */
.hero-section {
  @apply min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 text-white flex flex-col justify-center relative overflow-hidden pt-10;
}

.hero-bg-elements {
  @apply absolute inset-0 pointer-events-none;
}

.hero-bg-circle {
  @apply absolute rounded-full opacity-10;
}

.hero-bg-circle-1 {
  @apply w-96 h-96 bg-blue-400/20 -top-48 -right-48 animate-pulse;
}

.hero-bg-circle-2 {
  @apply w-64 h-64 bg-indigo-400/20 top-1/4 -left-32 animate-pulse;
  animation-delay: 1s;
}

.hero-bg-circle-3 {
  @apply w-80 h-80 bg-slate-400/20 bottom-0 right-1/4 animate-pulse;
  animation-delay: 2s;
}

.hero-grid {
  @apply absolute inset-0 opacity-5;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

.hero-content {
  @apply container mx-auto px-24 py-20 relative z-10 flex items-center justify-between;
}

.hero-text {
  @apply flex-1 max-w-2xl;
}

.hero-text-animated {
  animation: fadeIn 0.8s ease-out;
}

.hero-badge {
  @apply inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20;
}

.badge-icon {
  @apply text-lg;
}

.badge-text {
  @apply text-sm font-medium text-blue-100;
}

.hero-title {
  @apply mb-8;
}

.title-line-1 {
  @apply block text-4xl font-light text-white/90;
  transition: transform 0.3s ease, color 0.3s ease;
}

.title-line-1:hover {
  transform: translateX(10px);
  color: rgba(255, 255, 255, 1);
}

.title-line-2 {
  @apply block text-5xl font-bold text-white mt-2;
  transition: transform 0.3s ease, letter-spacing 0.3s ease;
}

.title-line-2:hover {
  transform: scale(1.05);
  letter-spacing: 0.05em;
}

.title-highlight {
  @apply block text-3xl font-semibold text-blue-300 mt-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent;
  transition: transform 0.3s ease;
  background-size: 200% auto;
  animation: gradientShift 3s ease infinite;
}

.title-highlight:hover {
  transform: translateX(10px);
}

.hero-description {
  @apply text-lg text-blue-100 mb-10 leading-relaxed max-w-xl;
  transition: transform 0.3s ease, color 0.3s ease;
}

.hero-description:hover {
  transform: translateY(-2px);
  color: rgba(255, 255, 255, 0.95);
}

.hero-buttons {
  @apply flex flex-wrap gap-6;
}

.btn-primary {
  @apply bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-secondary {
  @apply bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1;
  position: relative;
  overflow: hidden;
}

.btn-secondary::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.btn-secondary:hover::before {
  left: 100%;
}

.btn-icon {
  @apply mr-4 p-2 bg-white/20 rounded-lg;
}

.btn-content {
  @apply flex flex-col items-start;
}

.btn-title {
  @apply text-base font-semibold;
}

.btn-subtitle {
  @apply text-sm opacity-80;
}

.hero-visual {
  @apply flex-1 max-w-lg ml-12;
}

.hero-visual-animated {
  animation: fadeInRight 1s ease-out, float 3s ease-in-out infinite;
  animation-delay: 0s, 1s;
}

.hero-card {
  @apply bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden;
}

.card-header {
  @apply flex items-center justify-between p-4 bg-white/5 border-b border-white/10;
}

.card-dots {
  @apply flex space-x-2;
}

.dot {
  @apply w-3 h-3 rounded-full;
}

.dot-red {
  @apply bg-red-400;
}

.dot-yellow {
  @apply bg-yellow-400;
}

.dot-green {
  @apply bg-green-400;
}

.card-title {
  @apply text-sm font-medium text-white/80;
}

.card-content {
  @apply p-6;
}

.hero-stats {
  @apply container mx-auto px-8 py-12 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.stat-card {
  @apply bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/30 flex items-center space-x-4 shadow-lg;
}

.stat-icon {
  @apply bg-blue-600/20 p-3 rounded-lg;
}

.stat-content {
  @apply flex-1;
}

.stat-number {
  @apply text-2xl font-bold text-white drop-shadow-lg;
}

.stat-label {
  @apply text-white/90 text-sm font-medium drop-shadow-md;
}

/* Section Headers */
.section-header {
  @apply text-center mb-12;
}

.section-title {
  @apply text-4xl font-bold text-gray-900 mb-4;
}

.section-description {
  @apply text-xl text-gray-600 max-w-3xl mx-auto;
}

/* Map Section */
.map-section {
  @apply py-20 bg-white;
}

.map-container {
  @apply container mx-auto px-8;
}

/* Map Title Frame */
.map-title-frame {
  @apply bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg;
  @apply rounded-t-xl;
}

.title-frame-content {
  @apply px-6 py-2 text-left;
}

.map-title-text {
  @apply text-xl font-bold text-white drop-shadow-md;
  @apply tracking-wide;
}

/* Map Canvas Wrapper */
.map-canvas-wrapper {
  @apply rounded-b-xl overflow-hidden shadow-lg;
  border-top: none;
}

/* Analisis Section */
.analisis-section {
  @apply py-20 bg-gray-50;
}

.analisis-content {
  @apply container mx-auto px-8;
}

.analisis-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-8;
}

.analisis-card {
  @apply bg-white rounded-xl shadow-lg p-6 border border-gray-200;
}

.card-header {
  @apply flex items-center justify-between mb-6;
}

.card-title {
  @apply text-xl font-semibold text-gray-900;
}

.chart-placeholder {
  @apply space-y-4;
}

.chart-bars {
  @apply flex items-end space-x-4 h-32;
}

.bar {
  @apply flex-1 rounded-t transition-all duration-500;
}

.chart-labels {
  @apply flex justify-between text-sm text-gray-600 mt-4;
}

.label-item {
  @apply flex flex-col items-center space-y-1;
}

.label-text {
  @apply text-sm text-gray-600;
}

.label-percentage {
  @apply text-xs font-semibold text-gray-800;
}

.horizontal-bars {
  @apply space-y-4;
}

.h-bar {
  @apply flex items-center space-x-4;
}

.h-bar .label {
  @apply w-24 text-sm text-gray-600;
}

.bar-container {
  @apply flex-1 bg-gray-200 rounded-full h-4;
}

.bar-fill {
  @apply bg-blue-500 h-4 rounded-full transition-all duration-500;
}

.h-bar .value {
  @apply text-sm font-semibold text-gray-900 w-12 text-right;
}

.trend-chart {
  @apply text-center;
}

.priority-list {
  @apply space-y-4;
}

.priority-item {
  @apply flex items-center space-x-4 p-3 rounded-lg bg-gray-50;
}

.priority-icon {
  @apply w-3 h-3 rounded-full;
}

.priority-icon.high {
  @apply bg-red-500;
}

.priority-icon.medium {
  @apply bg-yellow-500;
}

.priority-icon.low {
  @apply bg-green-500;
}

.priority-content {
  @apply flex-1;
}

.priority-stats {
  @apply flex flex-col items-end space-y-1;
}

.priority-count {
  @apply text-lg font-bold text-gray-900;
}

.priority-percentage {
  @apply text-sm text-gray-600;
}

.stats-grid {
  @apply grid grid-cols-2 gap-4;
}

.stat-item {
  @apply text-center p-4 bg-gray-50 rounded-lg;
}

.stat-value {
  @apply text-2xl font-bold text-blue-600 mb-1;
}

.stat-label {
  @apply text-sm text-gray-600;
}

/* Material Analysis Styles */
.material-diagram {
  @apply p-4;
}

.material-chart {
  @apply flex items-end space-x-3 h-40;
}

.material-bar {
  @apply flex flex-col justify-end items-center rounded-t-lg transition-all duration-500 relative;
  min-height: 20px;
}

.material-bar.asphalt {
  @apply bg-gradient-to-t from-gray-800 to-gray-600;
}

.material-bar.concrete {
  @apply bg-gradient-to-t from-gray-400 to-gray-200;
}

.material-bar.gravel {
  @apply bg-gradient-to-t from-yellow-600 to-yellow-400;
}

.material-bar.dirt {
  @apply bg-gradient-to-t from-amber-800 to-amber-600;
}

.material-label {
  @apply text-xs font-semibold text-white mb-1;
}

.material-percentage {
  @apply text-xs font-bold text-gray-800 mt-1;
}

/* Damage Analysis Styles */
.damage-diagram {
  @apply p-4;
}

.damage-pie-chart {
  @apply grid grid-cols-2 gap-4;
}

.pie-slice {
  @apply flex flex-col items-center p-4 rounded-lg text-center;
}

.pie-slice.crack {
  @apply bg-red-100 border-2 border-red-300;
}

.pie-slice.pothole {
  @apply bg-orange-100 border-2 border-orange-300;
}

.pie-slice.erosion {
  @apply bg-yellow-100 border-2 border-yellow-300;
}

.pie-slice.surface {
  @apply bg-blue-100 border-2 border-blue-300;
}

.damage-type {
  @apply text-sm font-semibold text-gray-800 mb-1;
}

.damage-percentage {
  @apply text-lg font-bold text-gray-900;
}

/* Condition Matrix Styles */
.condition-matrix {
  @apply space-y-4;
}

.condition-row {
  @apply flex items-center space-x-4;
}

.material-name {
  @apply w-16 text-sm font-semibold text-gray-700;
}

.condition-bars {
  @apply flex-1 flex space-x-1 h-6 rounded overflow-hidden;
}

.condition-bar {
  @apply h-full transition-all duration-500;
}

.condition-bar.good {
  @apply bg-green-500;
}

.condition-bar.fair {
  @apply bg-yellow-500;
}

.condition-bar.poor {
  @apply bg-red-500;
}

.condition-total {
  @apply w-16 text-sm font-semibold text-gray-800 text-right;
}

/* Severity Diagram Styles */
.severity-diagram {
  @apply p-4;
}

.severity-chart {
  @apply space-y-3;
}

.severity-level {
  @apply flex items-center space-x-4 p-3 rounded-lg;
}

.severity-level.critical {
  @apply bg-red-50 border-l-4 border-red-500;
}

.severity-level.high {
  @apply bg-orange-50 border-l-4 border-orange-500;
}

.severity-level.medium {
  @apply bg-yellow-50 border-l-4 border-yellow-500;
}

.severity-level.low {
  @apply bg-green-50 border-l-4 border-green-500;
}

.severity-icon {
  @apply w-4 h-4 rounded-full;
}

.severity-level.critical .severity-icon {
  @apply bg-red-500;
}

.severity-level.high .severity-icon {
  @apply bg-orange-500;
}

.severity-level.medium .severity-icon {
  @apply bg-yellow-500;
}

.severity-level.low .severity-icon {
  @apply bg-green-500;
}

.severity-info {
  @apply flex-1;
}

.severity-label {
  @apply text-sm font-semibold text-gray-800;
}

.severity-desc {
  @apply text-xs text-gray-600;
}

.severity-stats {
  @apply flex flex-col items-end;
}

.severity-count {
  @apply text-lg font-bold text-gray-900;
}

.severity-percentage {
  @apply text-sm text-gray-600;
}

/* Repair Priority Styles */
.repair-priority {
  @apply p-4;
}

.priority-matrix {
  @apply space-y-4;
}

.priority-item {
  @apply flex items-center space-x-4 p-3 rounded-lg;
}

.priority-item.high-priority {
  @apply bg-red-50 border-l-4 border-red-500;
}

.priority-item.medium-priority {
  @apply bg-yellow-50 border-l-4 border-yellow-500;
}

.priority-item.low-priority {
  @apply bg-green-50 border-l-4 border-green-500;
}

.priority-material {
  @apply w-32 text-sm font-semibold text-gray-800;
}

.priority-chart {
  @apply flex-1 bg-gray-200 rounded-full h-4;
}

.priority-bar {
  @apply h-4 rounded-full transition-all duration-500;
}

.priority-item.high-priority .priority-bar {
  @apply bg-red-500;
}

.priority-item.medium-priority .priority-bar {
  @apply bg-yellow-500;
}

.priority-item.low-priority .priority-bar {
  @apply bg-green-500;
}

/* Performance Diagram Styles */
.performance-diagram {
  @apply p-4;
}

.performance-chart {
  @apply space-y-4;
}

.performance-item {
  @apply flex items-center space-x-4;
}

.performance-material {
  @apply w-16 text-sm font-semibold text-gray-700;
}

.performance-bar {
  @apply flex-1 bg-gray-200 rounded-full h-4;
}

.performance-fill {
  @apply h-4 rounded-full transition-all duration-500;
}

.concrete-performance {
  @apply bg-green-500;
}

.asphalt-performance {
  @apply bg-blue-500;
}

.gravel-performance {
  @apply bg-yellow-500;
}

.dirt-performance {
  @apply bg-red-500;
}

.performance-score {
  @apply w-16 text-sm font-bold text-gray-800 text-right;
}

/* Donut Chart Styles */
.donut-chart-container {
  @apply flex items-center space-x-6 p-4;
}

.donut-chart {
  @apply relative flex-shrink-0;
  height: 200px;
  width: 200px;
}

.donut-chart canvas {
  @apply w-full h-full;
}

.chart-center {
  @apply absolute inset-0 flex flex-col items-center justify-center pointer-events-none;
}

.center-number {
  @apply text-3xl font-bold text-gray-900;
}

.center-label {
  @apply text-sm text-gray-600;
}

.chart-container {
  @apply p-4;
  height: 300px;
  width: 100%;
}

/* Dual Donut Container Styles */
.dual-donut-container {
  @apply flex flex-col lg:flex-row gap-8 p-4;
}

.donut-section {
  @apply flex-1;
}

.donut-title {
  @apply text-lg font-semibold text-gray-800 mb-4 text-center;
}

.donut-chart {
  @apply relative flex justify-center mb-4;
}

.donut-svg {
  @apply w-40 h-40;
}

.donut-legend {
  @apply space-y-2;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .dual-donut-container {
    @apply flex-col;
  }

  .donut-svg {
    @apply w-32 h-32;
  }
}

/* District Damage Analysis now uses condition-matrix styles */

/* Responsive adjustments for district charts */
@media (max-width: 768px) {
  .district-damage-container {
    @apply grid-cols-1 gap-4;
  }

  .district-svg {
    @apply w-20 h-20;
  }
}

.priority-title {
  @apply font-semibold text-gray-900;
}

.priority-desc {
  @apply text-sm text-gray-600;
}

.priority-count {
  @apply font-bold text-gray-900;
}

/* Laporan Section */
.laporan-section {
  @apply py-20 bg-white;
}

.laporan-content {
  @apply container mx-auto px-8;
}

.laporan-controls {
  @apply bg-gray-50 rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4;
}

.control-group {
  @apply space-y-2;
}

.control-label {
  @apply block text-sm font-medium text-gray-700;
}

.control-select {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.generate-btn {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition-colors flex items-center justify-center;
}

.laporan-preview {
  @apply bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden;
}

.preview-header {
  @apply bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between;
}

.preview-title {
  @apply text-lg font-semibold text-gray-900;
}

.preview-actions {
  @apply flex space-x-2;
}

.action-btn {
  @apply bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1;
}

.preview-content {
  @apply p-6;
}

.report-template {
  @apply max-w-4xl mx-auto;
}

.report-header {
  @apply text-center mb-8 pb-6 border-b border-gray-200;
}

.report-title {
  @apply text-3xl font-bold text-gray-900 mb-2;
}

.report-subtitle {
  @apply text-xl text-blue-600 mb-2;
}

.report-date {
  @apply text-gray-600;
}

.report-body {
  @apply space-y-8;
}

.report-section {
  @apply space-y-4;
}

.report-section .section-title {
  @apply text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2;
}

.section-content {
  @apply text-gray-700 leading-relaxed;
}

.stats-grid {
  @apply grid grid-cols-2 gap-4;
}

.stat-item {
  @apply flex justify-between items-center p-4 bg-gray-50 rounded-lg;
}

.stat-label {
  @apply text-gray-600;
}

.stat-value {
  @apply font-bold text-gray-900;
}

.recommendations {
  @apply space-y-2;
}

.recommendations li {
  @apply text-gray-700 flex items-start space-x-2;
}

.recommendations li::before {
  content: "•";
  @apply text-blue-600 font-bold;
}

/* Animations & Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-slide-in-1 {
  animation: fadeIn 0.6s ease-out 0.2s both;
}

.animate-slide-in-2 {
  animation: fadeIn 0.6s ease-out 0.4s both;
}

.animate-slide-in-3 {
  animation: fadeIn 0.6s ease-out 0.6s both;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out 0.8s both;
}

.animate-fade-in-up {
  animation: fadeIn 1s ease-out 1s both;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    @apply flex-col text-center px-4;
  }

  .hero-visual {
    @apply ml-0 mt-8 max-w-full;
  }

  .title-line-1 {
    @apply text-2xl;
  }

  .title-line-2 {
    @apply text-3xl;
  }

  .title-highlight {
    @apply text-xl;
  }

  .hero-description {
    @apply text-base;
  }

  .hero-buttons {
    @apply flex-col items-center;
  }

  .btn-primary,
  .btn-secondary {
    @apply w-full max-w-sm;
  }

  .analisis-grid {
    @apply grid-cols-1;
  }

  .laporan-controls {
    @apply grid-cols-1;
  }

  .stats-grid {
    @apply grid-cols-1;
  }

  .hero-stats {
    @apply px-4;
  }

  .map-container,
  .analisis-content,
  .laporan-content {
    @apply px-4;
  }
}
</style>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  async mounted() {
    await this.initCharts();
  },
  methods: {
    createDistrictChartWithDummyData(ctx) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Sungai Raya", "Rasau Jaya", "Kubu", "Teluk Pakedai"],
          datasets: [
            {
              label: "Baik",
              data: [1293, 777, 119, 89],
              backgroundColor: "#10b981",
            },
            {
              label: "Sedang",
              data: [452, 158, 125, 24],
              backgroundColor: "#fbbf24",
            },
            {
              label: "Rusak Ringan",
              data: [176, 102, 42, 24],
              backgroundColor: "#f59e0b",
            },
            {
              label: "Rusak Berat",
              data: [260, 210, 80, 37],
              backgroundColor: "#ef4444",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
              cornerRadius: 8,
            },
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
        },
      });
    },
    createMaterialChartWithDummyData(ctx) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Beton", "Aspal", "Tanah", "Paving"],
          datasets: [
            {
              label: "Baik",
              data: [1808, 1173, 23, 81],
              backgroundColor: "#10b981",
            },
            {
              label: "Sedang",
              data: [806, 242, 3, 4],
              backgroundColor: "#fbbf24",
            },
            {
              label: "Rusak Ringan",
              data: [380, 102, 41, 0],
              backgroundColor: "#f59e0b",
            },
            {
              label: "Rusak Berat",
              data: [219, 43, 613, 1],
              backgroundColor: "#ef4444",
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
              cornerRadius: 8,
              callbacks: {
                label: function (context) {
                  return (
                    context.dataset.label + ": " + context.parsed.x + " jalan"
                  );
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + " jalan";
                },
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    createDistrictLengthChartWithDummyData(ctx) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Sungai Raya",
            "Sungai Kakap",
            "Sungai Ambawang",
            "Kubu",
            "Kuala Mandor B",
            "Rasau Jaya",
            "Teluk Pakedai",
            "Terentang",
            "Batu Ampar",
          ],
          datasets: [
            {
              label: "Panjang Jalan (km)",
              data: [
                628.7, 435.3, 280.7, 184.1, 163.6, 130.1, 99.3, 74.3, 111.5,
                7.4,
              ],
              backgroundColor: [
                "#3b82f6", // Blue
                "#10b981", // Green
                "#f59e0b", // Orange
                "#ef4444", // Red
                "#8b5cf6", // Purple
                "#06b6d4", // Cyan
                "#84cc16", // Lime
                "#f97316", // Orange
                "#ec4899", // Pink
                "#6b7280", // Gray
              ],
              borderWidth: 1,
              borderColor: "#ffffff",
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
              cornerRadius: 8,
              callbacks: {
                label: function (context) {
                  return "Panjang: " + context.parsed.x.toFixed(1) + " km";
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                callback: function (value) {
                  return value + " km";
                },
                color: "#6b7280",
              },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                color: "#6b7280",
              },
            },
          },
        },
      });
    },
    async loadKecamatanOptions() {
      try {
        const response = await fetch("/api/jalan/filters/kecamatan");
        const result = await response.json();

        if (result.success && result.data) {
          const kondisiFilter = document.getElementById(
            "kondisiMaterialFilter"
          );
          const materialFilter = document.getElementById(
            "materialDamageFilter"
          );

          // Clear existing options except first
          [kondisiFilter, materialFilter].forEach((select) => {
            if (select) {
              // Keep first option (Semua Kecamatan)
              const firstOption = select.querySelector('option[value=""]');
              select.innerHTML = "";
              if (firstOption) {
                select.appendChild(firstOption);
              }

              // Add kecamatan options
              result.data.forEach((kecamatan) => {
                const option = document.createElement("option");
                option.value = kecamatan;
                option.textContent = kecamatan;
                select.appendChild(option);
              });
            }
          });
        }
      } catch (error) {
        console.error("Error loading kecamatan options:", error);
      }
    },
    async initCharts() {
      // Load kecamatan options first
      await this.loadKecamatanOptions();

      // Load initial data for both charts (all kecamatan)
      console.log("Loading initial chart data...");
      await this.updateKondisiMaterialCharts("");
      await this.updateMaterialDamageChart("");
      console.log("Initial chart data loaded");

      // Load good condition road count for hero stats
      await this.loadGoodConditionCount();

      // District Chart - Real Data
      const districtCtx = document.getElementById("districtChart");
      if (districtCtx) {
        // Fetch real data from API
        try {
          console.log("Fetching data from API...");
          const response = await fetch("/api/jalan/stats/kecamatan-kondisi", {
            method: "GET",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          console.log("Response status:", response.status);
          console.log("Response ok:", response.ok);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          console.log("API result:", result);

          if (result.success && result.data) {
            // Process data for top 8 kecamatan
            const topKecamatans = result.data.slice(0, 8);
            const labels = topKecamatans.map((k) => k.kecamatan);

            // Prepare datasets for each condition
            const baikData = topKecamatans.map(
              (k) => k.conditions.Baik?.count || 0
            );
            const sedangData = topKecamatans.map(
              (k) => k.conditions.Sedang?.count || 0
            );
            const rusakRinganData = topKecamatans.map(
              (k) => k.conditions["Rusak Ringan"]?.count || 0
            );
            const rusakBeratData = topKecamatans.map(
              (k) => k.conditions["Rusak Berat"]?.count || 0
            );

            new Chart(districtCtx, {
              type: "bar",
              data: {
                labels: labels,
                datasets: [
                  {
                    label: "Baik",
                    data: baikData,
                    backgroundColor: "#10b981",
                  },
                  {
                    label: "Sedang",
                    data: sedangData,
                    backgroundColor: "#fbbf24",
                  },
                  {
                    label: "Rusak Ringan",
                    data: rusakRinganData,
                    backgroundColor: "#f59e0b",
                  },
                  {
                    label: "Rusak Berat",
                    data: rusakBeratData,
                    backgroundColor: "#ef4444",
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    enabled: true,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleColor: "white",
                    bodyColor: "white",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    borderWidth: 1,
                    cornerRadius: 8,
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                  },
                },
              },
            });
          } else {
            console.error("Failed to fetch kecamatan-kondisi data");
            // Fallback to dummy data
            this.createDistrictChartWithDummyData(districtCtx);
          }
        } catch (error) {
          console.error("Error fetching kecamatan-kondisi data:", error);
          // Fallback to dummy data
          this.createDistrictChartWithDummyData(districtCtx);
        }
      }

      // District Length Chart - Real Data
      const districtLengthCtx = document.getElementById("districtLengthChart");
      if (districtLengthCtx) {
        // Fetch real data from API
        try {
          console.log("Fetching kecamatan length data from API...");
          const response = await fetch("/api/jalan/stats/summary", {
            method: "GET",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          console.log("Length response status:", response.status);
          console.log("Length response ok:", response.ok);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          console.log("Length API result:", result);

          if (result.success && result.data && result.data.kecamatanStats) {
            // Process data for all kecamatan
            const kecamatanData = result.data.kecamatanStats;
            const labels = kecamatanData.map((k) => k.kecamatan);
            const lengths = kecamatanData.map((k) =>
              (k._sum.panjangM / 1000).toFixed(1)
            ); // Convert to km

            // Color palette for different kecamatan
            const colors = [
              "#3b82f6", // Blue
              "#10b981", // Green
              "#f59e0b", // Orange
              "#ef4444", // Red
              "#8b5cf6", // Purple
              "#06b6d4", // Cyan
              "#84cc16", // Lime
              "#f97316", // Orange
              "#ec4899", // Pink
              "#6b7280", // Gray
            ];

            new Chart(districtLengthCtx, {
              type: "bar",
              data: {
                labels: labels,
                datasets: [
                  {
                    label: "Panjang Jalan (km)",
                    data: lengths,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 1,
                    borderColor: "#ffffff",
                  },
                ],
              },
              options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: true,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleColor: "white",
                    bodyColor: "white",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                      label: function (context) {
                        return "Panjang: " + context.parsed.x + " km";
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    grid: {
                      color: "rgba(0, 0, 0, 0.1)",
                    },
                    ticks: {
                      callback: function (value) {
                        return value + " km";
                      },
                      color: "#6b7280",
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "#6b7280",
                    },
                  },
                },
              },
            });
          } else {
            console.error("Failed to fetch kecamatan length data");
            // Fallback to dummy data
            this.createDistrictLengthChartWithDummyData(districtLengthCtx);
          }
        } catch (error) {
          console.error("Error fetching kecamatan length data:", error);
          // Fallback to dummy data
          this.createDistrictLengthChartWithDummyData(districtLengthCtx);
        }
      }

      // Add event listeners for filters
      this.setupFilterListeners();
    },
    async loadGoodConditionCount() {
      try {
        console.log("Loading good condition road count...");
        const response = await fetch(
          "/api/jalan/stats/kondisi-material-filtered",
          {
            method: "GET",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Good condition API result:", result);

        if (result.success && result.data && result.data.kondisiStats) {
          // Find the count for "Baik" condition
          const baikCondition = result.data.kondisiStats.find(
            (stat) => stat.keterangan === "Baik"
          );

          if (baikCondition) {
            const goodCount = baikCondition._count.keterangan;
            const goodCountElement =
              document.getElementById("goodConditionCount");
            if (goodCountElement) {
              goodCountElement.textContent = goodCount.toLocaleString();
            }
            console.log("Good condition count loaded:", goodCount);
          } else {
            console.log("No 'Baik' condition found in data");
            const goodCountElement =
              document.getElementById("goodConditionCount");
            if (goodCountElement) {
              goodCountElement.textContent = "0";
            }
          }
        } else {
          console.error("Failed to fetch good condition data");
          const goodCountElement =
            document.getElementById("goodConditionCount");
          if (goodCountElement) {
            goodCountElement.textContent = "0";
          }
        }
      } catch (error) {
        console.error("Error fetching good condition count:", error);
        const goodCountElement = document.getElementById("goodConditionCount");
        if (goodCountElement) {
          goodCountElement.textContent = "0";
        }
      }
    },
    setupFilterListeners() {
      // Filter for Analisis Kondisi & Material Jalan
      const kondisiFilter = document.getElementById("kondisiMaterialFilter");
      if (kondisiFilter) {
        kondisiFilter.addEventListener("change", (e) => {
          this.updateKondisiMaterialCharts(e.target.value);
        });
      }

      // Filter for Tingkat Kerusakan per Material
      const materialFilter = document.getElementById("materialDamageFilter");
      if (materialFilter) {
        materialFilter.addEventListener("change", (e) => {
          this.updateMaterialDamageChart(e.target.value);
        });
      }
    },
    async updateKondisiMaterialCharts(kecamatan) {
      try {
        const url = kecamatan
          ? `/api/jalan/stats/kondisi-material-filtered?kecamatan=${encodeURIComponent(
              kecamatan
            )}`
          : "/api/jalan/stats/kondisi-material-filtered";

        const response = await fetch(url);
        const result = await response.json();

        if (result.success && result.data) {
          // Update condition chart
          this.updateConditionChart(result.data.kondisiStats);

          // Update material chart
          this.updateMaterialChart(result.data.materialStats);
        }
      } catch (error) {
        console.error("Error updating kondisi material charts:", error);
      }
    },
    async updateMaterialDamageChart(kecamatan) {
      try {
        const url = kecamatan
          ? `/api/jalan/stats/material-kondisi?kecamatan=${encodeURIComponent(
              kecamatan
            )}`
          : "/api/jalan/stats/material-kondisi";

        const response = await fetch(url);
        const result = await response.json();

        if (result.success && result.data) {
          // Update material damage chart
          this.updateMaterialDamageChartData(result.data);
        }
      } catch (error) {
        console.error("Error updating material damage chart:", error);
      }
    },
    updateConditionChart(kondisiStats) {
      const conditionCtx = document.getElementById("conditionChart");
      if (!conditionCtx) return;

      // Destroy existing chart if it exists
      if (
        window.conditionChart &&
        typeof window.conditionChart.destroy === "function"
      ) {
        window.conditionChart.destroy();
      }

      // Prepare data
      const labels = kondisiStats.map((s) => s.keterangan);
      const data = kondisiStats.map((s) => s._count.keterangan);
      const total = data.reduce((a, b) => a + b, 0);

      // Update center text
      const centerNumber = document.querySelector(
        "#conditionChart + .chart-center .center-number"
      );
      if (centerNumber) {
        centerNumber.textContent = total.toLocaleString();
      }

      // Create new chart
      window.conditionChart = new Chart(conditionCtx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "#10b981", // Baik - Green
                "#fbbf24", // Sedang - Yellow
                "#ef4444", // Rusak Berat - Red
                "#f59e0b", // Rusak Ringan - Orange
              ],
              borderWidth: 0,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                label: function (context) {
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((context.parsed / total) * 100).toFixed(
                    1
                  );
                  return (
                    context.label +
                    ": " +
                    context.parsed +
                    " (" +
                    percentage +
                    "%)"
                  );
                },
              },
            },
          },
          cutout: "60%",
          animation: {
            animateRotate: true,
            animateScale: true,
          },
        },
      });
    },
    updateMaterialChart(materialStats) {
      const materialCtx = document.getElementById("materialChart");
      if (!materialCtx) return;

      // Destroy existing chart if it exists
      if (
        window.materialChart &&
        typeof window.materialChart.destroy === "function"
      ) {
        window.materialChart.destroy();
      }

      // Prepare data
      const labels = materialStats.map((s) => s.kondisi);
      const data = materialStats.map((s) => s._count.kondisi);
      const total = data.reduce((a, b) => a + b, 0);

      // Update center text
      const centerNumber = document.querySelector(
        "#materialChart + .chart-center .center-number"
      );
      if (centerNumber) {
        centerNumber.textContent = total.toLocaleString();
      }

      // Create new chart
      window.materialChart = new Chart(materialCtx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "#6b7280", // Gray
                "#3b82f6", // Blue
                "#10b981", // Green
                "#f59e0b", // Orange
                "#ef4444", // Red
                "#8b5cf6", // Purple
                "#06b6d4", // Cyan
                "#84cc16", // Lime
              ],
              borderWidth: 0,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                label: function (context) {
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((context.parsed / total) * 100).toFixed(
                    1
                  );
                  return (
                    context.label +
                    ": " +
                    context.parsed +
                    " (" +
                    percentage +
                    "%)"
                  );
                },
              },
            },
          },
          cutout: "60%",
          animation: {
            animateRotate: true,
            animateScale: true,
          },
        },
      });
    },
    updateMaterialDamageChartData(materialData) {
      const materialDamageCtx = document.getElementById("materialDamageChart");
      if (!materialDamageCtx) return;

      // Destroy existing chart if it exists
      if (
        window.materialDamageChart &&
        typeof window.materialDamageChart.destroy === "function"
      ) {
        window.materialDamageChart.destroy();
      }

      // Process data for top 6 materials
      const topMaterials = materialData.slice(0, 6);
      const labels = topMaterials.map((m) => m.material);

      // Prepare datasets for each condition
      const baikData = topMaterials.map((m) => m.conditions.Baik?.count || 0);
      const sedangData = topMaterials.map(
        (m) => m.conditions.Sedang?.count || 0
      );
      const rusakRinganData = topMaterials.map(
        (m) => m.conditions["Rusak Ringan"]?.count || 0
      );
      const rusakBeratData = topMaterials.map(
        (m) => m.conditions["Rusak Berat"]?.count || 0
      );

      // Create new chart
      window.materialDamageChart = new Chart(materialDamageCtx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Baik",
              data: baikData,
              backgroundColor: "#10b981",
              borderColor: "#059669",
              borderWidth: 1,
            },
            {
              label: "Sedang",
              data: sedangData,
              backgroundColor: "#fbbf24",
              borderColor: "#f59e0b",
              borderWidth: 1,
            },
            {
              label: "Rusak Ringan",
              data: rusakRinganData,
              backgroundColor: "#f59e0b",
              borderColor: "#d97706",
              borderWidth: 1,
            },
            {
              label: "Rusak Berat",
              data: rusakBeratData,
              backgroundColor: "#ef4444",
              borderColor: "#dc2626",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
              cornerRadius: 8,
              callbacks: {
                label: function (context) {
                  return (
                    context.dataset.label + ": " + context.parsed.x + " jalan"
                  );
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + " jalan";
                },
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>
