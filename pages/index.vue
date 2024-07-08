<script setup lang="ts">
const page = useCookie("calcreator-page");
const nonReactivePage = [...(page.value || "")].join(""); //useCookie 반응성 이슈

if (nonReactivePage) {
  if (nonReactivePage === "/") {
    await navigateTo("/main", { replace: true });
  } else {
    await navigateTo(nonReactivePage, { replace: true });
  }
} else {
  // await navigateTo("/main", { replace: true });
}

const title = "칼크리에이터";
const title2 = "calcreator.cc";
const desc = "계산기로 널리 이롭게";

useSeoMeta({
  title: `${title} ${title2}`,
  ogTitle: `${title} ${title2}`,
  description: desc,
  ogDescription: desc,
  twitterCard: "summary_large_image",
});

// defineOgImageComponent("LandingHero", { chip: "🔢🌍👍" });
</script>
<template>
  <div></div>
  <!-- <div class="absolute w-full h-full flex items-center justify-center">{{ counter }}</div> -->
</template>
