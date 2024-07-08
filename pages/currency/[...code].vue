<script setup lang="ts">
import BasicCalculator from "./components/BasicCalculator.vue";

useAppConfig().ui.primary = "blue";

const route = useRoute();
const code = String(route.params.code[0]).toUpperCase();

const displayPrice = ref("0");
const 한국원화 = ref(0);
const _한국원화 = computed(() => 한국원화.value.toLocaleString());

const CURRENCY_ARR = [
  { name: "일본", unitName: "엔", unit: "JPY", flag: "japan" },
  { name: "대만", unitName: "달러", unit: "TWD", flag: "taiwan" },
  { name: "태국", unitName: "바트", unit: "THB", flag: "thailand" },
  { name: "중국", unitName: "위안", unit: "CNY", flag: "china" },
  { name: "싱가폴", unitName: "달러", unit: "SGD", flag: "singapore" },
  { name: "미국", unitName: "달러", unit: "USD", flag: "us-outlying-islands" },
  { name: "베트남", unitName: "동", unit: "VND", flag: "vietnam" },
  { name: "호주", unitName: "달러", unit: "AUD", flag: "australia" },
  { name: "영국", unitName: "파운드", unit: "GBP", flag: "united-kingdom" },
  { name: "프랑스", unitName: "유로", unit: "EUR", flag: "france" },
  { name: "필리핀", unitName: "페소", unit: "PHP", flag: "philippines" },
  { name: "홍콩", unitName: "달러", unit: "HKD", flag: "hong-kong-sar-china" },
  { name: "인도", unitName: "루피", unit: "INR", flag: "india" },
  { name: "멕시코", unitName: "페소", unit: "MXN", flag: "mexico" },
  { name: "스위스", unitName: "프랑", unit: "CHF", flag: "sweden" },
  { name: "인도네시아", unitName: "루피아", unit: "IDR", flag: "indonesia" },
  { name: "카타르", unitName: "리얄", unit: "QAR", flag: "qatar" },
  { name: "사우디", unitName: "리얄", unit: "SAR", flag: "saudi-arabia" },
].map((v) => {
  return { ...v, flag: `i-emojione-flag-for-${v.flag}` };
});

type ExchangeType = { currencyUnit: string; value: string };

const currencyCode = ref(code === "ALL" ? CURRENCY_ARR[0].unit : code);
const currencyFlag = computed(() => CURRENCY_ARR.find((c) => c.unit === currencyCode.value)?.flag || "");
const currencyName = computed(() => CURRENCY_ARR.find((c) => c.unit === currencyCode.value)?.name || "");

const exchangeData = ref();
const { data } = await useFetch<{ country: ExchangeType[] }>(`/api/currency/${currencyCode.value}`);
watch(data, () => (exchangeData.value = data.value), { immediate: true });

const modifiedAt = computed(() => new Date(exchangeData.value?.modifiedAt || "").toLocaleDateString());
const realPrice = computed(() => Math.round((exchangeData.value?.basePrice || 0) * 100) / 100);
const currencyUnit = computed(() => exchangeData.value?.currencyUnit);

const isOpenCurrencySelectModal = ref(false);

const isOpenCurrencyModal = ref(false);
const fixPrice = ref(0);
const isFixMode = ref(false);

const fixPriceCookieRef = useCookie<number>(`fix-price-${currencyCode.value}`, {
  maxAge: 60 * 60 * 24 * 7 * 4, // 4주 유효 기간
});
const fixPriceCookie = fixPriceCookieRef.value || 0;
if (fixPriceCookie > 0) {
  fixPrice.value = fixPriceCookie;
  isFixMode.value = true;
}

const currentPrice = computed(() => (isFixMode.value ? fixPrice.value : realPrice.value));

const submitModal = () => {
  isFixMode.value = true;
  fixPriceCookieRef.value = fixPrice.value;
};

const changeCurrency = (_currencyUnit: string) => {
  currencyCode.value = _currencyUnit;
  useRouter().push({ params: { code: [_currencyUnit] } });
};

const openModalForFixCurrencyMode = () => {
  isOpenCurrencyModal.value = true;
  fixPrice.value = Math.round(realPrice.value);
};

const revertRealTimeCurrencyMode = () => {
  isFixMode.value = false;
  fixPriceCookieRef.value = 0;
};

