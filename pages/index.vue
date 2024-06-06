<script setup lang="ts">
useSeoMeta({
  twitterCard: "summary_large_image",
});

useAppConfig().ui.primary = "violet";

defineOgImageComponent("NuxtSeo");

const arr = [
  // { title: "환율계산기", icon: "heroicons-presentation-chart-bar", to: "/global-money" },
  { title: "Micro SaaS 고객계산기", icon: "heroicons-presentation-chart-bar", to: "/micro-saas" },
  { title: "인프런 지식공유자 예상수익 계산기", icon: "ph-user-circle-check-light", to: "/inf" },
  { title: "중위소득 · 도시월평균소득 계산기", icon: "heroicons-presentation-chart-bar", to: "/income" },
];
</script>

<template>
  <div>
    <LandingHero>
      <span class="text-base font-light">"그거 계산해보면 좋겠다" 하면 만들어버리는</span>
      <div class="flex items-end justify-center gap-3">
        <img src="/icon-192.png" width="48" height="48" />
        <span class="tracking-tighter text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-600">
          calcreator
        </span>
      </div>
      <div class="flex gap-2 mt-3 justify-center">
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
    </LandingHero>
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
