// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  app: {
    head: {
      title: "SIJALI Web GIS",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Sistem Informasi Jalan Lingkungan Web GIS",
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
    },
  },
});
