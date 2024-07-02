<script setup lang="ts">
import BasicFullSpinner from "~/components/BasicFullSpinner.vue";
import { 지식공유자들 } from "./data/지식공유자";
import HitBanner from "~/components/HitBanner.vue";

useAppConfig().ui.primary = "green";

const searchWord = ref("");
const targetArr = ref(지식공유자들);
watch(searchWord, () => {
  targetArr.value = 지식공유자들.filter((tg) => tg.name.includes(searchWord.value));
});

const isLoading = ref(false);

const routerPush = (id: string) => {
  isLoading.value = true;
  setTimeout(() => (isLoading.value = false), 1000);
  location.href = `${id}`;
};

const title = "인프런";
const title2 = "수익 계산기";
const desc = "내가 좋아하는, 관심 있는, 수강한 인프런\n지식공유자님의 누적 예상 수익을 알려드립니다.";

useSeoMeta({
  title: `${title} ${title2}`,
  ogTitle: `${title} ${title2}`,
  description: desc,
  ogDescription: desc,
  twitterCard: "summary_large_image",
});

defineOgImageComponent("LandingHero", {
  title: title,
  title2: title2,
  colorCode: "rgb(34,197,94)",
  desc: desc,
});
</script>

<template>
  <BasicFullSpinner v-model="isLoading" />
  <div class="flex flex-col gap-3">
    <LandingHero :title="title" :title2="title2" color-code="primary" :desc="desc" />

    <div class="flex gap-2 justify-center mt-[-28px] floating">
      <UButton to="https://www.inflearn.com/open-knowledge" target="inf">지식 공유 도전 👊👊👊</UButton>
    </div>

    <div class="mx-3">
      <SearchInput v-model="searchWord" />

      <div class="flex flex-wrap gap-1 mt-3">
        <template v-for="tg in targetArr">
          <UButton color="white" variant="solid" @click="routerPush(`inf/${tg.id}`)">
            {{ tg.name }}
          </UButton>
        </template>
      </div>
      <HitBanner domain="customcal.vercel.app/inf" color="22C55E" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
