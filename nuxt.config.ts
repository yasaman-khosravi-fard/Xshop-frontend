// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000",
    },
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt", // ✅ this auto-registers the plugin
  ],
});
