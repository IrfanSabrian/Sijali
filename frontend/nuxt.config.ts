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
          rel: "stylesheet",
          href: "https://js.arcgis.com/4.28/esri/themes/light/main.css",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      arcgisApiKey: "your-api-key-here",
      apiBaseUrl: "http://localhost:3001",
      apiUrl: "http://localhost:3001/api",
    },
  },
});
