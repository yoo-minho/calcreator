<script setup lang="ts">
import BasicCalculator from "./BasicCalculator.vue";

useAppConfig().ui.primary = "pink";

const 홍콩달러 = ref("0");
const 한국원화 = ref(0);
const _한국원화 = computed(() => 한국원화.value.toLocaleString());
const 빅맥몇개 = ref(0);
const 라떼몇개 = ref(0);

const 시세 = {
  홍콩: {
    원화: {
      달러사실때: 179,
    },
    달러: {
      빅맥단품: 23.5,
      스벅라떼톨: 40,
    },
  },
};

watch(
  홍콩달러,
  () => {
    한국원화.value = +홍콩달러.value * 시세.홍콩.원화.달러사실때;
    빅맥몇개.value = Math.round((+홍콩달러.value / 시세.홍콩.달러.빅맥단품) * 10) / 10;
    라떼몇개.value = Math.round((+홍콩달러.value / 시세.홍콩.달러.스벅라떼톨) * 10) / 10;
  },
  { immediate: true }
);

const makeLabel = (unit: string, prodduct: "빅맥단품" | "스벅라떼톨") => {
  return [
    `1${unit} 가격 :`,
    `${시세.홍콩.달러[prodduct]} HKD`,
    `(${(시세.홍콩.달러[prodduct] * 시세.홍콩.원화.달러사실때).toLocaleString()} 원)`,
  ].join(" ");
};

const title = `해외여행용`;
const title2 = "환율계산기";
const desc = "사칙연산과 동시에 환전이 됩니다.\n광고가 없어서 편리합니다.";

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
  colorCode: "rgb(236,72,153)",
  desc: desc,
  chip: "🗽🕌🎡",
});
</script>
<template>
  <div class="flex flex-col" style="height: calc(100vh - 72px)">
    <LandingHero :title="title" :title2="title2" color-code="primary" :desc="desc" />

    <BasicCalculator v-model="홍콩달러" class="flex-1">
      <UDivider />

      <div class="flex items-center p-3 jusify-between">
        <div class="flex flex-col items-center">
          <UIcon name="i-emojione-flag-for-hong-kong-sar-china" dynamic size="48px" />
          <span class="mt-[-4px]">HKD</span>
        </div>
        <UInput
          v-model="홍콩달러"
          disabled
          input-class="text-right text-4xl font-bold ring-0"
          class="flex-1"
          size="2xl"
        />
      </div>

      <UDivider label="1 HKD = 179 KRW" />

      <div class="flex items-center p-3 jusify-between">
        <div class="flex flex-col items-center">
          <UIcon name="i-emojione-flag-for-south-korea" dynamic size="48px" />
          <span class="mt-[-4px]">KRW</span>
        </div>
        <UInput
          v-model="_한국원화"
          disabled
          input-class="text-right text-4xl font-bold ring-0 text-gray-500"
          class="flex-1"
          size="2xl"
        />
      </div>

      <UDivider />
    </BasicCalculator>

    <HitBanner domain="customcal.vercel.app/global-money" color="hotpink" />
  </div>
</template>

<style lang="scss" scoped>
* {
}
</style>
