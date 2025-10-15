<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
      Daftar Aduan Jalan
    </h2>

    <!-- Filter Status -->
    <div class="mb-4 flex items-center gap-2">
      <label class="text-sm text-gray-600 dark:text-gray-300">Filter:</label>
      <select
        v-model="selectedStatus"
        @change="loadAduan"
        class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
        <option value="">Semua Status</option>
        <option value="diajukan">Diajukan</option>
        <option value="ditinjau">Ditinjau</option>
        <option value="selesai">Selesai</option>
        <option value="ditolak">Ditolak</option>
      </select>
      <button
        @click="loadAduan"
        class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Refresh
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
      ></div>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Memuat data...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded p-4 text-red-800 dark:text-red-200"
    >
      {{ error }}
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead
          class="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        >
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Nomor Ruas</th>
            <th class="px-4 py-3">Pelapor</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Tanggal</th>
            <th class="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="aduan in aduanList"
            :key="aduan.id"
            class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="px-4 py-3">{{ aduan.id }}</td>
            <td class="px-4 py-3 font-medium">{{ aduan.nomor_ruas }}</td>
            <td class="px-4 py-3">
              {{ aduan.nama_pelapor || (aduan.anonim ? "Anonim" : "-") }}
            </td>
            <td class="px-4 py-3">{{ aduan.email || "-" }}</td>
            <td class="px-4 py-3">
              <span
                :class="getStatusClass(aduan.status)"
                class="px-2 py-1 rounded text-xs font-semibold"
              >
                {{ getStatusLabel(aduan.status) }}
              </span>
            </td>
            <td class="px-4 py-3">
              {{ formatDate(aduan.created_at) }}
            </td>
            <td class="px-4 py-3">
              <button
                @click="openDetail(aduan)"
                class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Detail
              </button>
            </td>
          </tr>
          <tr v-if="aduanList.length === 0">
            <td colspan="7" class="px-4 py-8 text-center text-gray-500">
              Tidak ada data aduan
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      v-if="pagination && pagination.totalPages > 1"
      class="mt-4 flex items-center justify-between"
    >
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Halaman {{ pagination.page }} dari {{ pagination.totalPages }} (Total:
        {{ pagination.total }})
      </div>
      <div class="flex gap-2">
        <button
          @click="changePage(pagination.page - 1)"
          :disabled="pagination.page <= 1"
          class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          @click="changePage(pagination.page + 1)"
          :disabled="pagination.page >= pagination.totalPages"
          class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Detail Modal -->
    <AduanDetailModal
      :visible="detailModalVisible"
      :aduan="selectedAduan"
      @close="detailModalVisible = false"
      @updated="handleAduanUpdated"
    />
  </div>

  <!-- Toast Notifications -->
  <Toast />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useApiService } from "~/composables/useApiService";
import { useToast } from "~/composables/useToast";
import Toast from "./Toast.vue";
import AduanDetailModal from "./AduanDetailModal.vue";

const { fetchAduan, updateAduanStatus } = useApiService();
const toast = useToast();

const aduanList = ref([]);
const pagination = ref(null);
const loading = ref(false);
const error = ref(null);
const selectedStatus = ref("");
const currentPage = ref(1);

const detailModalVisible = ref(false);
const selectedAduan = ref(null);

const loadAduan = async () => {
  loading.value = true;
  error.value = null;
  try {
    const params = {
      page: currentPage.value,
      limit: 20,
    };
    if (selectedStatus.value) {
      params.status = selectedStatus.value;
    }
    const result = await fetchAduan(params);

    if (result.success) {
      aduanList.value = result.data;
      pagination.value = result.pagination;
    } else {
      error.value = result.error;
    }
  } catch (e) {
    error.value = e.message || "Terjadi kesalahan";
  } finally {
    loading.value = false;
  }
};

const changePage = (page) => {
  currentPage.value = page;
  loadAduan();
};

const openDetail = (aduan) => {
  selectedAduan.value = aduan;
  detailModalVisible.value = true;
};

const handleAduanUpdated = async () => {
  await loadAduan();
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
    diajukan: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    ditinjau:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    selesai:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    ditolak: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  return map[status] || "bg-gray-100 text-gray-800";
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";

  try {
    // Handle PostgreSQL timestamp format: "2025-10-15 13:00:11.656273+07"
    const d = new Date(dateStr);

    if (isNaN(d.getTime())) {
      return "-";
    }

    return d.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "-";
  }
};

onMounted(() => {
  loadAduan();
});
</script>

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
