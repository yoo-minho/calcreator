<script setup lang="ts">
const arr = [
  { title: "Micro SaaS 고객계산기", theme: "orange", icon: "heroicons-presentation-chart-bar", to: "/micro-saas" },
  { title: "인프런 지식공유자 예상수익 계산기", theme: "green", icon: "ph-user-circle-check-light", to: "/inf" },
  { title: "중위소득 · 도시월평균소득 계산기", theme: "blue", icon: "heroicons-presentation-chart-bar", to: "/income" },
  {
    title: '"그거 계산해보면 좋겠다" 제안하기',
    theme: "gray",
    icon: "heroicons-envelope",
    to: "https://naver.me/Gpfd5bxD",
    target: "form",
  },
];
</script>

<template>
  <div>
    <LandingHero>
      <span class="text-base font-light">"그거 계산해보면 좋겠다" 하면 만들어버리는</span>
      <span class="tracking-tighter">calcreator</span>
    </LandingHero>
    <template v-for="v in arr">
      <UButton class="w-full" :color="v.theme" variant="ghost" size="xl" :to="v.to" square :target="v.target">
        <div class="flex gap-2 justify-between w-full">
          <UIcon :name="`i-${v.icon}`" dynamic size="1.5rem" />
          <span class="flex-1 text-left truncate tracking-tighter">{{ v.title }}</span>
          <UIcon name="i-ph-arrow-circle-right-fill" dynamic size="1.5rem" />
        </div>
      </UButton>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
