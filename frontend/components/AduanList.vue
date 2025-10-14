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

    <!-- Modal Detail -->
    <transition name="fade">
      <div
        v-if="detailModalVisible"
        @click="detailModalVisible = false"
        class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      >
        <div
          @click.stop
          class="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div
            class="bg-blue-600 text-white px-4 py-3 flex items-center justify-between"
          >
            <h3 class="font-bold">
              Detail Aduan #{{ selectedAduan?.id }} - Ruas
              {{ selectedAduan?.nomor_ruas }}
            </h3>
            <button
              @click="detailModalVisible = false"
              class="text-white hover:text-gray-200 transition-colors"
            >
              <svg
                width="20"
                height="20"
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
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm text-gray-600 dark:text-gray-300"
                  >Pelapor</label
                >
                <p class="text-gray-900 dark:text-white font-medium">
                  {{
                    selectedAduan?.nama_pelapor ||
                    (selectedAduan?.anonim ? "Anonim" : "-")
                  }}
                </p>
              </div>
              <div>
                <label class="text-sm text-gray-600 dark:text-gray-300"
                  >Email</label
                >
                <p class="text-gray-900 dark:text-white font-medium">
                  {{ selectedAduan?.email || "-" }}
                </p>
              </div>
            </div>
            <div>
              <label class="text-sm text-gray-600 dark:text-gray-300"
                >Keterangan</label
              >
              <p class="text-gray-900 dark:text-white">
                {{ selectedAduan?.description || "-" }}
              </p>
            </div>
            <div v-if="selectedAduan?.photos && selectedAduan.photos.length">
              <label class="text-sm text-gray-600 dark:text-gray-300"
                >Foto ({{ selectedAduan.photos.length }})</label
              >
              <div class="grid grid-cols-3 gap-2 mt-2">
                <img
                  v-for="(photo, idx) in selectedAduan.photos"
                  :key="idx"
                  :src="`/aduan/${selectedAduan.nomor_ruas}/${photo}`"
                  :alt="`Foto ${idx + 1}`"
                  class="w-full h-24 object-cover rounded border border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            <!-- Ubah Status -->
            <div
              class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <label class="block text-sm text-gray-600 dark:text-gray-300 mb-2"
                >Ubah Status</label
              >
              <div class="flex gap-2">
                <select
                  v-model="newStatus"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  {{ updateLoading ? "..." : "Update" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

  <!-- Toast Notifications -->
  <Toast />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useApiService } from "~/composables/useApiService";
import { useToast } from "~/composables/useToast";
import Toast from "./Toast.vue";

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
const newStatus = ref("");
const updateLoading = ref(false);

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
  newStatus.value = aduan.status;
  detailModalVisible.value = true;
};

const updateStatus = async () => {
  if (!selectedAduan.value || !newStatus.value) return;
  updateLoading.value = true;
  try {
    const result = await updateAduanStatus(selectedAduan.value.id, {
      status: newStatus.value,
    });
    if (result.success) {
      toast.success(
        `Status berhasil diupdate menjadi "${getStatusLabel(
          newStatus.value
        )}"! Email notifikasi telah dikirim.`,
        5000
      );
      detailModalVisible.value = false;
      await loadAduan();
    } else {
      toast.error("Gagal update status: " + result.error);
    }
  } catch (e) {
    toast.error("Gagal update status: " + e.message);
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
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
