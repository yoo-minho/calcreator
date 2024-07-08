import { _padding } from "#tailwind-config/theme";
import { version } from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,

  app: {
    head: {
      viewport: "width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0",
    },
  },

  css: ["@/assets/main.css"],

  modules: [
    "@nuxt/ui",
    "nuxt-gtag",
    "@vite-pwa/nuxt",
    "@nuxtjs/seo",
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxt/image",
  ],

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "-mode",
  },

  ui: {
    icons: ["ph", "solar", "emojione", "mingcute", "fluent-emoji-flat"],
  },

  gtag: {
    id: "G-J865KNTNQZ",
  },

  nitro: {
    routeRules: {
      "/api/**": {
        cors: true,
        headers: {
          "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      },
    },
  },

  pwa: {
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
      globIgnores: ["**/node_modules/**/*", "sw.js", "workbox-*.js"],
      cacheId: `calcreator-${version}`,
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|woff|ico)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "asset-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30일
            },
          },
        },
        {
          urlPattern: "https://calcreator.cc/api/currency/.*",
          handler: "CacheFirst",
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24, // 1일
            },
          },
        },
        {
          urlPattern: "https://calcreator.cc/.*",
          handler: "NetworkFirst",
          options: {
            cacheName: "domain-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7일
            },
            networkTimeoutSeconds: 3,
          },
        },
      ],
    },
    client: {
      installPrompt: "true",
    },
    includeAssets: ["favicon.ico", "apple-touch-icon.png"],
    manifest: {
      name: "calcreator",
      short_name: "calcreator",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
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
    defaultLocale: "ko",
  },

  ignore: ["pages/**/components/**/*", "pages/**/data/**/*"],

  sitemap: {
    xsl: false,
    exclude: ["/*/components/**", "/*/data/**"],
  },

  ogImage: {
    defaults: { component: "OgImage" },
    fonts: ["Noto+Sans+KR:400", "Noto+Sans+KR:500", "Noto+Sans+KR:700", "Noto+Sans+KR:900"],
  },

  compatibilityDate: "2024-07-07",
});
