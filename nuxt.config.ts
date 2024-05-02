// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-gtag"],
  colorMode: {
    preference: "light",
  },
  gtag: {
    id: "G-J865KNTNQZ",
  },
});
