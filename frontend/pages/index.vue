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
        <div class="hero-text">
          <div class="hero-badge">
            <span class="badge-icon">🗺️</span>
            <span class="badge-text">Platform GIS Terintegrasi</span>
          </div>

          <h1 class="hero-title">
            <span class="title-line-1">Sistem Informasi</span>
            <span class="title-line-2">Jalan Lingkungan</span>
            <span class="title-highlight">Kabupaten Kubu Raya</span>
          </h1>

          <p class="hero-description">
            Platform GIS terintegrasi untuk pengelolaan dan analisis data jalan
            lingkungan di Kabupaten Kubu Raya dengan teknologi ArcGIS terdepan.
            Monitor, analisis, dan kelola infrastruktur jalan secara real-time.
          </p>

          <div class="hero-buttons">
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

        <div class="hero-visual">
          <div class="hero-card">
            <div class="card-header">
              <div class="card-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <span class="card-title">Live Map Preview</span>
            </div>
            <div class="card-content">
              <div class="map-preview">
                <div class="map-grid">
                  <div class="grid-line"></div>
                  <div class="grid-line"></div>
                  <div class="grid-line"></div>
                  <div class="grid-line"></div>
                </div>
                <div class="map-elements">
                  <div class="map-road road-1"></div>
                  <div class="map-road road-2"></div>
                  <div class="map-road road-3"></div>
                  <div class="map-point point-1"></div>
                  <div class="map-point point-2"></div>
                  <div class="map-point point-3"></div>
                </div>
                <div class="map-overlay">
                  <div class="overlay-stats">
                    <div class="overlay-stat">
                      <span class="stat-value">5,575</span>
                      <span class="stat-label">Roads</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <h3 class="stat-number">Real-time</h3>
            <p class="stat-label">Monitoring</p>
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
        <MapView ref="mapViewRef" />
      </div>
    </section>

    <!-- Analisis Section -->
    <section id="analisis" class="analisis-section">
      <div class="section-header">
        <h2 class="section-title">Analisis Data</h2>
        <p class="section-description">
          Dashboard analisis komprehensif untuk memahami kondisi dan tren
          infrastruktur jalan lingkungan di Kabupaten Kubu Raya.
        </p>
      </div>
      <div class="analisis-content">
        <div class="analisis-grid">
          <!-- Chart Cards -->
          <div class="analisis-card">
            <div class="card-header">
              <h3 class="card-title">Distribusi Kondisi Jalan</h3>
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
            <div class="chart-placeholder">
              <div class="chart-bars">
                <div class="bar" style="height: 60%; background: #10b981"></div>
                <div class="bar" style="height: 30%; background: #f59e0b"></div>
                <div class="bar" style="height: 10%; background: #ef4444"></div>
              </div>
              <div class="chart-labels">
                <span>Baik</span>
                <span>Sedang</span>
                <span>Rusak</span>
              </div>
            </div>
          </div>

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
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <div class="chart-placeholder">
              <div class="horizontal-bars">
                <div class="h-bar">
                  <span class="label">Sungai Raya</span>
                  <div class="bar-container">
                    <div class="bar-fill" style="width: 85%"></div>
                  </div>
                  <span class="value">85%</span>
                </div>
                <div class="h-bar">
                  <span class="label">Rasau Jaya</span>
                  <div class="bar-container">
                    <div class="bar-fill" style="width: 70%"></div>
                  </div>
                  <span class="value">70%</span>
                </div>
                <div class="h-bar">
                  <span class="label">Kubu</span>
                  <div class="bar-container">
                    <div class="bar-fill" style="width: 60%"></div>
                  </div>
                  <span class="value">60%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="analisis-card">
            <div class="card-header">
              <h3 class="card-title">Tren Pembangunan</h3>
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </div>
            <div class="chart-placeholder">
              <div class="trend-chart">
                <svg viewBox="0 0 200 100" class="w-full h-32">
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    stroke-width="2"
                    points="10,80 30,70 50,60 70,50 90,40 110,35 130,30 150,25 170,20 190,15"
                  />
                  <circle cx="190" cy="15" r="3" fill="#3B82F6" />
                </svg>
                <p class="text-sm text-gray-600 mt-2">
                  Peningkatan pembangunan jalan dari tahun ke tahun
                </p>
              </div>
            </div>
          </div>

          <div class="analisis-card">
            <div class="card-header">
              <h3 class="card-title">Prioritas Perbaikan</h3>
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="priority-list">
              <div class="priority-item">
                <div class="priority-icon high"></div>
                <div class="priority-content">
                  <h4 class="priority-title">Jalan Rusak Berat</h4>
                  <p class="priority-desc">Memerlukan perbaikan segera</p>
                </div>
                <span class="priority-count">45</span>
              </div>
              <div class="priority-item">
                <div class="priority-icon medium"></div>
                <div class="priority-content">
                  <h4 class="priority-title">Jalan Rusak Ringan</h4>
                  <p class="priority-desc">Perlu perawatan rutin</p>
                </div>
                <span class="priority-count">128</span>
              </div>
              <div class="priority-item">
                <div class="priority-icon low"></div>
                <div class="priority-content">
                  <h4 class="priority-title">Jalan Kondisi Baik</h4>
                  <p class="priority-desc">Perlu pemeliharaan</p>
                </div>
                <span class="priority-count">5,402</span>
              </div>
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
  @apply min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white flex flex-col justify-center relative overflow-hidden;
}

