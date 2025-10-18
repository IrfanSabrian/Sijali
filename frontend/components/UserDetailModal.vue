<template>
  <transition name="fade">
    <div
      v-if="visible"
      @click="closeModal"
      class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-2 lg:p-4"
    >
      <div
        @click.stop
        class="w-full max-w-4xl h-[95vh] lg:h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
      >
        <!-- Header -->
        <div
          class="bg-purple-600 text-white px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between"
        >
          <h3 class="text-lg lg:text-xl font-bold">
            {{ isEditMode ? "Edit User" : "Tambah User Baru" }}
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
        <div class="flex-1 flex flex-col overflow-hidden">
          <div class="flex-1 p-4 lg:p-6 overflow-y-auto">
            <div class="space-y-6">
              <!-- User Form -->
              <form @submit.prevent="saveUser" class="space-y-6">
                <!-- Basic Info Section -->
                <div>
                  <h4
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                  >
                    Informasi Dasar
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Username *
                      </label>
                      <input
                        v-model="userForm.username"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Masukkan username"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email (opsional)
                      </label>
                      <input
                        v-model="userForm.email"
                        type="email"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Masukkan email (opsional)"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Password
                        {{ isEditMode ? "(kosongkan jika tidak diubah)" : "*" }}
                      </label>
                      <input
                        v-model="userForm.password"
                        type="password"
                        :required="!isEditMode"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        :placeholder="
                          isEditMode
                            ? 'Kosongkan jika tidak ingin mengubah password'
                            : 'Masukkan password (minimal 6 karakter)'
                        "
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Role *
                      </label>
                      <select
                        v-model="userForm.role"
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Additional Info Section -->
                <div v-if="isEditMode && user">
                  <h4
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                  >
                    Informasi Tambahan
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        ID User
                      </label>
                      <p
                        class="text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg"
                      >
                        {{ user.id }}
                      </p>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Status
                      </label>
                      <span
                        :class="[
                          'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                          user.role === 'ADMIN'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                        ]"
                      >
                        {{ user.role || "USER" }}
                      </span>
                    </div>
                    <div v-if="user.createdAt">
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Dibuat
                      </label>
                      <p class="text-gray-900 dark:text-white">
                        {{ formatDate(user.createdAt) }}
                      </p>
                    </div>
                    <div v-if="user.updatedAt">
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Diperbarui
                      </label>
                      <p class="text-gray-900 dark:text-white">
                        {{ formatDate(user.updatedAt) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div
                  class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <button
                    type="button"
                    @click="closeModal"
                    class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    :disabled="saving"
                    class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2"
                  >
                    <svg
                      v-if="saving"
                      class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {{
                      saving
                        ? "Menyimpan..."
                        : isEditMode
                        ? "Simpan Perubahan"
                        : "Tambah User"
                    }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
    default: null,
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "save"]);

// Form state
const userForm = ref({
  username: "",
  email: "",
  password: "",
  role: "USER",
});

const saving = ref(false);

// Computed
const isEditMode = computed(() => props.isEditMode);

// Methods
const closeModal = () => {
  emit("close");
};

const saveUser = async () => {
  saving.value = true;
  try {
    emit("save", { ...userForm.value });
  } finally {
    saving.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Watch for visible changes to reset/populate form when opening
watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible) {
      if (props.isEditMode && props.user) {
        // Edit mode - populate with user data
        userForm.value = {
          username: props.user.username || "",
          email: props.user.email || "",
          password: "",
          role: props.user.role || "USER",
        };
      } else {
        // Add mode - always reset form to empty
        userForm.value = {
          username: "",
          email: "",
          password: "",
          role: "USER",
        };
      }
    }
  }
);
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
