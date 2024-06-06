<script setup lang="ts">
useAppConfig().ui.primary = "pink";

const 연간구독매출 = ref(10);
const 월구독료 = ref(1);
const 필요유료고객수 = computed(() => Math.round((연간구독매출.value * 10000) / (월구독료.value * 12)));
const 필요모델고객수 = (percent: number) => Math.round(필요유료고객수.value * (100 / percent)).toLocaleString();

const page = ref<"intro" | "result">("intro");

const calculate = () => {
  page.value = "result";
};
</script>
<template>
  <div>
    <LandingHero>
      <span class="tracking-tighter">여행할때</span>
      <span class="text-primary tracking-tighter">계산필수</span>
    </LandingHero>

    <div class="flex flex-col gap-3">
      <template v-if="page === 'intro'">
        <div class="flex gap-1">
          <UButton variant="ghost" color="gray">
            <UIcon name="i-twemoji-flag-japan" dynamic />
            일본
          </UButton>
          <UButton variant="ghost" color="gray">
            <UIcon name="i-twemoji-flag-hong-kong-sar-china" dynamic />
            홍콩
          </UButton>
        </div>
        <BasicInput v-model="연간구독매출" label="어디 여행?" trailing="" type="number" />
        <BasicInput v-model="연간구독매출" label="금액 얼마?" trailing="달러" type="number" />
        <UButton block color="primary" label="계산하기" size="lg" icon="i-heroicons-calculator" @click="calculate()" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
