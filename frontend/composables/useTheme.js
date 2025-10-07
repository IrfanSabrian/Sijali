import { ref, onMounted } from "vue";

export const useTheme = () => {
  const isDark = ref(false);

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const updateTheme = () => {
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  };

  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      isDark.value = savedTheme === "dark" || (!savedTheme && prefersDark);
      updateTheme();
    }
  };

  onMounted(() => {
    initTheme();
  });

  return {
    isDark,
    toggleTheme,
  };
};
