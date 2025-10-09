<template>
  <nav
    class="bg-gradient-to-r from-slate-800 to-blue-900 text-white shadow-lg sticky top-0 z-[9999] transition-colors duration-300"
  >
    <div class="flex items-center justify-between max-w-full px-8 h-16">
      <!-- Brand -->
      <div class="flex items-center space-x-2">
        <div class="flex items-center justify-center w-16 h-16">
          <img
            src="/assets/images/sijali-logo.svg"
            alt="SIJALI Logo"
            class="w-full h-full object-contain"
          />
        </div>
        <div>
          <h1 class="text-xl font-bold">SIJALI</h1>
          <p class="text-xs text-white/80">Sistem Informasi Jalan Lingkungan</p>
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="hidden lg:flex items-center space-x-8">
        <a
          @click="scrollToSection('hero')"
          href="#"
          :class="[
            'transition-colors cursor-pointer px-3 py-2 rounded-lg',
            activeSection === 'hero'
              ? 'text-white bg-white/20 border border-white/30'
              : 'text-white/70 hover:text-white hover:bg-white/10',
          ]"
        >
          Beranda
        </a>
        <a
          @click="scrollToSection('map')"
          href="#"
          :class="[
            'transition-colors cursor-pointer px-3 py-2 rounded-lg',
            activeSection === 'map'
              ? 'text-white bg-white/20 border border-white/30'
              : 'text-white/70 hover:text-white hover:bg-white/10',
          ]"
        >
          Peta Interaktif
        </a>
        <a
          @click="scrollToSection('analisis')"
          href="#"
          :class="[
            'transition-colors cursor-pointer px-3 py-2 rounded-lg',
            activeSection === 'analisis'
              ? 'text-white bg-white/20 border border-white/30'
              : 'text-white/70 hover:text-white hover:bg-white/10',
          ]"
        >
          Analisis
        </a>
        <a
          @click="scrollToSection('laporan')"
          href="#"
          :class="[
            'transition-colors cursor-pointer px-3 py-2 rounded-lg',
            activeSection === 'laporan'
              ? 'text-white bg-white/20 border border-white/30'
              : 'text-white/70 hover:text-white hover:bg-white/10',
          ]"
        >
          Laporan
        </a>
      </div>

      <!-- Actions -->
      <div class="flex items-center">
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
import { ref, onMounted, onUnmounted } from "vue";
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
const activeSection = ref("hero");

// Initialize auth on mount
onMounted(() => {
  initAuth();

  // Listen for section changes from scroll detection
  window.addEventListener("section-change", (event) => {
    activeSection.value = event.detail.activeSection;
  });
});

// Remove event listener on unmount
onUnmounted(() => {
  window.removeEventListener("section-change", (event) => {
    activeSection.value = event.detail.activeSection;
  });
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

// Scroll to section function
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    activeSection.value = sectionId;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
</script>
