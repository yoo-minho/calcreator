<script setup lang="ts">
import BasicCalculator from "./components/BasicCalculator.vue";

useAppConfig().ui.primary = "pink";

const route = useRoute();
const code = String(route.params.code[0]).toUpperCase();

const displayPrice = ref("0");
const 한국원화 = ref(0);
const _한국원화 = computed(() => 한국원화.value.toLocaleString());

const CURRENCY_ARR = [
  { name: "일본", unit: "JPY", flag: "japan" },
  { name: "대만", unit: "TWD", flag: "taiwan" },
  { name: "태국", unit: "THB", flag: "thailand" },
  { name: "중국", unit: "CNY", flag: "china" },
  { name: "싱가폴", unit: "SGD", flag: "singapore" },
  { name: "미국", unit: "USD", flag: "us-outlying-islands" },
  { name: "베트남", unit: "VND", flag: "vietnam" },
  { name: "호주", unit: "AUD", flag: "australia" },
  { name: "영국", unit: "GBP", flag: "united-kingdom" },
  { name: "프랑스", unit: "EUR", flag: "france" },
  { name: "필리핀", unit: "PHP", flag: "philippines" },
  { name: "홍콩", unit: "HKD", flag: "hong-kong-sar-china" },
].map((v) => {
  return { ...v, flag: `i-emojione-flag-for-${v.flag}` };
});

type ExchangeType = { basePrice: number; modifiedAt: string; currencyCode: string; currencyUnit: number };

const currencyCode = ref(code === "ALL" ? CURRENCY_ARR[0].unit : code);
const currencyFlag = computed(() => CURRENCY_ARR.find((c) => c.unit === currencyCode.value)?.flag || "");
const currencyName = computed(() => CURRENCY_ARR.find((c) => c.unit === currencyCode.value)?.name || "");

const { data: exchangeDataArr } = await useFetch<ExchangeType[]>(
  () => `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${currencyCode.value}`,
  { watch: [currencyCode] }
);

const exchangeData = ref();
watch(exchangeDataArr, () => (exchangeData.value = exchangeDataArr.value?.[0]), { immediate: true });

const modifiedAt = computed(() => new Date(exchangeData.value?.modifiedAt || "").toLocaleDateString());
const realPrice = computed(() => Math.round((exchangeData.value?.basePrice || 0) * 100) / 100);
const currencyUnit = computed(() => exchangeData.value?.currencyUnit);

const isOpenCurrencySelectModal = ref(false);

const isOpenCurrencyModal = ref(false);
const fixPrice = ref(0);

const isFixMode = ref(false);
const currentPrice = computed(() => (isFixMode.value ? fixPrice.value : realPrice.value));

const submitModal = () => {
  isFixMode.value = true;
};

const changeCurrency = (_currencyUnit: string) => {
  currencyCode.value = _currencyUnit;
  useRouter().push({ params: { code: [_currencyUnit] } });
};

const openCurrencyModal = () => {
  isOpenCurrencyModal.value = true;
  fixPrice.value = realPrice.value;
};

watch(
  [displayPrice, currentPrice],
  () => {
    한국원화.value = Math.round((+displayPrice.value * currentPrice.value) / (currencyUnit.value * 100)) * 100;
  },
  { immediate: true }
);

const title = computed(() => (code === "ALL" ? "" : currencyName.value) + ` 여행용`);
const title2 = "환율계산기";
const desc = "광고없음! 사칙연산과 동시에 환전이 됩니다.";

useSeoMeta({
  title: `${title.value} ${title2}`,
  ogTitle: `${title.value} ${title2}`,
  description: desc,
  ogDescription: desc,
  twitterCard: "summary_large_image",
});

defineOgImageComponent("LandingHero", {
  title: title.value,
  title2: title2,
  colorCode: "rgb(236,72,153)",
  desc: desc,
  chip: "🗽🕌🎡",
});
</script>
<template>
  <div class="flex flex-col" style="height: calc(100vh - 72px)">
    <ModalCurrencySelectModal
      v-model="isOpenCurrencySelectModal"
      :currency-arr="CURRENCY_ARR"
      :current-currency-unit="currencyCode"
      @submit="changeCurrency"
    />
    <ModalCurrencyModal v-model="isOpenCurrencyModal" v-model:fix="fixPrice" @submit="submitModal" />

    <LandingHero :title="title" :title2="title2" color-code="primary" :desc="desc" />

    <BasicCalculator v-model="displayPrice" class="flex-1">
      <UDivider>
        <div class="flex flex-col items-center">
          <div class="flex items-center gap-2 text-sm">
            <UButton
              size="xs"
              class="font-light"
              color="primary"
              variant="outline"
              @click="isOpenCurrencySelectModal = true"
            >
              화폐변경
            </UButton>
            <div>|</div>
            <div class="flex flex-col items-center">
              <div>{{ currencyUnit }} {{ currencyCode }} = {{ currentPrice.toLocaleString() }} 원</div>
              <div class="text-gray-500 text-xs mt-[-4px]">
                <template v-if="isFixMode">
                  <div>직접 입력한 환율</div>
                </template>
                <template v-else>
                  <UPopover>
                    <div class="flex items-center">
                      <div>{{ modifiedAt }}</div>
                      <UIcon name="i-heroicons-question-mark-circle" class="w-[16px] h-[16px] ml-1" />
                    </div>
                    <template #panel>
                      <div class="p-3 text-base text-left">실시간 환율 데이터<br />by 두나무 하나은행 오픈 API</div>
                    </template>
                  </UPopover>
                </template>
              </div>
            </div>

            <div>|</div>
            <template v-if="isFixMode">
              <UButton size="xs" class="font-thin" color="gray" @click="isFixMode = false">실시간환율</UButton>
            </template>
            <template v-else>
              <UButton size="xs" class="font-thin" color="gray" @click="openCurrencyModal">직접입력</UButton>
            </template>
          </div>
        </div>
      </UDivider>

      <div class="flex items-center p-3 jusify-between" @click="isOpenCurrencySelectModal = true">
        <div class="flex flex-col items-center">
          <IconRoundFull :flag="currencyFlag" />
          <span class="mt-[-4px] flex items-center gap-1">
            <div>{{ currencyCode }}</div>
          </span>
        </div>
        <UInput
          v-model="displayPrice"
          disabled
          input-class="text-right text-4xl font-bold shadow-none ring-0"
          class="flex-1"
        />
      </div>

      <UDivider />

      <div class="flex items-center p-3 jusify-between">
        <div class="flex flex-col items-center">
          <UIcon
            name="i-emojione-flag-for-south-korea"
            class="w-[2em] h-[2em] border-solid border-gray-300 border rounded-full shadow"
          />
          <span class="mt-[-4px]">KRW</span>
        </div>
        <UInput
          v-model="_한국원화"
          disabled
          input-class="text-right text-4xl font-bold shadow-none ring-0 text-gray-500"
          class="flex-1"
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
