<template>
  <nav
    class="fixed top-0 left-0 right-0 bg-slate-900/40 backdrop-blur-lg text-white shadow-xl border-b border-white/10 z-[9999] transition-all duration-300"
  >
    <div class="flex items-center justify-center max-w-full px-8 h-16 relative">
      <!-- Brand -->
      <div class="flex items-center space-x-2 absolute left-8">
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
          @click.prevent="scrollToSection('hero')"
          href="javascript:void(0)"
          :class="[
            'transition-all duration-300 cursor-pointer px-4 py-2 rounded-lg font-medium',
            activeSection === 'hero'
              ? 'text-white bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg'
              : 'text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:border hover:border-white/20',
          ]"
        >
          Beranda
        </a>
        <a
          @click.prevent="scrollToSection('map')"
          href="javascript:void(0)"
          :class="[
            'transition-all duration-300 cursor-pointer px-4 py-2 rounded-lg font-medium',
            activeSection === 'map'
              ? 'text-white bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg'
              : 'text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:border hover:border-white/20',
          ]"
        >
          Peta Interaktif
        </a>
        <a
          @click.prevent="scrollToSection('analisis')"
          href="javascript:void(0)"
          :class="[
            'transition-all duration-300 cursor-pointer px-4 py-2 rounded-lg font-medium',
            activeSection === 'analisis'
              ? 'text-white bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg'
              : 'text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:border hover:border-white/20',
          ]"
        >
          Analisis
        </a>
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
import { useAuth } from "~/composables/useAuth";
import LoginModal from "./LoginModal.vue";

// Define emits
const emit = defineEmits(["toggle-sidebar", "go-back-to-rtr"]);

const { isAuthenticated, getUserName, getUserRole, login, logout, initAuth } =
  useAuth();

// Local state
const showLoginModal = ref(false);
const showUserMenu = ref(false);
const activeSection = ref("hero");

// Handler for section change event
const handleSectionChange = (event) => {
  activeSection.value = event.detail.activeSection;
};

// Initialize auth on mount
onMounted(() => {
  initAuth();

  // Listen for section changes from scroll detection
  window.addEventListener("section-change", handleSectionChange);
});

// Remove event listener on unmount
onUnmounted(() => {
  window.removeEventListener("section-change", handleSectionChange);
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

// Scroll to section with offset
const scrollToSection = (sectionId) => {
  // Update active section immediately
  activeSection.value = sectionId;

  // Get target element
  const element = document.getElementById(sectionId);
  if (!element) return;

  // Calculate scroll position with navbar offset
  const navbarHeight = 50;
  const elementPosition = element.offsetTop;
  const offsetPosition = elementPosition - navbarHeight;

  // Scroll to position
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
</script>
