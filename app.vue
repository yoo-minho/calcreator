<script setup lang="ts">
useHead({
  titleTemplate: "%s",
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
}

@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  src: url("/assets/fonts/NotoSansKR-Regular.woff") format("woff");
}

@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  src: url("/assets/fonts/NotoSansKR-Medium.woff") format("woff");
}

@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  src: url("/assets/fonts/NotoSansKR-Bold.woff") format("woff");
}

@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  src: url("/assets/fonts/NotoSansKR-Black.woff") format("woff");
}

body {
  font-family: "Noto Sans KR", sans-serif;
}
</style>
