<script setup lang="ts">
import IncomeResult from "./components/IncomeResult.vue";
import { 건강보험료율, 기준중위소득, 전년도도시근로자월평균소득, 중위소득건보료 } from "./data/각종기준";

useAppConfig().ui.primary = "red";

const selectedPeople = ref(1);
const 건강보험료 = ref(0);
const 건강보험료2 = ref(0);
const 보수월액 = ref(0);
const 모드 = ref<"선택" | "조회">("선택");

const 월평균소득대비 = ref(0);
const 중위소득대비 = ref(0);

watch(건강보험료, () => {
  if (+건강보험료.value > 0) {
    건강보험료.value = +건강보험료.value;
  }
  if (+건강보험료.value > 1_000_000) {
    건강보험료.value = 0;
  }
});

const toast = useToast();

const recalculate = () => {
  모드.value = "선택";
  보수월액.value = 0;
};

const calculate = () => {
  if (건강보험료.value < 10000 || isNaN(+건강보험료.value) || isNaN(+건강보험료2.value)) {
    toast.add({
      title: "비정상적인 건강보험료 금액입니다!",
      id: "calculate",
      icon: "i-heroicons-no-symbol",
    });
    return;
  }

  const 합산건강보험료 = !맞벌이유무.value
    ? 건강보험료.value
    : 건강보험료.value > 건강보험료2.value
    ? 건강보험료.value + 건강보험료2.value / 2
    : 건강보험료.value / 2 + 건강보험료2.value;

  보수월액.value = Math.round(합산건강보험료 * (100 / (건강보험료율[2024] / 2)));
  모드.value = "조회";

  중위소득대비.value =
    Math.round((합산건강보험료 / 중위소득건보료[2024]["직장가입"][selectedPeople.value - 1]) * 1000) / 10;
  월평균소득대비.value =
    Math.round((보수월액.value / 전년도도시근로자월평균소득[2024][selectedPeople.value - 1]) * 1000) / 10;

  setTimeout(() => scrollToTop(), 300);
};

const scrollToTop = () => {
  if (!스크롤지점.value) return;

  window.scrollTo({
    top: 스크롤지점.value?.offsetTop + 4 * parseFloat(getComputedStyle(document.documentElement).fontSize),
    behavior: "smooth",
  });
};

const 스크롤지점 = ref<HTMLDivElement>();
const 맞벌이유무 = ref(false);
const 맞벌이계산식 = () => {
  const 건보료 = 건강보험료.value.toLocaleString() + "원";
  const 건보료2 = 건강보험료2.value.toLocaleString() + "원";
  if (맞벌이유무.value) {
    if (건강보험료.value > 건강보험료2.value) {
      return `${건보료} + (${건보료2}/2)`;
    }
    return `${건보료2} + (${건보료}/2)`;
  }
  return 건보료;
};

const title = "중위소득 계산기 +";
const title2 = "월평균소득 계산기";
const desc = `건강보험료만 입력하면\n동시에 계산해드립니다`;

const seoData = {
  title: `${title} ${title2}`,
  ogTitle: `${title} ${title2}`,
  description: desc,
  ogDescription: desc,
  twitterCard: "summary_large_image",
} as any;
useSeoStore(seoData);
useSeoStore({ title, title2, icon: "i-fluent-emoji-flat-money-with-wings" });

defineOgImageComponent("LandingHero", { title, title2, desc, colorCode: "rgb(239, 68, 68)", chip: "2024" });

const 중위소득계산 = (percent: number) => {
  건강보험료.value = Math.round(중위소득건보료[2024]["직장가입"][selectedPeople.value - 1] * (percent / 100));
};
</script>
<template>
  <div class="m-3">
    <div class="w-full text-center">
      <p class="mt-3 text-sm tracking-tight text-gray-600 break-keep whitespace-pre">{{ desc }}</p>
    </div>
    <UDivider class="my-3" />
    <div class="flex flex-col gap-3">
      <IconSelector
        v-model="selectedPeople"
        title="가족구성원"
        unit="명"
        :count="7"
        :mode="모드"
        :icon="{
          on: 'i-ph-user-circle-duotone',
          off: 'i-ph-user-circle-thin',
        }"
      />

      <template v-if="보수월액 > 0">
        <IncomeResult
          :healthInsuranceFee="맞벌이계산식()"
          :income="보수월액"
          :isDual="맞벌이유무"
          :medianIncome="중위소득대비"
          :avgMonIncome="월평균소득대비"
          @back="recalculate()"
        />
      </template>
      <template v-else>
        <BasicInput
          v-model="건강보험료"
          label="건강보험료?"
          trailing="원"
          help="월 기준, 직장가입자 기준, 노인장기요양보험료 미포함"
          type="number"
        >
          <template #tooltip>
            <div class="text-md font-bold"><span class="text-primary">건강보험료</span> 조회방법</div>
            <UDivider class="py-1" />
            <div class="text-md font-bold">모바일</div>
            <UDivider class="py-1" />
            <div class="text-sm text-gray-500">
              1️⃣ 'The건강보험' 앱 다운로드<br />
              2️⃣ [민원여기요]-[조회] 이동<br />
              3️⃣ [더보기]-[직장보험료 조회] 이동<br />
              4️⃣ 인증 후 최근 건강보험x산정보험료 조회<br />
            </div>
            <UDivider class="py-1" />
            <div class="text-md font-bold">웹페이지</div>
            <UDivider class="py-1" />
            <div class="text-sm text-gray-500">
              1️⃣ '건강보험공단' 접속 - 로그인
              <a
                href="https://www.nhis.or.kr/nhis/index.do"
                class="underline-offset-4 text-primary-300"
                target="건강보험공단"
                >링크</a
              >
              <br />
              2️⃣ [민원여기요]-[개인민원] 이동<br />
              3️⃣ [보험료 조회/신청]-[직장보험료 조회] 이동<br />
              4️⃣ 최근 건강보험x산정보험료 조회<br />
            </div>
          </template>
        </BasicInput>
        <BasicInput v-if="맞벌이유무" v-model="건강보험료2" type="number" trailing="원" />
        <UCheckbox
          v-if="selectedPeople > 1"
          v-model="맞벌이유무"
          :label="`맞벌이?` + (맞벌이유무 ? ' - 공식 : 높은소득 + 낮은소득/2' : '')"
        />
        <div v-if="!맞벌이유무" class="flex gap-2 w-full">
          <UButton :variant="중위소득대비 === 100 ? 'solid' : 'outline'" size="sm" @click="중위소득계산(100)">
            #중위소득100
          </UButton>
          <UButton variant="outline" size="sm" @click="중위소득계산(150)">#중위소득150</UButton>
          <UButton variant="outline" size="sm" @click="중위소득계산(180)">#중위소득180</UButton>
        </div>

        <UButton block color="primary" label="계산하기" size="lg" icon="i-heroicons-calculator" @click="calculate()" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
