<template>
  <div class="app">
    <Navbar
      @toggle-sidebar="handleToggleSidebar"
      @go-back-to-rtr="handleGoBackToRTR"
    />
    <main class="main-content">
      <MapView ref="mapViewRef" />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
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

.main-content {
  @apply flex-1 p-6;
}
</style>
