<script setup lang="ts">
useSeoMeta({
  twitterCard: "summary_large_image",
});

defineOgImageComponent("NuxtSeo");

const arr = [
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
    </LandingHero>
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
    <div class="fixed bottom-0 left-0 p-3 w-full">
      <div class="flex gap-3">
        <UButton
          class="flex-1 bg-gradient-to-tl from-blue-500 to-violet-600"
          color="black"
          size="xl"
          to="https://naver.me/Gpfd5bxD"
          target="form"
        >
          <div class="flex gap-2 justify-between w-full items-center">
            <span class="flex-1 text-left truncate tracking-tighter text-center dark:text-white">제안하기</span>
          </div>
        </UButton>
        <UButton class="flex-1" color="black" size="xl" to="https://uminoh.tistory.com/" target="blog">
          <div class="flex gap-2 justify-between w-full items-center">
            <span class="flex-1 text-left truncate tracking-tighter text-center">크리에이터 소개</span>
          </div>
        </UButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
