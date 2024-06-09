<script setup lang="ts">
useAppConfig().ui.primary = "pink";

const 홍콩달러 = ref(100);
const 한국원화 = ref(0);
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
    한국원화.value = 홍콩달러.value * 시세.홍콩.원화.달러사실때;
    빅맥몇개.value = Math.round((홍콩달러.value / 시세.홍콩.달러.빅맥단품) * 10) / 10;
    라떼몇개.value = Math.round((홍콩달러.value / 시세.홍콩.달러.스벅라떼톨) * 10) / 10;
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

const page = ref<"intro" | "result">("intro");

const calculate = () => {
  page.value = "result";
};
</script>
<template>
  <div>
    <LandingHero class="text-base">
      <span class="tracking-tighter text-4xl">나는 한국인이고</span>
      <span class="text-primary tracking-tighter text-4xl">홍콩 여행중이야</span>
    </LandingHero>

    <div class="flex flex-col gap-3">
      <template v-if="page === 'intro'">
        <BasicInput v-model="홍콩달러" label="홍콩달러" trailing="$" type="number" :horizon="true" />
        <UButton
          block
          color="primary"
          label="자동계산중..."
          size="lg"
          icon="i-heroicons-calculator"
          @click="calculate()"
        />
        <div>
          <BasicInput v-model="한국원화" label="한국원화" trailing="원" :horizon="true" :disabled="true" />
          <BasicInput
            v-model="빅맥몇개"
            :help="makeLabel('개', '빅맥단품')"
            label="맥도날드 빅맥단품"
            trailing="개"
            :horizon="true"
            :disabled="true"
          />
          <BasicInput
            v-model="라떼몇개"
            :help="makeLabel('잔', '스벅라떼톨')"
            label="스타벅스 라떼 톨"
            trailing="잔"
            :horizon="true"
            :disabled="true"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
