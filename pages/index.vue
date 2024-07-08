<script setup lang="ts">
import { delay } from "~/util/CommUtil";

const counter = ref(3);

onMounted(async () => {
  // counter.value--;
  // await delay(1000);
  // counter.value--;
  // await delay(1000);
  // counter.value--;

  const page = useCookie("calcreator-page");
  if (page.value) {
    if (page.value === "/") {
      await navigateTo("/main", { replace: true });
    } else {
      await navigateTo(page.value, { replace: true });
    }
  } else {
    await navigateTo("/main", { replace: true });
  }
});

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
