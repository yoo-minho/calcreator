<script setup lang="ts">
const people = [1, 2, 3, 4, 5, 6, 7];
const selectedPeople = ref(people[0]);

const percent = [
  32, 40, 48, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180,
  190, 200,
];
const selectedPerson = ref(100);

//보건복지부
const 기준중위소득 = {
  2024: [
    2_228_445, 3_682_609, 4_714_657, 5_729_913, 6_695_735, 7_618_369, 8_514_994,
  ],
};

//통계청
const 전년도도시근로자월평균소득 = {
  2024: [
    3_482_964, 5_415_712, 7_198_649, 8_248_467, 8_775_071, 9_563_282,
    10_351_493,
  ],
  2023: [
    3_353_884, 5_005_376, 6_718_198, 7_622_056, 8_040_492, 8_701_639, 9_362_786,
    10_023_933,
  ],
};

const 건강보험료율 = {
  2024: 7.09,
};

const 건강보험료 = ref(0);
const 보수월액 = ref(0);

const 중위소득대비 = computed(() => {
  보수월액.value = Math.round(
    건강보험료.value * (100 / (건강보험료율[2024] / 2))
  );
  return (
    Math.round(
      (보수월액.value / 기준중위소득[2024][selectedPeople.value - 1]) * 1000
    ) / 10
  );
});

const 월평균소득대비 = computed(() => {
  보수월액.value = Math.round(
    건강보험료.value * (100 / (건강보험료율[2024] / 2))
  );
  return (
    Math.round(
      (보수월액.value /
        전년도도시근로자월평균소득[2024][selectedPeople.value - 1]) *
        1000
    ) / 10
  );
});

const refers = [
  {
    label: "역대 기준중위소득 확인 - 보건복지부",
    url: "https://www.mohw.go.kr/menu.es?mid=a10708010900",
  },
  {
    label: "역대 건강보험료율 확인 - 국민건강보험",
    url: "https://www.nhis.or.kr/nhis/minwon/retrieveJobCalcView.do",
  },
];
</script>
<template>
  <div>
    <div class="mx-auto px-4 flex flex-col max-w-4xl mb-3">
      <div class="text-center relative z-[1]">
        <UBadge size="lg">2024</UBadge>
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 mt-3">
          나의 소득은<br /><span class="text-primary">몇 퍼센트</span>?
        </h1>
      </div>
    </div>
    <div class="flex flex-col gap-6 pt-6">
      <div>
        <div class="text-xl font-bold leading-7 flex gap-3">
          <div>가족구성원 수?</div>
          <div>{{ selectedPeople }}명</div>
        </div>
        <div>
          <div class="flex">
            <template v-for="i in 7">
              <template v-if="i <= selectedPeople">
                <UIcon
                  name="i-ph-user-circle-duotone"
                  dynamic
                  class="flex-1 text-4xl text-primary"
                  @click="selectedPeople = i"
                />
              </template>
              <template v-else>
                <UIcon
                  name="i-ph-user-circle-thin"
                  dynamic
                  class="flex-1 text-4xl"
                  @click="selectedPeople = i"
                />
              </template>
            </template>
          </div>
        </div>
      </div>
      <div>
        <div class="text-xl font-bold leading-7">
          당신 가구의 월 건강보험료 합계
        </div>
        <div class="text-sm text-gray-400">
          노인장기요양료 보험료 미포함, 직전3개월평균
        </div>
        <UInput
          v-model="건강보험료"
          color="gray"
          variant="outline"
          type="number"
          input-class="text-right"
          size="xl"
        >
          <template #trailing> 원 </template>
        </UInput>
      </div>
      <UDivider icon="i-heroicons-calculator" type="dashed" />
      <div>
        <div class="text-xl font-bold leading-7">당신 가구의 예상 보수월액</div>
        <div class="text-sm text-gray-400">
          2024년 건강보험료율 : {{ 건강보험료율[2024] }}% 역산 | 월급 - 비과세
          소득
        </div>
        <div class="flex gap-2">
          <div
            class="rounded-lg divide-y divide-gray-200 ring-1 ring-gray-200 dark:ring-gray-800 shadow flex-1 text-right px-4 py-1"
            color="gray"
          >
            {{ 보수월액.toLocaleString() }} 원
          </div>
        </div>
      </div>

      <div class="flex">
        <div class="flex-1">
          <UBadge label="중위소득" />
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 mt-3">
            <span class="text-primary"> {{ 중위소득대비 }} </span>%
          </h1>
        </div>
        <div class="flex-1">
          <UBadge label="전년도 도시근로자 월평균소득" />
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 mt-3">
            <span class="text-primary"> {{ 월평균소득대비 }} </span>%
          </h1>
        </div>
      </div>

      <div>
        <div class="text-xl font-bold leading-7">참고</div>
        <div v-for="r in refers">
          <div>
            {{ r.label }}
            <a
              class="underline-offset-4 text-primary-300"
              :href="r.url"
              :target="r.label"
            >
              링크
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
