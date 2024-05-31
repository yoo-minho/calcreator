// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/main.css"],
  modules: ["@nuxt/ui", "nuxt-gtag", "@vite-pwa/nuxt", "@nuxtjs/seo"],
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
    name: "calcreator 계산기크리에이터",
    description: "그거 계산해보면 좋겠다",
    defaultLocale: "ko_KR",
  },
  ogImage: {
    defaults: { component: "OgImage" },
    fonts: ["Noto+Sans+KR:400", "Noto+Sans+KR:500", "Noto+Sans+KR:700", "Noto+Sans+KR:900"],
  },
});
