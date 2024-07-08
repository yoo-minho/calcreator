<script setup lang="ts">
const page = useCookie("calcreator-page");
if (page.value && page.value === "/") {
  await navigateTo("/main", { replace: true });
} else {
  await navigateTo(page.value, { replace: true, redirectCode: 301 });
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

defineOgImageComponent("LandingHero", { chip: "🔢🌍👍" });
</script>
<template>
  <div></div>
</template>
