// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      viewport: "width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0",
    },
  },
  css: ["@/assets/main.css"],
  modules: ["@nuxt/ui", "nuxt-gtag", "@vite-pwa/nuxt", "@nuxtjs/seo", "@nuxtjs/tailwindcss"],
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "-mode",
  },
  gtag: {
    id: "G-J865KNTNQZ",
  },
  pwa: {
    client: {
      installPrompt: "true",
    },
    includeAssets: ["favicon.ico", "apple-touch-icon.png"],
    manifest: {
      name: "calcreator",
      short_name: "calcreator",
      description: "Let's calculate!",
      display: "standalone",
      theme_color: "#fff",
      icons: [
        {
          src: "icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icon-192-maskable.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "icon-512-maskable.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },
  site: {
    url: "https://calcreator.cc",
    defaultLocale: "ko_KR",
  },
  ogImage: {
    defaults: { component: "OgImage" },
    fonts: ["Noto+Sans+KR:400", "Noto+Sans+KR:500", "Noto+Sans+KR:700", "Noto+Sans+KR:900"],
  },
});