const clickEasy = () => {
  function customRound(number: number) {
    const numStr = number.toString();
    const [integerPart, decimalPart] = numStr.split(".");
    if (integerPart.length - 2 >= 0) {
      const tens = 10 ** (integerPart.length - 2);
      return Math.ceil(number / tens) * tens;
    }
    return Math.ceil(number);
  }
  displayPrice.value = customRound((10000 * currencyUnit.value) / currentPrice.value) + "";
  const toast = useToast();
  toast.add({
    id: "info",
    title: "10,000원이 대략 얼마인지 기억해두시고 즐거운 여행되세요!",
    icon: "i-fluent-emoji-flat-grinning-face",
  });
  bombPetal();
};

watch(
  [displayPrice, currentPrice],
  () => {
    const resultValue = Math.round((+displayPrice.value * currentPrice.value) / (currencyUnit.value * 100)) * 100;
    한국원화.value = isNaN(resultValue) ? 0 : resultValue;
  },
  { immediate: true }
);

const title = computed(() => (code === "ALL" ? "" : currencyName.value) + ` 여행용`);
const title2 = "환율계산기";
const desc = "광고없음! 사칙연산과 동시에 환율이 계산 됩니다.";

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

const bombPetal = () => {
  const petalsContainer = document.querySelector("body");
  if (!petalsContainer) return;

  petalsContainer.style.overflow = "hidden";
  const numberOfPetals = 200;

  for (let i = 0; i < numberOfPetals; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petalsContainer.prepend(petal);

    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    const randomDelay = Math.random() * 3;
    const duration = Math.random() * 3 + 2;
    const size = Math.random() * 12 + 8;
    const color = getRandomColor();

    petal.style.left = `${randomX}px`;
    petal.style.top = `${randomY}px`;
    petal.style.animation = `fall ${duration}s ease-out ${randomDelay}s infinite`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.backgroundColor = color;
  }

  setTimeout(() => {
    document.querySelectorAll(".petal").forEach((el) => el.remove());
    petalsContainer.style.overflow = "";
  }, 5000);

  function getRandomColor() {
    const rainbowColors = [
      "ff0000", // Red
      "ff7f00", // Orange
      "ffff00", // Yellow
      "00ff00", // Green
      "00ffff", // Cyan
      "0000ff", // Blue
      "8a2be2", // BlueViolet
      "ff00ff", // Magenta
    ];
    return "#" + rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
  }
};
</script>
<template>
  <div class="flex flex-col" style="height: calc(100vh - 72px); overflow: hidden">
    <ModalCurrencySelectModal
      v-model="isOpenCurrencySelectModal"
      :currency-arr="CURRENCY_ARR"
      :current-currency-unit="currencyCode"
      @submit="changeCurrency"
    />
    <ModalCurrencyModal v-model="isOpenCurrencyModal" v-model:fix="fixPrice" @submit="submitModal" />

    <LandingHero :title="title" :title2="title2" color-code="primary" :desc="desc" />

    <BasicCalculator v-model="displayPrice" class="flex-1" @clickEasy="clickEasy">
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
              <div class="text-gray-500 text-xs mt-[-2px]">
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
                      <div class="p-3 text-base text-left">실시간 환율 데이터<br />by 네이버 API</div>
                    </template>
                  </UPopover>
                </template>
              </div>
            </div>

            <div>|</div>
            <template v-if="isFixMode">
              <UButton size="xs" class="font-thin" color="gray" @click="revertRealTimeCurrencyMode">실시간환율</UButton>
            </template>
            <template v-else>
              <UButton size="xs" class="font-thin" color="gray" @click="openModalForFixCurrencyMode">직접입력</UButton>
            </template>
          </div>
        </div>
      </UDivider>

      <div class="flex items-center p-3 jusify-between" @click="isOpenCurrencySelectModal = true">
        <div class="flex flex-col items-center">
          <IconRoundFull :flag="currencyFlag" />
          <span class="mt-[1px] flex items-center gap-1">
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
          <span class="mt-[1px]">KRW</span>
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
  </div>
</template>

<style lang="scss">
.petal {
  position: absolute;
  width: 10px;
  height: 10px;
  transform-style: preserve-3d;
  /* 3D 회전을 유지하도록 설정 */
  opacity: 0;
  animation: fall 10s linear infinite;
}

@keyframes fall {
  0% {
    opacity: 0;
    transform: translateY(-100vh) rotate(0deg);
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(100vh) rotate(720deg);
  }
}
</style>
