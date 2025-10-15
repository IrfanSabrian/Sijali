<template>
  <div class="min-h-screen flex flex-col">
    <NuxtPage />
    <Footer v-if="!isDashboard" />
  </div>
</template>

<script setup>
// Root app component
import Footer from "~/components/Footer.vue";

const route = useRoute();
const isDashboard = computed(() => route.path === "/dashboard");
</script>

<style>
/* Global styles are imported via nuxt.config.ts */
</style>
