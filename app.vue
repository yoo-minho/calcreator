<script setup lang="ts">
useHead({
  titleTemplate: "%s",
});

const route = useRoute();
const page = useCookie("calcreator-page");
if (route.path === "/" && page.value && page.value !== "/") {
  navigateTo(page.value, { replace: true });
}

onMounted(() => {
  const memoryLastPage = () => {
    page.value = route.path;
  };

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
  animation: float 1.5s infinite ease-in-out; /* float 애니메이션 적용 */
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
