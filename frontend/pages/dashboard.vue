<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
  >
    <!-- Navbar -->
    <nav
      class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo & Title -->
          <div class="flex items-center space-x-3">
            <img
              src="~/assets/images/sijali-logo.svg"
              alt="SIJALI Logo"
              class="h-10 w-10 animate-pulse"
            />
            <div>
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
          <div class="flex items-center space-x-4">
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
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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
      <div class="px-4 sm:px-0">
        <!-- Welcome Card -->
        <div
          class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 mb-6 text-white transform hover:scale-[1.01] transition-transform duration-200"
        >
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl font-bold mb-2">
                Selamat Datang, {{ user?.username || "User" }}! 👋
              </h2>
              <p class="text-blue-100">
                Anda login sebagai
                <span class="font-bold">{{ user?.role || "USER" }}</span>
              </p>
            </div>
            <div class="hidden md:block">
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
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div
            v-for="i in 3"
            :key="i"
            class="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 h-32"
          ></div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
              {{ getPercentage(conditionStats.rusak, stats.totalRoads) }}% dari
              total
            </p>
          </div>
        </div>

        <!-- Tabs Navigation -->
        <div
          class="bg-white dark:bg-gray-800 rounded-t-xl shadow-lg overflow-hidden"
        >
          <div class="border-b border-gray-200 dark:border-gray-700">
            <nav class="flex -mb-px">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'flex-1 py-4 px-6 text-center font-medium text-sm transition-all duration-200',
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50',
                ]"
              >
                <div class="flex items-center justify-center space-x-2">
                  <span>{{ tab.label }}</span>
                </div>
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <!-- Data Jalan Tab -->
            <div v-show="activeTab === 'jalan'" class="space-y-6">
              <!-- Search and Filter -->
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
                  <option v-for="kec in kecamatanList" :key="kec" :value="kec">
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
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        No
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Nama Jalan
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Kecamatan
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Desa
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Panjang (m)
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Kondisi
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
                    <tr v-if="loadingRoads">
                      <td
                        colspan="7"
                        class="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center justify-center space-x-2">
                          <div
                            class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"
                          ></div>
                          <span>Memuat data...</span>
                        </div>
                      </td>
                    </tr>
                    <tr v-else-if="filteredRoads.length === 0">
                      <td
                        colspan="7"
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
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                      >
                        {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                      </td>
                      <td
                        class="px-6 py-4 text-sm text-gray-900 dark:text-gray-300"
                      >
                        {{ road.namaJalan || road.nama || "-" }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                      >
                        {{ road.kecamatan || "-" }}
                      </td>
                      <td
                        class="px-6 py-4 text-sm text-gray-900 dark:text-gray-300"
                      >
                        {{ road.desa || "-" }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                      >
                        {{ road.panjangM?.toFixed(2) || "-" }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span
                          :class="
                            getKondisiBadge(road.kondisi || road.keterangan)
                          "
                          class="px-2 py-1 text-xs font-semibold rounded-full"
                        >
                          {{ road.kondisi || road.keterangan || "-" }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
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

            <!-- User Management Tab (Admin Only) -->
            <div
              v-show="activeTab === 'users' && user?.role === 'ADMIN'"
              class="space-y-6"
            >
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                  Manajemen User
                </h3>
                <button
                  @click="showAddUserModal = true"
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
                        <div class="flex items-center justify-center space-x-2">
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
                      <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
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
        </div>
      </div>
    </main>

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
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {{ showAddUserModal ? "Tambah User" : "Edit User" }}
              </h3>
              <form @submit.prevent="saveUser" class="space-y-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Username *</label
                  >
                  <input
                    v-model="userForm.username"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
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
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
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
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
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
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
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
import { ref, computed, onMounted } from "vue";
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
const config = useRuntimeConfig();
const API_BASE = config.public.apiBaseUrl || "http://localhost:3001";

// User state
const user = ref(null);
const token = ref(null);

// UI State
const activeTab = ref("jalan");
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

// Tab icons (as SVG strings for simplicity)
const tabs = computed(() => {
  const allTabs = [
    {
      id: "jalan",
      label: "Data Jalan",
      icon: "svg",
    },
  ];

  if (user.value?.role === "ADMIN") {
    allTabs.push({
      id: "users",
      label: "Manajemen User",
      icon: "svg",
    });
  }

  return allTabs;
});

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
  if (user.value?.role !== "ADMIN") return;

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
  editingUserId.value = userItem.id;
  userForm.value = {
    username: userItem.username,
    email: userItem.email || "",
    password: "",
    role: userItem.role,
  };
  showEditUserModal.value = true;
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

const closeUserModal = () => {
  showAddUserModal.value = false;
  showEditUserModal.value = false;
  editingUserId.value = null;
  userForm.value = {
    username: "",
    email: "",
    password: "",
    role: "USER",
  };
};

const handleLogout = () => {
  localStorage.removeItem("sijali_token");
  localStorage.removeItem("sijali_user");
  router.push("/login");
};

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
</script>

<style scoped>
/* Add any custom styles here */
</style>
