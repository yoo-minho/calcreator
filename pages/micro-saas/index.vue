<script setup lang="ts">
useAppConfig().ui.primary = "red";

const 목표연소득 = ref(10);
const 월구독료 = ref(1);
const 필요고객수 = ref(0);

watch([목표연소득, 월구독료], () => {});
</script>
<template>
  <div>
    <LandingHero>
      <span>MICRO</span>
      <span class="text-primary">SAAS</span>
    </LandingHero>

    <div class="flex flex-col gap-3">
      <BasicInput v-model="목표연소득" label="연 목표매출" trailing="억 원" type="number" />
      <BasicInput v-model="월구독료" label="월 구독료" trailing="만 원" type="number" />
      <BasicInput v-model="필요고객수" label="필요고객수" trailing="명" type="number" />
    </div>

    {{ (목표연소득 * 10000) / (월구독료 * 12) }}
  </div>
</template>

<style lang="scss" scoped></style>
