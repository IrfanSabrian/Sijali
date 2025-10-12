<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navbar -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo & Title -->
          <div class="flex items-center space-x-3">
            <img
              src="~/assets/images/sijali-logo.svg"
              alt="SIJALI Logo"
              class="h-10 w-10"
            />
            <div>
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">
                Dashboard SIJALI
              </h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Sistem Informasi Jalan Lingkungan
              </p>
            </div>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <!-- User Info -->
            <div class="hidden md:block text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ user?.username || "User" }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ user?.role || "User" }}
              </p>
            </div>

            <!-- Logout Button -->
            <button
              @click="handleLogout"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Welcome Card -->
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Selamat Datang, {{ user?.username || "User" }}! 👋
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Anda berhasil login sebagai
            <span class="font-semibold">{{ user?.role || "USER" }}</span>
          </p>
        </div>

        <!-- Placeholder Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-blue-500"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Total Jalan
              </h3>
              <svg
                class="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">---</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Coming soon...
            </p>
          </div>

          <!-- Card 2 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Kondisi Baik
              </h3>
              <svg
                class="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">---</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Coming soon...
            </p>
          </div>

          <!-- Card 3 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-red-500"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Perlu Perbaikan
              </h3>
              <svg
                class="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">---</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Coming soon...
            </p>
          </div>
        </div>

        <!-- Info Box -->
        <div class="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <div class="flex items-start">
            <svg
              class="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            <div>
              <h3 class="text-sm font-medium text-blue-800 dark:text-blue-300">
                Dashboard Sedang Dalam Pengembangan
              </h3>
              <p class="mt-2 text-sm text-blue-700 dark:text-blue-400">
                Halaman dashboard ini masih dalam tahap pengembangan.
                Fitur-fitur lengkap akan segera tersedia.
              </p>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Links
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink
              to="/"
              class="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <svg
                class="w-6 h-6 text-blue-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Beranda</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Kembali ke halaman utama
                </p>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/#peta"
              class="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <svg
                class="w-6 h-6 text-green-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Peta</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Lihat peta interaktif
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Set page title
useHead({
  title: "Dashboard - SIJALI",
  meta: [
    {
      name: "description",
      content: "Dashboard Sistem Informasi Jalan Lingkungan",
    },
  ],
});

const router = useRouter();
const user = ref(null);

// Check authentication on mount
onMounted(() => {
  const token = localStorage.getItem("sijali_token");
  const userData = localStorage.getItem("sijali_user");

  if (!token) {
    // Redirect to login if not authenticated
    router.push("/login");
    return;
  }

  if (userData) {
    user.value = JSON.parse(userData);
  }
});

// Logout handler
const handleLogout = () => {
  // Clear localStorage
  localStorage.removeItem("sijali_token");
  localStorage.removeItem("sijali_user");

  // Redirect to login
  router.push("/login");
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
