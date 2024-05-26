<script setup lang="ts">
useAppConfig().ui.primary = "orange";

const 연간구독매출 = ref(10);
const 월구독료 = ref(1);
const 필요유료고객수 = ref(0);

watch(
  [연간구독매출, 월구독료],
  () => {
    필요유료고객수.value = Math.round((연간구독매출.value * 10000) / (월구독료.value * 12));
  },
  { immediate: true }
);

const calculate = () => {
  console.log("xxx");
};

const items = [
  {
    label: "부분유료화 : 4%",
    aka: "Freemium",
    content: "기본 서비스는 무료, 프리미엄 기능 사용시 유료",
  },
  {
    label: "무료체험판 : 8%",
    aka: "Free Trial",
    content: "통상 2주 체험판 제공, 계속 사용시 유료",
  },
];

const selected = ref(0);
</script>
<template>
  <div>
    <LandingHero>
      <span>Micro SaaS</span>
      <span class="text-primary">고객 계산기</span>
    </LandingHero>

    <div class="flex flex-col gap-3">
      <BasicInput v-model="연간구독매출" label="연간구독매출 a.k.a ARR" trailing="억 원" type="number">
        <template #tooltip> Annual Recurring Revenue </template>
      </BasicInput>

      <BasicInput v-model="월구독료" label="1인당 월 구독료" trailing=" 만 원" type="number" />

      <BasicTab v-model="selected" label="모델에 따른 유료전환율" :items="items">
        <template #tooltip>
          <div class="flex flex-col">
            <div class="text-sm">
              <div class="font-bold">Freemium and Free Trial Conversion Benchmarks</div>
              <div>by Ada Chen Rekhi</div>
              <a
                class="underline-offset-4 text-primary-300"
                href="https://www.adachen.com/freemium-and-free-trial-conversion-benchmarks/"
                target="Ada Chen Rekhi"
              >
                링크
              </a>
            </div>
          </div>
        </template>
        <template #tab-contents="{ item }">
          <div class="flex flex-col">
            <span>
              a.k.a <b class="text-primary">{{ item.aka }}</b>
            </span>
            <span>
              {{ item.content }}
            </span>
          </div>
        </template>
      </BasicTab>

      <UButton block color="primary" label="계산하기" size="lg" icon="i-heroicons-calculator" @click="calculate()" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
