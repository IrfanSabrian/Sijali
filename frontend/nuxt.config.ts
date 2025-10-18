// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  devServer: {
    port: 3000,
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://localhost:3001/api",
        changeOrigin: true,
      },
    },
  },
  app: {
    head: {
      title: "SIJALI Kab. Kubu Raya",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Sistem Informasi Jalan Lingkungan Kab. Kubu Raya",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/sijali-logo.svg",
        },
        {
          rel: "stylesheet",
          href: "https://js.arcgis.com/4.28/esri/themes/light/main.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js",
          defer: true,
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      arcgisApiKey: process.env.NUXT_PUBLIC_ARCGIS_API_KEY || "your-api-key-here",
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "https://sijali-production.up.railway.app",
      apiUrl: process.env.NUXT_PUBLIC_API_URL || "https://sijali-production.up.railway.app/api",
      appName: process.env.NUXT_PUBLIC_APP_NAME || "SIJALI",
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION || "1.0.0",
      appDescription: process.env.NUXT_PUBLIC_APP_DESCRIPTION || "Sistem Informasi Jalan Lingkungan Kab. Kubu Raya",
      mapCenterLat: parseFloat(process.env.NUXT_PUBLIC_MAP_CENTER_LAT || "-0.5"),
      mapCenterLng: parseFloat(process.env.NUXT_PUBLIC_MAP_CENTER_LNG || "109.3"),
      mapZoom: parseInt(process.env.NUXT_PUBLIC_MAP_ZOOM || "10"),
      cloudinaryCloudName: process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your_cloud_name",
      cloudinaryFolder: process.env.NUXT_PUBLIC_CLOUDINARY_FOLDER || "SIJALI",
    },
  },
});
