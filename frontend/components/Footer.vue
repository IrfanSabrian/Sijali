<template>
  <footer
    class="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="h-9 w-9">
            <img
              src="/assets/images/sijali-logo.svg"
              alt="SIJALI Logo"
              class="h-9 w-9 object-contain"
            />
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
              SIJALI Kab. Kubu Raya
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Sistem Informasi Jalan Lingkungan - Kabupaten Kubu Raya
            </p>
          </div>
        </div>

        <nav class="flex items-center gap-6 text-sm">
          <a
            href="#hero"
            class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >Beranda</a
          >
          <a
            href="#map"
            class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >Peta</a
          >
          <a
            href="#analisis"
            class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >Analisis</a
          >
          <a
            href="#laporan"
            class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >Laporan</a
          >
        </nav>
      </div>

      <div
        class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p class="text-xs text-gray-500 dark:text-gray-400">
          &copy; {{ currentYear }} SIJALI. Semua hak dilindungi.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped></style>