.hero-bg-elements {
  @apply absolute inset-0 pointer-events-none;
}

.hero-bg-circle {
  @apply absolute rounded-full opacity-10;
}

.hero-bg-circle-1 {
  @apply w-96 h-96 bg-blue-400 -top-48 -right-48 animate-pulse;
}

.hero-bg-circle-2 {
  @apply w-64 h-64 bg-indigo-400 top-1/4 -left-32 animate-pulse;
  animation-delay: 1s;
}

.hero-bg-circle-3 {
  @apply w-80 h-80 bg-purple-400 bottom-0 right-1/4 animate-pulse;
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
  @apply container mx-auto px-8 py-20 relative z-10 flex items-center justify-between;
}

.hero-text {
  @apply flex-1 max-w-2xl;
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
}

.title-line-2 {
  @apply block text-5xl font-bold text-white mt-2;
}

.title-highlight {
  @apply block text-3xl font-semibold text-blue-300 mt-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent;
}

.hero-description {
  @apply text-lg text-blue-100 mb-10 leading-relaxed max-w-xl;
}

.hero-buttons {
  @apply flex flex-wrap gap-6;
}

.btn-primary {
  @apply bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105;
}

.btn-secondary {
  @apply bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1;
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

.map-preview {
  @apply relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden;
}

.map-grid {
  @apply absolute inset-0 opacity-20;
  background-image: linear-gradient(
      rgba(59, 130, 246, 0.3) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
}

.map-elements {
  @apply absolute inset-0;
}

.map-road {
  @apply absolute bg-blue-400 rounded-full opacity-60;
}

.road-1 {
  @apply w-32 h-1 top-16 left-8 rotate-12;
}

.road-2 {
  @apply w-24 h-1 top-32 left-16 -rotate-12;
}

.road-3 {
  @apply w-28 h-1 top-48 left-12 rotate-6;
}

.map-point {
  @apply absolute w-3 h-3 bg-indigo-400 rounded-full shadow-lg;
}

.point-1 {
  @apply top-20 left-20;
}

.point-2 {
  @apply top-36 left-32;
}

.point-3 {
  @apply top-52 left-24;
}

.map-overlay {
  @apply absolute bottom-4 right-4;
}

.overlay-stats {
  @apply bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30 shadow-lg;
}

.overlay-stat {
  @apply text-center;
}

.stat-value {
  @apply block text-lg font-bold text-white drop-shadow-sm;
}

.stat-label {
  @apply text-xs text-blue-300 font-medium;
}

.hero-stats {
  @apply container mx-auto px-8 py-12 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.stat-card {
  @apply bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/30 flex items-center space-x-4 shadow-lg;
}

.stat-icon {
  @apply bg-blue-500/20 p-3 rounded-lg;
}

.stat-content {
  @apply flex-1;
}

.stat-number {
  @apply text-2xl font-bold text-white drop-shadow-sm;
}

.stat-label {
  @apply text-blue-300 text-sm font-medium;
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
  @apply flex justify-between text-sm text-gray-600;
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
