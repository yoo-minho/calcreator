<script setup lang="ts">
const { data } = await useFetch<{ redirect: string }>("/api/redirect", {
  server: true,
});
if (data.value?.redirect) {
  navigateTo(data.value.redirect, { replace: true, redirectCode: 301 });
}

useColorMode().preference = "white";
useAppConfig().ui.primary = "black";

const arr = [
  { title: "여행용 환율계산기", icon: "i-fluent-emoji-flat-currency-exchange", to: "/currency/all", color: "blue" },
  { title: "Micro SaaS 고객 계산기", icon: "i-fluent-emoji-flat-microbe", to: "/micro-saas", color: "cyan" },
  { title: "인프런 수익 계산기", icon: "i-fluent-emoji-flat-seedling", to: "/inf", color: "green" },
  { title: "중위소득 · 월평균소득 계산기", icon: "i-fluent-emoji-flat-money-with-wings", to: "/income", color: "red" },
];

const moveCalculator = async (v: { to: string; color: string }) => {
  useAppConfig().ui.primary = v.color;
  await navigateTo(v.to);
};

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
  <div>
    <LandingHero :title="title" :title2="title2" :desc="`&quot;${desc}&quot;`" color-code="primary" />
    <UDivider />
    <template v-for="v in arr">
      <UButton
        class="w-full"
        color="black"
        variant="ghost"
        size="xl"
        :alt="v.title"
        :to="v.to"
        square
        @click="moveCalculator(v)"
      >
        <div class="flex gap-2 justify-between w-full items-center">
          <UButton color="gray" class="p-1">
            <UIcon :name="v.icon" class="w-[1.5em] h-[1.5em]" dynamic />
          </UButton>
          <span class="flex-1 text-left truncate tracking-tighter ml-1">{{ v.title }}</span>
          <UIcon name="i-ph-caret-right" size="1rem" />
        </div>
      </UButton>
    </template>
    <UDivider />
    <div class="flex gap-2 m-3 justify-center">
      <UButton color="white" to="https://naver.me/Gpfd5bxD" target="form"> 제안하기 </UButton>
      <UButton color="black" to="https://www.threads.net/@irontaek" target="blog"> 만든이 : 유철택 </UButton>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
