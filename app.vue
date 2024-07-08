<script setup lang="ts">
useHead({
  titleTemplate: "%s",
  meta: [
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
  ],
  link: [
    {
      rel: "apple-touch-startup-image",
      href: "/splashscreens/iphone5_splash.png",
      media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
    },
    {
      rel: "apple-touch-startup-image",
      href: "/splashscreens/iphone6_splash.png",
      media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
    },
    {
      rel: "apple-touch-startup-image",
      href: "/splashscreens/iphoneplus_splash.png",
      media: "(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)",
    },
    {
      rel: "apple-touch-startup-image",
      href: "/splashscreens/iphonex_splash.png",
      media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
    },
    {
      rel: "apple-touch-startup-image",
      href: "/splashscreens/iphonexr_splash.png",
      media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)",
    },
    {
      rel: "apple-touch-startup-image",
      href: "/splashscreens/iphonexsmax_splash.png",
      media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)",
    },
    {
      rel: "apple-touch-startup-image",
      href: "/splashscreens/ipad_splash.png",
      media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
    },
    {
      rel: "apple-touch-startup-image",
      href: "/splashscreens/ipadpro1_splash.png",
      media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)",
    },
    {
      rel: "apple-touch-startup-image",
      href: "/splashscreens/ipadpro3_splash.png",
      media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)",
    },
    {
      rel: "apple-touch-startup-image",
      href: "/splashscreens/ipadpro2_splash.png",
      media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
    },
  ],
});

const route = useRoute();
const page = useCookie("calcreator-page", {
  maxAge: 60 * 60 * 24 * 7 * 4, // 4주 유효 기간
});

onMounted(() => {
  const memoryLastPage = () => (page.value = route.path);
  window.addEventListener("beforeunload", memoryLastPage);
  window.addEventListener("visibilitychange", memoryLastPage);
  if (document.visibilityState === "hidden") memoryLastPage();
});
</script>
<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 300;
  src: url("/assets/fonts/NotoSansKR-Light.woff") format("woff");
  font-display: swap;
}

@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  src: url("/assets/fonts/NotoSansKR-Regular.woff") format("woff");
  font-display: swap;
}

@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  src: url("/assets/fonts/NotoSansKR-Medium.woff") format("woff");
  font-display: swap;
}

@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  src: url("/assets/fonts/NotoSansKR-Bold.woff") format("woff");
  font-display: swap;
}

@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  src: url("/assets/fonts/NotoSansKR-Black.woff") format("woff");
  font-display: swap;
}

html {
  touch-action: manipulation;
}

body {
  font-family: "Noto Sans KR", sans-serif;
}

.floating {
  animation: float 1.5s infinite ease-in-out;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(-0.1em);
  }

  50% {
    transform: translateY(0.1em);
  }
}
</style>
