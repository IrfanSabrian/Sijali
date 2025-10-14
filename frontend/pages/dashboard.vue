<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
  >
    <!-- Navbar -->
    <nav
      class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
    >
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Mobile Menu Button & Logo -->
          <div class="flex items-center space-x-3">
            <!-- Hamburger Button (Mobile) -->
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="!sidebarOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <!-- Logo & Title -->
            <img
              src="~/assets/images/sijali-logo.svg"
              alt="SIJALI Logo"
              class="h-10 w-10 animate-pulse"
            />
            <div class="hidden sm:block">
              <h1
                class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Dashboard SIJALI
              </h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Sistem Informasi Jalan Lingkungan
              </p>
            </div>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <!-- User Info -->
            <div class="hidden md:block text-right">
              <p class="text-sm font-semibold text-gray-900 dark:text-white">
                {{ user?.username || "User" }}
              </p>
              <p
                class="text-xs px-2 py-0.5 rounded-full inline-block"
                :class="
                  user?.role === 'ADMIN'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                "
              >
                {{ user?.role || "USER" }}
              </p>
            </div>

            <!-- Logout Button -->
            <button
              @click="handleLogout"
              class="inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg
                class="w-4 h-4 sm:mr-2"
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
              <span class="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content with Sidebar -->
    <div class="flex relative">
      <!-- Mobile Sidebar Overlay -->
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
      ></div>

      <!-- Sidebar -->
      <aside
        :class="[
          'fixed lg:sticky top-16 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg h-[calc(100vh-4rem)] z-40 transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ]"
      >
        <nav class="p-4 space-y-2 overflow-y-auto h-full pb-20">
          <!-- Menu Dashboard (Top) -->
          <button
            @click="
              activeTab = 'dashboard';
              sidebarOpen = false;
            "
            :class="[
              'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
            ]"
          >
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span class="font-medium">Dashboard</span>
          </button>

          <!-- Menu Data -->
          <div class="mb-2">
            <p
              class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-2"
            >
              Data
            </p>
          </div>
          <button
            @click="
              activeTab = 'jalan';
              sidebarOpen = false;
            "
            :class="[
              'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
              activeTab === 'jalan'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
            ]"
          >
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
              />
            </svg>
            <span class="font-medium">Data Jalan</span>
          </button>

          <!-- Menu Laporan & Analisis -->
          <div
            class="pt-4 mt-2 mb-2 border-t border-gray-200 dark:border-gray-700"
          >
            <p
              class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-2"
            >
              Laporan & Analisis
            </p>
          </div>
          <button
            @click="
              activeTab = 'laporan';
              sidebarOpen = false;
            "
            :class="[
              'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
              activeTab === 'laporan'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
            ]"
          >
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span class="font-medium">Laporan</span>
          </button>

          <button
            @click="
              activeTab = 'analisis';
              sidebarOpen = false;
            "
            :class="[
              'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
              activeTab === 'analisis'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
            ]"
          >
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
              />
            </svg>
            <span class="font-medium">Analisis</span>
          </button>

          <!-- Menu Admin -->
          <div
            v-if="user?.role === 'ADMIN'"
            class="pt-4 mt-2 mb-2 border-t border-gray-200 dark:border-gray-700"
          >
            <p
              class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-2"
            >
              Admin
            </p>
          </div>
          <button
            v-if="user?.role === 'ADMIN'"
            @click="
              activeTab = 'users';
              sidebarOpen = false;
            "
            :class="[
              'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
              activeTab === 'users'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
            ]"
          >
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span class="font-medium">Manajemen User</span>
          </button>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main
        class="flex-1 min-w-0 w-full lg:w-auto py-4 sm:py-6 px-2 sm:px-4 lg:px-6 lg:ml-0"
      >
        <div class="sm:px-0 max-w-full">
          <!-- Welcome Card -->
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-6 text-white transform hover:scale-[1.01] transition-transform duration-200"
          >
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                  Selamat Datang, {{ user?.username || "User" }}! 👋
                </h2>
                <p class="text-sm sm:text-base text-blue-100">
                  Anda login sebagai
                  <span class="font-bold">{{ user?.role || "USER" }}</span>
                </p>
              </div>
              <div class="hidden lg:block">
                <svg
                  class="w-24 h-24 opacity-20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Statistics Cards -->
          <div
            v-if="loading"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6"
          >
            <div
              v-for="i in 3"
              :key="i"
              class="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 h-32"
            ></div>
          </div>
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6"
          >
            <!-- Total Jalan Card -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Total Jalan
                </h3>
                <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <svg
                    class="w-8 h-8 text-blue-600 dark:text-blue-300"
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
              </div>
              <p class="text-4xl font-bold text-gray-900 dark:text-white">
                {{ stats.totalRoads?.toLocaleString() || 0 }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Total {{ (stats.totalLength / 1000)?.toFixed(2) || 0 }} km
              </p>
            </div>

            <!-- Kondisi Baik Card -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Kondisi Baik
                </h3>
                <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <svg
                    class="w-8 h-8 text-green-600 dark:text-green-300"
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
              </div>
              <p class="text-4xl font-bold text-gray-900 dark:text-white">
                {{ conditionStats.baik || 0 }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {{ getPercentage(conditionStats.baik, stats.totalRoads) }}% dari
                total
              </p>
            </div>

            <!-- Perlu Perbaikan Card -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Perlu Perbaikan
                </h3>
                <div class="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                  <svg
                    class="w-8 h-8 text-red-600 dark:text-red-300"
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
              </div>
              <p class="text-4xl font-bold text-gray-900 dark:text-white">
                {{ conditionStats.rusak || 0 }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {{ getPercentage(conditionStats.rusak, stats.totalRoads) }}%
                dari total
              </p>
            </div>
          </div>

          <!-- Content Areas -->
          <div>
            <!-- Dashboard Section -->
            <div v-show="activeTab === 'dashboard'" class="space-y-6">
              <AduanList />
            </div>

            <!-- Data Jalan Section -->
            <div v-show="activeTab === 'jalan'" class="space-y-6">
              <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6"
              >
                <div class="flex justify-between items-center mb-6">
                  <h3
                    class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Data Jalan Lingkungan
                  </h3>
                </div>

                <!-- Search and Filter -->
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
                >
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari nama jalan..."
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <select
                    v-model="filterKecamatan"
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Semua Kecamatan</option>
                    <option
                      v-for="kec in kecamatanList"
                      :key="kec"
                      :value="kec"
                    >
                      {{ kec }}
                    </option>
                  </select>
                  <select
                    v-model="filterKondisi"
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Semua Kondisi</option>
                    <option
                      v-for="kondisi in kondisiList"
                      :key="kondisi"
                      :value="kondisi"
                    >
                      {{ kondisi }}
                    </option>
                  </select>
                  <button
                    @click="showAddModal = true"
                    class="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Tambah Data</span>
                  </button>
                </div>

                <!-- Roads Table -->
                <div
                  class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <table
                    class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <thead class="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          No
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          FID
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          No Ruas
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          No Prov
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          No Kab
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          No Kec
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          No Desa
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          No Jalan
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[200px]"
                        >
                          Nama Jalan
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          Kecamatan
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          Desa
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          Panjang (m)
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          Lebar (m)
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          Tahun
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          Kondisi
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          Nilai
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          Bobot
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          UTM X Awal
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          UTM Y Awal
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          Penanganan Awal
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          UTM X Akhir
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          UTM Y Akhir
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                        >
                          Penanganan Akhir
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[200px]"
                        >
                          Keterangan
                        </th>
                        <th
                          class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider sticky right-0 bg-gray-50 dark:bg-gray-700 z-10"
                        >
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      <tr v-if="loadingRoads">
                        <td
                          colspan="25"
                          class="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                        >
                          <div
                            class="flex items-center justify-center space-x-2"
                          >
                            <div
                              class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"
                            ></div>
                            <span>Memuat data...</span>
                          </div>
                        </td>
                      </tr>
                      <tr v-else-if="filteredRoads.length === 0">
                        <td
                          colspan="25"
                          class="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                        >
                          Tidak ada data
                        </td>
                      </tr>
                      <tr
                        v-else
                        v-for="(road, index) in paginatedRoads"
                        :key="road.id"
                        class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <!-- No -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 font-medium"
                        >
                          {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                        </td>
                        <!-- FID -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                        >
                          {{ road.fid || "-" }}
                        </td>
                        <!-- No Ruas -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                        >
                          {{ road.noRuas || "-" }}
                        </td>
                        <!-- No Prov -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-center"
                        >
                          {{ road.noProv || "-" }}
                        </td>
                        <!-- No Kab -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-center"
                        >
                          {{ road.noKab || "-" }}
                        </td>
                        <!-- No Kec -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-center"
                        >
                          {{ road.noKec || "-" }}
                        </td>
                        <!-- No Desa -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-center"
                        >
                          {{ road.noDesa || "-" }}
                        </td>
                        <!-- No Jalan -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                        >
                          {{ road.noJalan || "-" }}
                        </td>
                        <!-- Nama Jalan -->
                        <td
                          class="px-3 py-3 text-sm text-gray-900 dark:text-gray-300 font-medium"
                        >
                          {{ road.namaJalan || road.nama || "-" }}
                        </td>
                        <!-- Kecamatan -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                        >
                          {{ road.kecamatan || "-" }}
                        </td>
                        <!-- Desa -->
                        <td
                          class="px-3 py-3 text-sm text-gray-900 dark:text-gray-300"
                        >
                          {{ road.desa || "-" }}
                        </td>
                        <!-- Panjang -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-right"
                        >
                          {{ road.panjangM?.toFixed(2) || "-" }}
                        </td>
                        <!-- Lebar -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-right"
                        >
                          {{ road.lebarM?.toFixed(2) || "-" }}
                        </td>
                        <!-- Tahun -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-center"
                        >
                          {{ road.tahun || "-" }}
                        </td>
                        <!-- Kondisi -->
                        <td class="px-3 py-3 whitespace-nowrap">
                          <span
                            :class="
                              getKondisiBadge(road.kondisi || road.keterangan)
                            "
                            class="px-2 py-1 text-xs font-semibold rounded-full"
                          >
                            {{ road.kondisi || road.keterangan || "-" }}
                          </span>
                        </td>
                        <!-- Nilai -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-right"
                        >
                          {{ road.nilai?.toFixed(2) || "-" }}
                        </td>
                        <!-- Bobot -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-center"
                        >
                          {{ road.bobot || "-" }}
                        </td>
                        <!-- UTM X Awal -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-right font-mono"
                        >
                          {{ road.utmXAwal?.toFixed(4) || "-" }}
                        </td>
                        <!-- UTM Y Awal -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-right font-mono"
                        >
                          {{ road.utmYAwal?.toFixed(4) || "-" }}
                        </td>
                        <!-- Penanganan Awal -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                        >
                          {{ road.pngnlAwal || "-" }}
                        </td>
                        <!-- UTM X Akhir -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-right font-mono"
                        >
                          {{ road.utmXAkhi?.toFixed(4) || "-" }}
                        </td>
                        <!-- UTM Y Akhir -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-right font-mono"
                        >
                          {{ road.utmYAkhi?.toFixed(4) || "-" }}
                        </td>
                        <!-- Penanganan Akhir -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                        >
                          {{ road.pngnlAkhi || "-" }}
                        </td>
                        <!-- Keterangan -->
                        <td
                          class="px-3 py-3 text-sm text-gray-900 dark:text-gray-300 max-w-xs"
                        >
                          <div class="truncate" :title="road.keterangan || '-'">
                            {{ road.keterangan || "-" }}
                          </div>
                        </td>
                        <!-- Aksi -->
                        <td
                          class="px-3 py-3 whitespace-nowrap text-sm space-x-2 sticky right-0 bg-white dark:bg-gray-800 z-10"
                        >
                          <button
                            @click="viewRoad(road)"
                            class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          >
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
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button
                            @click="editRoad(road)"
                            class="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors"
                          >
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            @click="deleteRoad(road)"
                            class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          >
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Pagination -->
                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-700 dark:text-gray-300">
                    Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} -
                    {{
                      Math.min(currentPage * itemsPerPage, filteredRoads.length)
                    }}
                    dari {{ filteredRoads.length }} data
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="currentPage--"
                      :disabled="currentPage === 1"
                      class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      @click="currentPage++"
                      :disabled="currentPage >= totalPages"
                      class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- User Management Section (Admin Only) -->
            <div
              v-show="activeTab === 'users' && user?.role === 'ADMIN'"
              class="space-y-6"
            >
              <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-4 sm:p-6"
              >
                <div
                  class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4"
                >
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                    Manajemen User
                  </h3>
                  <button
                    @click="openAddUserModal"
                    class="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
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
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    <span>Tambah User</span>
                  </button>
                </div>

                <!-- Users Table -->
                <div
                  class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <table
                    class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <thead class="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          No
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Username
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Role
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Dibuat
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      <tr v-if="loadingUsers">
                        <td
                          colspan="6"
                          class="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                        >
                          <div
                            class="flex items-center justify-center space-x-2"
                          >
                            <div
                              class="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"
                            ></div>
                            <span>Memuat data...</span>
                          </div>
                        </td>
                      </tr>
                      <tr v-else-if="users.length === 0">
                        <td
                          colspan="6"
                          class="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                        >
                          Tidak ada user
                        </td>
                      </tr>
                      <tr
                        v-else
                        v-for="(userItem, index) in users"
                        :key="userItem.id"
                        class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                        >
                          {{ index + 1 }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {{ userItem.username }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                        >
                          {{ userItem.email || "-" }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span
                            :class="
                              userItem.role === 'ADMIN'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            "
                            class="px-2 py-1 text-xs font-semibold rounded-full"
                          >
                            {{ userItem.role }}
                          </span>
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                        >
                          {{ formatDate(userItem.createdAt) }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm space-x-2"
                        >
                          <button
                            @click="editUser(userItem)"
                            class="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors"
                          >
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            @click="deleteUser(userItem)"
                            :disabled="userItem.id === user?.id"
                            class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Laporan Section -->
            <div v-show="activeTab === 'laporan'" class="space-y-6">
              <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-4 sm:p-6"
              >
                <div class="flex justify-between items-center mb-6">
                  <h3
                    class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Laporan Jalan Lingkungan
                  </h3>
                </div>

                <!-- Laporan Options -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <!-- Laporan Per Kecamatan -->
                  <div
                    class="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-green-500"
                  >
                    <div class="flex items-start space-x-4">
                      <div
                        class="p-3 bg-green-100 dark:bg-green-900 rounded-lg"
                      >
                        <svg
                          class="w-6 h-6 text-green-600 dark:text-green-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h4
                          class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                        >
                          Laporan Per Kecamatan
                        </h4>
                        <p
                          class="text-sm text-gray-600 dark:text-gray-400 mb-4"
                        >
                          Lihat statistik dan detail jalan berdasarkan kecamatan
                        </p>
                        <button
                          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          Lihat Laporan
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Laporan Kondisi Jalan -->
                  <div
                    class="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-green-500"
                  >
                    <div class="flex items-start space-x-4">
                      <div
                        class="p-3 bg-green-100 dark:bg-green-900 rounded-lg"
                      >
                        <svg
                          class="w-6 h-6 text-green-600 dark:text-green-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                          />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h4
                          class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                        >
                          Laporan Kondisi Jalan
                        </h4>
                        <p
                          class="text-sm text-gray-600 dark:text-gray-400 mb-4"
                        >
                          Rekap kondisi jalan (Baik, Sedang, Rusak)
                        </p>
                        <button
                          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          Lihat Laporan
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Laporan Tahunan -->
                  <div
                    class="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-green-500"
                  >
                    <div class="flex items-start space-x-4">
                      <div
                        class="p-3 bg-green-100 dark:bg-green-900 rounded-lg"
                      >
                        <svg
                          class="w-6 h-6 text-green-600 dark:text-green-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h4
                          class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                        >
                          Laporan Tahunan
                        </h4>
                        <p
                          class="text-sm text-gray-600 dark:text-gray-400 mb-4"
                        >
                          Laporan lengkap berdasarkan tahun
                        </p>
                        <button
                          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          Lihat Laporan
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Export Data -->
                  <div
                    class="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-green-500"
                  >
                    <div class="flex items-start space-x-4">
                      <div
                        class="p-3 bg-green-100 dark:bg-green-900 rounded-lg"
                      >
                        <svg
                          class="w-6 h-6 text-green-600 dark:text-green-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h4
                          class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                        >
                          Export Data
                        </h4>
                        <p
                          class="text-sm text-gray-600 dark:text-gray-400 mb-4"
                        >
                          Download data dalam format Excel atau PDF
                        </p>
                        <button
                          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          Export
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Analisis Section -->
            <div v-show="activeTab === 'analisis'" class="space-y-6">
              <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-4 sm:p-6"
              >
                <div
                  class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
                >
                  <h3
                    class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Analisis Data Jalan
                  </h3>
                  <button
                    @click="initCharts"
                    class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center space-x-2"
                  >
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>Refresh Charts</span>
                  </button>
                </div>

                <!-- Charts Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <!-- Chart 1 - Kondisi Jalan (Pie Chart) -->
                  <div
                    class="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800"
                  >
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                    >
                      Distribusi Kondisi Jalan
                    </h4>
                    <div class="h-64 relative">
                      <canvas ref="kondisiChart"></canvas>
                    </div>
                  </div>

                  <!-- Chart 2 - Jalan per Kecamatan (Bar Chart) -->
                  <div
                    class="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800"
                  >
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                    >
                      Jalan per Kecamatan
                    </h4>
                    <div class="h-64 relative">
                      <canvas ref="kecamatanChart"></canvas>
                    </div>
                  </div>

                  <!-- Chart 3 - Panjang Jalan per Kecamatan (Bar Chart) -->
                  <div
                    class="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800"
                  >
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                    >
                      Total Panjang Jalan per Kecamatan
                    </h4>
                    <div class="h-64 relative">
                      <canvas ref="panjangChart"></canvas>
                    </div>
                  </div>

                  <!-- Chart 4 - Kondisi per Kecamatan (Stacked Bar) -->
                  <div
                    class="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800"
                  >
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                    >
                      Perbandingan Kondisi per Kecamatan
                    </h4>
                    <div class="h-64 relative">
                      <canvas ref="stackedChart"></canvas>
                    </div>
                  </div>
                </div>

                <!-- Summary Stats -->
                <div
                  class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  <div
                    class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
                  >
                    <p class="text-sm text-blue-600 dark:text-blue-400 mb-1">
                      Rata-rata Panjang Jalan
                    </p>
                    <p
                      class="text-2xl font-bold text-blue-900 dark:text-blue-100"
                    >
                      {{
                        stats.totalRoads
                          ? (stats.totalLength / stats.totalRoads).toFixed(2)
                          : 0
                      }}
                      m
                    </p>
                  </div>
                  <div
                    class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
                  >
                    <p class="text-sm text-green-600 dark:text-green-400 mb-1">
                      Persentase Baik
                    </p>
                    <p
                      class="text-2xl font-bold text-green-900 dark:text-green-100"
                    >
                      {{
                        getPercentage(conditionStats.baik, stats.totalRoads)
                      }}%
                    </p>
                  </div>
                  <div
                    class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
                  >
                    <p
                      class="text-sm text-yellow-600 dark:text-yellow-400 mb-1"
                    >
                      Persentase Sedang
                    </p>
                    <p
                      class="text-2xl font-bold text-yellow-900 dark:text-yellow-100"
                    >
                      {{
                        getPercentage(conditionStats.sedang, stats.totalRoads)
                      }}%
                    </p>
                  </div>
                  <div
                    class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                  >
                    <p class="text-sm text-red-600 dark:text-red-400 mb-1">
                      Persentase Rusak
                    </p>
                    <p
                      class="text-2xl font-bold text-red-900 dark:text-red-100"
                    >
                      {{
                        getPercentage(conditionStats.rusak, stats.totalRoads)
                      }}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer
      class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- About -->
          <div>
            <div class="flex items-center space-x-2 mb-3">
              <img
                src="~/assets/images/sijali-logo.svg"
                alt="SIJALI Logo"
                class="h-8 w-8"
              />
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                SIJALI
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Sistem Informasi Jalan Lingkungan Kabupaten Kubu Raya
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4
              class="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider"
            >
              Menu
            </h4>
            <ul class="space-y-2">
              <li>
                <button
                  @click="
                    activeTab = 'jalan';
                    sidebarOpen = false;
                  "
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Data Jalan
                </button>
              </li>
              <li>
                <button
                  @click="
                    activeTab = 'laporan';
                    sidebarOpen = false;
                  "
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Laporan
                </button>
              </li>
              <li>
                <button
                  @click="
                    activeTab = 'analisis';
                    sidebarOpen = false;
                  "
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Analisis
                </button>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4
              class="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider"
            >
              Kontak
            </h4>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li class="flex items-start space-x-2">
                <svg
                  class="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Kabupaten Kubu Raya, Kalimantan Barat</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg
                  class="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@kuburayakab.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-center text-sm text-gray-500 dark:text-gray-400">
            © {{ new Date().getFullYear() }} SIJALI - Sistem Informasi Jalan
            Lingkungan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    <!-- Modals -->
    <!-- Add/Edit Road Modal -->
    <Teleport to="body">
      <div
        v-if="showAddModal || showEditModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="closeRoadModal"
          ></div>
          <div
            class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
          >
            <div
              class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
            >
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {{ showAddModal ? "Tambah Data Jalan" : "Edit Data Jalan" }}
              </h3>
              <form @submit.prevent="saveRoad" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Nama Jalan</label
                    >
                    <input
                      v-model="roadForm.namaJalan"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >No Ruas</label
                    >
                    <input
                      v-model="roadForm.noRuas"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Kecamatan</label
                    >
                    <input
                      v-model="roadForm.kecamatan"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Desa</label
                    >
                    <input
                      v-model="roadForm.desa"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Panjang (m)</label
                    >
                    <input
                      v-model.number="roadForm.panjangM"
                      type="number"
                      step="0.01"
                      required
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Lebar (m)</label
                    >
                    <input
                      v-model.number="roadForm.lebarM"
                      type="number"
                      step="0.01"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Kondisi</label
                    >
                    <select
                      v-model="roadForm.kondisi"
                      required
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Pilih Kondisi</option>
                      <option v-for="k in kondisiList" :key="k" :value="k">
                        {{ k }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Tahun</label
                    >
                    <input
                      v-model="roadForm.tahun"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Keterangan</label
                    >
                    <textarea
                      v-model="roadForm.keterangan"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>
                </div>
                <div class="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    @click="closeRoadModal"
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {{ showAddModal ? "Tambah" : "Simpan" }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- View Road Modal -->
    <Teleport to="body">
      <div
        v-if="showViewModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="showViewModal = false"
          ></div>
          <div
            class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
          >
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Detail Jalan
              </h3>
              <div v-if="selectedRoad" class="space-y-3">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <span class="font-semibold">Nama Jalan:</span>
                    {{ selectedRoad.namaJalan || "-" }}
                  </div>
                  <div>
                    <span class="font-semibold">No Ruas:</span>
                    {{ selectedRoad.noRuas || "-" }}
                  </div>
                  <div>
                    <span class="font-semibold">Kecamatan:</span>
                    {{ selectedRoad.kecamatan || "-" }}
                  </div>
                  <div>
                    <span class="font-semibold">Desa:</span>
                    {{ selectedRoad.desa || "-" }}
                  </div>
                  <div>
                    <span class="font-semibold">Panjang:</span>
                    {{ selectedRoad.panjangM?.toFixed(2) || "-" }} m
                  </div>
                  <div>
                    <span class="font-semibold">Lebar:</span>
                    {{ selectedRoad.lebarM?.toFixed(2) || "-" }} m
                  </div>
                  <div>
                    <span class="font-semibold">Kondisi:</span>
                    {{ selectedRoad.kondisi || selectedRoad.keterangan || "-" }}
                  </div>
                  <div>
                    <span class="font-semibold">Tahun:</span>
                    {{ selectedRoad.tahun || "-" }}
                  </div>
                  <div class="col-span-2">
                    <span class="font-semibold">Keterangan:</span>
                    {{ selectedRoad.keterangan || "-" }}
                  </div>
                </div>
              </div>
              <div class="flex justify-end mt-6">
                <button
                  @click="showViewModal = false"
                  class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Add/Edit User Modal -->
    <Teleport to="body">
      <div
        v-if="showAddUserModal || showEditUserModal"
        :key="modalKey"
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="closeUserModal"
          ></div>
          <div
            class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div
              class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
            >
              <div class="flex items-center space-x-3 mb-4">
                <div
                  :class="[
                    'p-2 rounded-lg',
                    showAddUserModal
                      ? 'bg-purple-100 dark:bg-purple-900'
                      : 'bg-yellow-100 dark:bg-yellow-900',
                  ]"
                >
                  <svg
                    v-if="showAddUserModal"
                    class="w-6 h-6 text-purple-600 dark:text-purple-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-6 h-6 text-yellow-600 dark:text-yellow-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    {{ showAddUserModal ? "Tambah User Baru" : "Edit User" }}
                  </h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{
                      showAddUserModal
                        ? "Isi form di bawah untuk menambah user baru"
                        : "Update informasi user"
                    }}
                  </p>
                </div>
              </div>

              <!-- Required Fields Info -->
              <div
                class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4"
              >
                <p class="text-xs text-blue-800 dark:text-blue-300">
                  <span class="font-semibold">ℹ️ Informasi:</span> Field yang
                  ditandai dengan (*) wajib diisi
                </p>
              </div>

              <form
                @submit.prevent="saveUser"
                class="space-y-4"
                autocomplete="off"
              >
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Username *</label
                  >
                  <input
                    v-model="userForm.username"
                    type="text"
                    required
                    autocomplete="off"
                    placeholder="Masukkan username (contoh: johndoe)"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Email</label
                  >
                  <input
                    v-model="userForm.email"
                    type="email"
                    autocomplete="off"
                    placeholder="Masukkan email (contoh: user@sijali.com)"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Email bersifat opsional
                  </p>
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Password
                    {{
                      showEditUserModal ? "(kosongkan jika tidak diubah)" : "*"
                    }}
                  </label>
                  <input
                    v-model="userForm.password"
                    type="password"
                    :required="showAddUserModal"
                    autocomplete="new-password"
                    :placeholder="
                      showEditUserModal
                        ? 'Kosongkan jika tidak ingin mengubah password'
                        : 'Masukkan password (minimal 6 karakter)'
                    "
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Role *</label
                  >
                  <select
                    v-model="userForm.role"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="USER">
                      USER - Akses terbatas (hanya lihat data)
                    </option>
                    <option value="ADMIN">
                      ADMIN - Akses penuh (kelola data & user)
                    </option>
                  </select>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Pilih role sesuai hak akses yang diinginkan
                  </p>
                </div>
                <div class="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    @click="closeUserModal"
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {{ showAddUserModal ? "Tambah" : "Simpan" }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AduanList from "~/components/AduanList.vue";

// Register Chart.js components
Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

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
const config = useRuntimeConfig();
const API_BASE = config.public.apiBaseUrl || "http://localhost:3001";

// Chart refs
const kondisiChart = ref(null);
const kecamatanChart = ref(null);
const panjangChart = ref(null);
const stackedChart = ref(null);

// Chart instances
let kondisiChartInstance = null;
let kecamatanChartInstance = null;
let panjangChartInstance = null;
let stackedChartInstance = null;

// User state
const user = ref(null);
const token = ref(null);

// UI State
const activeTab = ref("dashboard");
const sidebarOpen = ref(false);
const loading = ref(true);
const loadingRoads = ref(true);
const loadingUsers = ref(false);

// Data state
const stats = ref({});
const conditionStats = ref({});
const roads = ref([]);
const users = ref([]);
const kecamatanList = ref([]);
const kondisiList = ref([]);

// Filter state
const searchQuery = ref("");
const filterKecamatan = ref("");
const filterKondisi = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Modal state
const showAddModal = ref(false);
const showEditModal = ref(false);
const showViewModal = ref(false);
const showAddUserModal = ref(false);
const showEditUserModal = ref(false);
const modalKey = ref(0);

// Form state
const roadForm = ref({
  namaJalan: "",
  noRuas: "",
  kecamatan: "",
  desa: "",
  panjangM: null,
  lebarM: null,
  kondisi: "",
  tahun: "",
  keterangan: "",
});

const userForm = ref({
  username: "",
  email: "",
  password: "",
  role: "USER",
});

const selectedRoad = ref(null);
const editingRoadId = ref(null);
const editingUserId = ref(null);

// Computed
const filteredRoads = computed(() => {
  let filtered = roads.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (road) =>
        road.namaJalan?.toLowerCase().includes(query) ||
        road.nama?.toLowerCase().includes(query) ||
        road.noRuas?.toLowerCase().includes(query)
    );
  }

  if (filterKecamatan.value) {
    filtered = filtered.filter(
      (road) => road.kecamatan === filterKecamatan.value
    );
  }

  if (filterKondisi.value) {
    filtered = filtered.filter(
      (road) => (road.kondisi || road.keterangan) === filterKondisi.value
    );
  }

  return filtered;
});

const paginatedRoads = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredRoads.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredRoads.value.length / itemsPerPage.value);
});

// Methods
const getPercentage = (value, total) => {
  if (!total) return 0;
  return ((value / total) * 100).toFixed(1);
};

const getKondisiBadge = (kondisi) => {
  const kondisiUpper = kondisi?.toUpperCase() || "";
  const badges = {
    BAIK: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    SEDANG:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    RUSAK: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  // Check if kondisi contains keywords
  if (kondisiUpper.includes("BAIK") || kondisiUpper.includes("BAGUS")) {
    return badges.BAIK;
  } else if (kondisiUpper.includes("RUSAK") || kondisiUpper.includes("BURUK")) {
    return badges.RUSAK;
  } else if (
    kondisiUpper.includes("SEDANG") ||
    kondisiUpper.includes("CUKUP")
  ) {
    return badges.SEDANG;
  }

  return (
    badges[kondisiUpper] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
  );
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// API Calls
const fetchStats = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/jalan/stats/summary`);
    const data = await response.json();

    if (data.success) {
      stats.value = data.data;

      // Process condition stats - check both kondisi and conditionStats
      const conditions = data.data.conditionStats || [];

      // Try to find stats from kondisi field first
      let baik =
        conditions.find((c) => c.kondisi?.toUpperCase() === "BAIK")?._count
          ?.kondisi || 0;
      let sedang =
        conditions.find((c) => c.kondisi?.toUpperCase() === "SEDANG")?._count
          ?.kondisi || 0;
      let rusak =
        conditions.find((c) => c.kondisi?.toUpperCase() === "RUSAK")?._count
          ?.kondisi || 0;

      // If no data from kondisi, fetch from keterangan stats
      if (baik === 0 && sedang === 0 && rusak === 0) {
        try {
          const keteranganResponse = await fetch(
            `${API_BASE}/api/jalan/stats/keterangan`
          );
          const keteranganData = await keteranganResponse.json();

          if (keteranganData.success) {
            const keteranganStats = keteranganData.data || [];

            // Map keterangan to kondisi categories
            keteranganStats.forEach((stat) => {
              const ket = stat.keterangan?.toUpperCase() || "";
              if (ket.includes("BAIK") || ket.includes("BAGUS")) {
                baik += stat._count.keterangan || 0;
              } else if (ket.includes("RUSAK") || ket.includes("BURUK")) {
                rusak += stat._count.keterangan || 0;
              } else if (ket.includes("SEDANG") || ket.includes("CUKUP")) {
                sedang += stat._count.keterangan || 0;
              }
            });
          }
        } catch (error) {
          console.error("Error fetching keterangan stats:", error);
        }
      }

      conditionStats.value = {
        baik,
        sedang,
        rusak,
      };
    }
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
};

const fetchRoads = async () => {
  try {
    loadingRoads.value = true;
    const response = await fetch(`${API_BASE}/api/jalan?limit=10000`);
    const data = await response.json();

    if (data.success) {
      roads.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching roads:", error);
  } finally {
    loadingRoads.value = false;
  }
};

const fetchFilterOptions = async () => {
  try {
    const [kecResponse, kondisiResponse] = await Promise.all([
      fetch(`${API_BASE}/api/jalan/filters/kecamatan`),
      fetch(`${API_BASE}/api/jalan/filters/kondisi`),
    ]);

    const kecData = await kecResponse.json();
    const kondisiData = await kondisiResponse.json();

    if (kecData.success) kecamatanList.value = kecData.data;
    if (kondisiData.success) kondisiList.value = kondisiData.data;
  } catch (error) {
    console.error("Error fetching filter options:", error);
  }
};

const fetchUsers = async () => {
  if (user.value?.role !== "ADMIN") {
    return;
  }

  try {
    loadingUsers.value = true;
    const response = await fetch(`${API_BASE}/api/auth/users`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    const data = await response.json();

    if (data.success) {
      users.value = data.data;
    } else {
      console.error("Gagal fetch users:", data.message);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    loadingUsers.value = false;
  }
};

// CRUD Operations - Roads
const viewRoad = (road) => {
  selectedRoad.value = road;
  showViewModal.value = true;
};

const editRoad = (road) => {
  editingRoadId.value = road.id;
  roadForm.value = { ...road };
  showEditModal.value = true;
};

const deleteRoad = async (road) => {
  if (!confirm(`Hapus data jalan "${road.namaJalan || road.nama}"?`)) return;

  try {
    const response = await fetch(`${API_BASE}/api/jalan/${road.id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      alert("Data berhasil dihapus!");
      await fetchRoads();
      await fetchStats();
    } else {
      alert("Gagal menghapus data: " + data.error);
    }
  } catch (error) {
    console.error("Error deleting road:", error);
    alert("Terjadi kesalahan saat menghapus data");
  }
};

const saveRoad = async () => {
  try {
    const url = showEditModal.value
      ? `${API_BASE}/api/jalan/${editingRoadId.value}`
      : `${API_BASE}/api/jalan`;

    const method = showEditModal.value ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roadForm.value),
    });

    const data = await response.json();

    if (data.success) {
      alert(
        showEditModal.value
          ? "Data berhasil diupdate!"
          : "Data berhasil ditambahkan!"
      );
      closeRoadModal();
      await fetchRoads();
      await fetchStats();
    } else {
      alert("Gagal menyimpan data: " + data.error);
    }
  } catch (error) {
    console.error("Error saving road:", error);
    alert("Terjadi kesalahan saat menyimpan data");
  }
};

const closeRoadModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  editingRoadId.value = null;
  roadForm.value = {
    namaJalan: "",
    noRuas: "",
    kecamatan: "",
    desa: "",
    panjangM: null,
    lebarM: null,
    kondisi: "",
    tahun: "",
    keterangan: "",
  };
};

// CRUD Operations - Users
const editUser = (userItem) => {
  // Tutup modal yang terbuka
  showAddUserModal.value = false;
  showEditUserModal.value = false;

  // Set data user yang akan diedit
  editingUserId.value = userItem.id;
  userForm.value = {
    username: userItem.username,
    email: userItem.email || "",
    password: "",
    role: userItem.role,
  };

  // Ubah modalKey untuk force re-render
  modalKey.value += 1;

  // Buka modal edit
  nextTick(() => {
    showEditUserModal.value = true;
  });
};

const deleteUser = async (userItem) => {
  if (!confirm(`Hapus user "${userItem.username}"?`)) return;

  try {
    const response = await fetch(`${API_BASE}/api/auth/users/${userItem.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      alert("User berhasil dihapus!");
      await fetchUsers();
    } else {
      alert("Gagal menghapus user: " + data.message);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Terjadi kesalahan saat menghapus user");
  }
};

const saveUser = async () => {
  try {
    const url = showEditUserModal.value
      ? `${API_BASE}/api/auth/users/${editingUserId.value}`
      : `${API_BASE}/api/auth/register`;

    const method = showEditUserModal.value ? "PUT" : "POST";

    // Only send password if it's filled
    const payload = { ...userForm.value };
    if (showEditUserModal.value && !payload.password) {
      delete payload.password;
    }

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      alert(
        showEditUserModal.value
          ? "User berhasil diupdate!"
          : "User berhasil ditambahkan!"
      );
      closeUserModal();
      await fetchUsers();
    } else {
      alert("Gagal menyimpan user: " + data.message);
    }
  } catch (error) {
    console.error("Error saving user:", error);
    alert("Terjadi kesalahan saat menyimpan user");
  }
};

const openAddUserModal = () => {
  // Tutup modal terlebih dahulu jika ada yang terbuka
  showAddUserModal.value = false;
  showEditUserModal.value = false;

  // Reset form dengan nilai kosong yang baru
  userForm.value = {
    username: "",
    email: "",
    password: "",
    role: "USER",
  };

  editingUserId.value = null;

  // Ubah modalKey untuk force re-render
  modalKey.value += 1;

  // Gunakan nextTick untuk memastikan DOM sudah terupdate
  nextTick(() => {
    showAddUserModal.value = true;
  });
};

const closeUserModal = () => {
  showAddUserModal.value = false;
  showEditUserModal.value = false;
  editingUserId.value = null;

  // Reset form
  userForm.value = {
    username: "",
    email: "",
    password: "",
    role: "USER",
  };

  // Ubah modalKey untuk force re-render saat dibuka lagi
  modalKey.value += 1;
};

const handleLogout = () => {
  localStorage.removeItem("sijali_token");
  localStorage.removeItem("sijali_user");
  router.push("/login");
};

// Chart Functions
const destroyCharts = () => {
  if (kondisiChartInstance) {
    kondisiChartInstance.destroy();
    kondisiChartInstance = null;
  }
  if (kecamatanChartInstance) {
    kecamatanChartInstance.destroy();
    kecamatanChartInstance = null;
  }
  if (panjangChartInstance) {
    panjangChartInstance.destroy();
    panjangChartInstance = null;
  }
  if (stackedChartInstance) {
    stackedChartInstance.destroy();
    stackedChartInstance = null;
  }
};

const initCharts = () => {
  // Destroy existing charts
  destroyCharts();

  // Wait for nextTick to ensure canvas elements are rendered
  nextTick(() => {
    // Chart 1: Pie Chart - Kondisi Jalan
    if (kondisiChart.value) {
      kondisiChartInstance = new Chart(kondisiChart.value, {
        type: "doughnut",
        data: {
          labels: ["Baik", "Sedang", "Rusak"],
          datasets: [
            {
              data: [
                conditionStats.value.baik || 0,
                conditionStats.value.sedang || 0,
                conditionStats.value.rusak || 0,
              ],
              backgroundColor: [
                "rgba(34, 197, 94, 0.8)", // green-500
                "rgba(251, 191, 36, 0.8)", // yellow-500
                "rgba(239, 68, 68, 0.8)", // red-500
              ],
              borderColor: [
                "rgba(34, 197, 94, 1)",
                "rgba(251, 191, 36, 1)",
                "rgba(239, 68, 68, 1)",
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 15,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
    }

    // Chart 2: Bar Chart - Jalan per Kecamatan
    if (kecamatanChart.value) {
      // Group roads by kecamatan
      const kecamatanCount = {};
      roads.value.forEach((road) => {
        const kec = road.kecamatan || "Lainnya";
        kecamatanCount[kec] = (kecamatanCount[kec] || 0) + 1;
      });

      const labels = Object.keys(kecamatanCount);
      const data = Object.values(kecamatanCount);

      kecamatanChartInstance = new Chart(kecamatanChart.value, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Jumlah Jalan",
              data: data,
              backgroundColor: "rgba(59, 130, 246, 0.8)", // blue-500
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    // Chart 3: Bar Chart - Panjang Jalan per Kecamatan
    if (panjangChart.value) {
      // Group total length by kecamatan
      const kecamatanLength = {};
      roads.value.forEach((road) => {
        const kec = road.kecamatan || "Lainnya";
        kecamatanLength[kec] =
          (kecamatanLength[kec] || 0) + (road.panjangM || 0);
      });

      const labels = Object.keys(kecamatanLength);
      const data = Object.values(kecamatanLength).map((v) =>
        (v / 1000).toFixed(2)
      ); // Convert to km

      panjangChartInstance = new Chart(panjangChart.value, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Panjang (km)",
              data: data,
              backgroundColor: "rgba(168, 85, 247, 0.8)", // purple-500
              borderColor: "rgba(168, 85, 247, 1)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    // Chart 4: Stacked Bar - Kondisi per Kecamatan
    if (stackedChart.value) {
      // Group by kecamatan and kondisi
      const kecamatanKondisi = {};
      roads.value.forEach((road) => {
        const kec = road.kecamatan || "Lainnya";
        const kondisi = road.kondisi || road.keterangan || "Unknown";

        if (!kecamatanKondisi[kec]) {
          kecamatanKondisi[kec] = { baik: 0, sedang: 0, rusak: 0 };
        }

        const kondisiUpper = kondisi.toUpperCase();
        if (kondisiUpper.includes("BAIK") || kondisiUpper.includes("BAGUS")) {
          kecamatanKondisi[kec].baik++;
        } else if (
          kondisiUpper.includes("RUSAK") ||
          kondisiUpper.includes("BURUK")
        ) {
          kecamatanKondisi[kec].rusak++;
        } else if (
          kondisiUpper.includes("SEDANG") ||
          kondisiUpper.includes("CUKUP")
        ) {
          kecamatanKondisi[kec].sedang++;
        }
      });

      const labels = Object.keys(kecamatanKondisi);
      const baikData = labels.map((kec) => kecamatanKondisi[kec].baik);
      const sedangData = labels.map((kec) => kecamatanKondisi[kec].sedang);
      const rusakData = labels.map((kec) => kecamatanKondisi[kec].rusak);

      stackedChartInstance = new Chart(stackedChart.value, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Baik",
              data: baikData,
              backgroundColor: "rgba(34, 197, 94, 0.8)",
              borderColor: "rgba(34, 197, 94, 1)",
              borderWidth: 2,
            },
            {
              label: "Sedang",
              data: sedangData,
              backgroundColor: "rgba(251, 191, 36, 0.8)",
              borderColor: "rgba(251, 191, 36, 1)",
              borderWidth: 2,
            },
            {
              label: "Rusak",
              data: rusakData,
              backgroundColor: "rgba(239, 68, 68, 0.8)",
              borderColor: "rgba(239, 68, 68, 1)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 10,
              },
            },
          },
        },
      });
    }
  });
};

// Watch for tab changes
watch(activeTab, async (newTab) => {
  if (newTab === "users" && user.value?.role === "ADMIN") {
    await fetchUsers();
  } else if (newTab === "analisis") {
    // Initialize charts when switching to analisis tab
    setTimeout(() => {
      initCharts();
    }, 100);
  }
});

// Lifecycle
onMounted(async () => {
  // Check authentication
  token.value = localStorage.getItem("sijali_token");
  const userData = localStorage.getItem("sijali_user");

  if (!token.value) {
    router.push("/login");
    return;
  }

  if (userData) {
    user.value = JSON.parse(userData);
  }

  // Load data
  loading.value = true;
  await Promise.all([fetchStats(), fetchRoads(), fetchFilterOptions()]);

  if (user.value?.role === "ADMIN") {
    await fetchUsers();
  }

  loading.value = false;
});

// Cleanup charts on unmount
onUnmounted(() => {
  destroyCharts();
});
</script>

<style scoped>
/* Custom Scrollbar for Sidebar */
aside nav::-webkit-scrollbar {
  width: 6px;
}

aside nav::-webkit-scrollbar-track {
  background: transparent;
}

aside nav::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 3px;
}

aside nav::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}

/* Dark mode scrollbar */
.dark aside nav::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
}

.dark aside nav::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 0.7);
}

/* Firefox scrollbar */
aside nav {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
}

.dark aside nav {
  scrollbar-color: rgba(75, 85, 99, 0.5) transparent;
}

/* Table container scrollbar */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.5) rgba(243, 244, 246, 0.5);
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: rgba(243, 244, 246, 0.5);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}

/* Dark mode table scrollbar */
.dark .overflow-x-auto {
  scrollbar-color: rgba(59, 130, 246, 0.6) rgba(31, 41, 55, 0.5);
}

.dark .overflow-x-auto::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
}

.dark .overflow-x-auto::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.6);
}

.dark .overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.8);
}
</style>
