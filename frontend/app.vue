<template>
  <div class="min-h-screen flex flex-col">
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
// Root app component
import Footer from "~/components/Footer.vue";
</script>

<style>
/* Global styles are imported via nuxt.config.ts */
</style>
