<template>
  <nav
    class="bg-primary-500 text-white shadow-lg sticky top-0 z-50 transition-colors duration-300"
  >
    <div class="flex items-center justify-between max-w-full px-6 h-16">
      <!-- Brand -->
      <div class="flex items-center space-x-3">
        <div
          class="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold">SIJALI</h1>
          <p class="text-xs text-white/80">Sistem Informasi Jalan Lingkungan</p>
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="hidden lg:flex items-center space-x-8">
        <a
          href="#"
          class="text-white/90 hover:text-white border-b-2 border-white/50 pb-1 transition-colors"
        >
          Peta Interaktif
        </a>
        <a href="#" class="text-white/70 hover:text-white transition-colors">
          Data Jalan
        </a>
        <a href="#" class="text-white/70 hover:text-white transition-colors">
          Analisis
        </a>
        <a href="#" class="text-white/70 hover:text-white transition-colors">
          Laporan
        </a>
      </div>

      <!-- Actions -->
      <div class="flex items-center space-x-2">
        <!-- Sidebar Toggle Button -->
        <button
          @click="toggleSidebar"
          class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          title="Toggle Sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>

        <!-- User Info (when logged in) -->
        <div v-if="isAuthenticated" class="flex items-center space-x-3">
          <div class="text-right hidden sm:block">
            <div class="text-sm font-medium text-white">
              {{ getUserName }}
            </div>
            <div class="text-xs text-white/70">
              {{ getUserRole }}
            </div>
          </div>
          <div class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {{ getUserName.charAt(0).toUpperCase() }}
            </button>
            <!-- User Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            >
              <div class="p-3 border-b border-gray-200 dark:border-gray-700">
                <div
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ getUserName }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ getUserRole }}
                </div>
              </div>
              <div class="py-1">
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Login Button (when not logged in) -->
        <button
          v-else
          @click="showLoginModal = true"
          class="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
        >
          Login
        </button>

        <!-- Back to RTR Button -->
        <button
          @click="goBackToRTR"
          class="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
            />
          </svg>
          <span>KEMBALI KE RTR</span>
        </button>

        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <svg
            v-if="isDark"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
            />
          </svg>
          <svg
            v-else
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            />
          </svg>
        </button>

        <!-- Menu Button (Mobile) -->
        <button
          class="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal
      :showModal="showLoginModal"
      @login-success="handleLoginSuccess"
      @close="showLoginModal = false"
    />
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTheme } from "~/composables/useTheme";
import { useAuth } from "~/composables/useAuth";
import LoginModal from "./LoginModal.vue";

// Define emits
const emit = defineEmits(["toggle-sidebar", "go-back-to-rtr"]);

const { isDark, toggleTheme } = useTheme();
const { isAuthenticated, getUserName, getUserRole, login, logout, initAuth } =
  useAuth();

// Local state
const showLoginModal = ref(false);
const showUserMenu = ref(false);

// Initialize auth on mount
onMounted(() => {
  initAuth();
});

// Handle login success
const handleLoginSuccess = (userData) => {
  login(userData);
  showLoginModal.value = false;
  showUserMenu.value = false;
};

// Handle logout
const handleLogout = () => {
  logout();
  showUserMenu.value = false;
};

// Toggle sidebar
const toggleSidebar = () => {
  // Emit event to parent component to toggle sidebar
  emit("toggle-sidebar");
};

// Go back to RTR
const goBackToRTR = () => {
  // Navigate back to RTR page or emit event
  emit("go-back-to-rtr");
};

// Close user menu when clicking outside
const closeUserMenu = () => {
  showUserMenu.value = false;
};
</script>
