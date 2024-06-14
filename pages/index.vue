<script setup lang="ts">
useColorMode().preference = "white";
useAppConfig().ui.primary = "violet";

const arr = [
  { title: "해외여행용 환율계산기", icon: "solar-dollar-linear", to: "/global-money" },
  { title: "Micro SaaS 고객 계산기", icon: "heroicons-presentation-chart-bar", to: "/micro-saas" },
  { title: "인프런 수익 계산기", icon: "ph-user-circle-check-light", to: "/inf" },
  { title: "중위소득 · 월평균소득 계산기", icon: "heroicons-presentation-chart-bar", to: "/income" },
];

const title = "calcreator.cc";
const desc = "계산기로 널리 이롭게";

useSeoMeta({
  title: title,
  ogTitle: title,
  description: desc,
  ogDescription: desc,
  twitterCard: "summary_large_image",
});

defineOgImageComponent("LandingHero", { chip: "🔢🌍👍" });
</script>

<template>
  <div>
    <LandingHero>
      <span class="text-base font-light">"{{ desc }}"</span>
      <div class="flex items-end justify-center gap-3">
        <img src="/icon-192.png" width="48" height="48" />
        <span class="tracking-tighter text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-600">
          {{ title }}
        </span>
      </div>
    </LandingHero>
    <div class="flex gap-2 mb-3 justify-center">
      <UButton
        class="bg-gradient-to-tl from-blue-500 to-violet-600"
        color="black"
        to="https://naver.me/Gpfd5bxD"
        target="form"
      >
        제안하기
      </UButton>
      <UButton color="black" to="https://uminoh.tistory.com/" target="blog"> 크리에이터 소개 </UButton>
    </div>
    <UDivider class="mb-3" />
    <template v-for="v in arr">
      <UButton class="w-full" color="black" variant="ghost" size="xl" :to="v.to" square>
        <div class="flex gap-2 justify-between w-full items-center">
          <UButton color="gray" class="p-1">
            <UIcon :name="`i-${v.icon}`" dynamic size="1rem" />
          </UButton>
          <span class="flex-1 text-left truncate tracking-tighter">{{ v.title }}</span>
          <UIcon name="i-ph-caret-right-light" dynamic size="1rem" color="gray" />
        </div>
      </UButton>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
