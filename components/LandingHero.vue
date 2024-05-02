<script setup lang="ts">
import { _0 } from "#tailwind-config/theme/backdropBlur";

const people = [1, 2, 3, 4, 5, 6, 7];
const selectedPeople = ref(people[0]);

//보건복지부
const 기준중위소득 = {
  2024: [2_228_445, 3_682_609, 4_714_657, 5_729_913, 6_695_735, 7_618_369, 8_514_994],
};

const 중위소득건보료 = {
  2024: {
    직장가입: [79_320, 130_901, 167_876, 205_281, 239_074, 271_291, 304_986],
    지역가입: [0, 74_359, 123_611, 156_318, 195_321, 233_543, 271_091],
    혼합가입: [0, 132_127, 169_859, 208_153, 243_098, 277_236, 314_423],
  },
};

//통계청
const 전년도도시근로자월평균소득 = {
  2024: [3_482_964, 5_415_712, 7_198_649, 8_248_467, 8_775_071, 9_563_282, 10_351_493],
  2023: [3_353_884, 5_005_376, 6_718_198, 7_622_056, 8_040_492, 8_701_639, 9_362_786, 10_023_933],
};

//소득 8분위???

const 건강보험료율 = {
  2024: 7.09,
};

const 건강보험료 = ref(0);
const 건강보험료2 = ref(0);
const 보수월액 = ref(0);
const 중위소득대비 = ref(0);
const 중위소득대비2 = ref(0);
const 월평균소득대비 = ref(0);

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

  console.log({ 맞벌이유무, 합산건강보험료 });

  보수월액.value = Math.round(합산건강보험료 * (100 / (건강보험료율[2024] / 2)));

  중위소득대비.value =
    Math.round((합산건강보험료 / 중위소득건보료[2024]["직장가입"][selectedPeople.value - 1]) * 1000) / 10;

  중위소득대비2.value = Math.round((보수월액.value / 기준중위소득[2024][selectedPeople.value - 1]) * 1000) / 10;

  월평균소득대비.value =
    Math.round((보수월액.value / 전년도도시근로자월평균소득[2024][selectedPeople.value - 1]) * 1000) / 10;

  setTimeout(() => {
    scrollToTop();
  }, 300);
};

const scrollToTop = () => {
  if (!스크롤지점.value) return;

  window.scrollTo({
    top: 스크롤지점.value?.offsetTop + 4 * parseFloat(getComputedStyle(document.documentElement).fontSize),
    behavior: "smooth",
  });
};

const copyLink = async () => {
  await navigator.clipboard.writeText(location.href);
  toast.add({
    id: "copyLink",
    title: "링크 복사 완료! 공유를 시작하세요!",
    icon: "i-heroicons-check-circle",
  });
};

const refers = [
  {
    label: "역대 기준중위소득 확인 - 보건복지부",
    url: "https://www.mohw.go.kr/menu.es?mid=a10708010900",
  },
  {
    label: "역대 건강보험료율 확인 - 국민건강보험",
    url: "https://www.nhis.or.kr/nhis/minwon/retrieveJobCalcView.do",
  },
  {
    label: "2024 건강보험료 소득판정기준표 - 엔젤시터",
    url: "https://angelsitter.co.kr/contents.php?cname=welfare_basic_insurance",
  },
];

const 스크롤지점 = ref<HTMLDivElement>();

useSeoMeta({
  title: "나의소득몇퍼센트 - 중위소득|월평균소득 계산",
  ogTitle: "나의소득몇퍼센트 - 중위소득|월평균소득 계산",
  description: "건강보험료를 활용하여 중위소득과 월평균소득을 알아봅시다",
  ogDescription: "건강보험료를 활용하여 중위소득과 월평균소득을 알아봅시다.",
  ogImage: "/og.png",
  twitterCard: "summary_large_image",
});

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
</script>
<template>
  <div>
    <UNotifications />
    <div class="mx-auto px-4 flex flex-col max-w-4xl mt-1">
      <div class="text-center relative z-[1]">
        <UChip text="2024" size="2xl">
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 mt-3">
            나의소득<br /><span class="text-primary">몇퍼센트</span>
          </h1>
        </UChip>
      </div>
    </div>
    <div class="flex flex-col gap-3 pt-6">
      <div>
        <div class="text-xl leading-7 flex gap-3">
          <div class="font-bold">가족구성원</div>
          <div>{{ selectedPeople }}명</div>
        </div>
        <div v-if="보수월액 === 0">
          <div class="flex">
            <template v-for="i in 7">
              <template v-if="i <= selectedPeople">
                <UIcon
                  name="i-ph-user-circle-duotone"
                  dynamic
                  class="flex-1 text-4xl text-primary cursor-pointer"
                  @click="selectedPeople = selectedPeople === i && i > 1 ? i - 1 : i"
                />
              </template>
              <template v-else>
                <UIcon
                  name="i-ph-user-circle-thin"
                  dynamic
                  class="flex-1 text-4xl cursor-pointer"
                  @click="selectedPeople = i"
                />
              </template>
            </template>
          </div>
        </div>
      </div>
      <div>
        <template v-if="보수월액 > 0">
          <div class="text-xl leading-7">
            <div class="font-bold">건강보험료</div>
            <div>
              {{ 맞벌이계산식() }}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-xl leading-7 flex items-center">
            <div class="font-bold">건강보험료?</div>
            <UPopover>
              <UButton color="primary" size="md" variant="ghost" icon="i-heroicons-question-mark-circle" />
              <template #panel>
                <div class="p-3">
                  <div class="text-black text-sm font-bold">
                    각종 <b class="text-primary">건강보험료</b>에 활용되는 소득기준
                  </div>
                  <UDivider class="py-1" />
                  <div class="text-xs text-gray-400 font-light">
                    1️⃣ 건강보험공단 접속 - 로그인
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
                </div>
              </template>
            </UPopover>
          </div>
          <div class="text-xs text-gray-400">월 기준, 직장가입자 기준, 노인장기요양보험료 미포함</div>
          <UInput
            v-model="건강보험료"
            color="gray"
            variant="outline"
            type="number"
            input-class="text-right"
            size="xl"
            :disabled="보수월액 > 0"
          >
            <template #trailing> 원 </template>
          </UInput>
          <UInput
            v-if="맞벌이유무"
            v-model="건강보험료2"
            color="gray"
            variant="outline"
            type="number"
            input-class="text-right"
            size="xl"
            :disabled="보수월액 > 0"
            class="pt-1"
            :input-attr="{ 'max-length': 8 }"
          >
            <template #trailing> 원 </template>
          </UInput>
          <div v-if="selectedPeople > 1" class="pt-3 flex gap-3">
            <UCheckbox
              v-model="맞벌이유무"
              :label="`맞벌이?` + (맞벌이유무 ? ' - 공식 : 높은소득 + 낮은소득/2' : '')"
            />
          </div>
        </template>
      </div>
      <template v-if="보수월액 > 0">
        <UDivider />
        <div v-if="!맞벌이유무">
          <div class="flex items-center gap-1">
            <div class="text-xl font-bold leading-7" ref="스크롤지점">건강보험료로 추정된 월 소득</div>
            <UPopover>
              <UButton color="primary" size="md" variant="ghost" icon="i-heroicons-question-mark-circle" />
              <template #panel>
                <div class="p-3 text-sm text-gray-400">
                  사용처에 따라<br />
                  다르게 표현되나<br />
                  비슷하게 쓰임. <br />
                  <UDivider class="py-3" />
                  보수월액 (건강보험)<br />
                  보수총액 (고용/산재보험)<br />
                  기준소득월액 (국민연금)
                </div>
              </template>
            </UPopover>
          </div>
          <div class="text-xs text-gray-400">비과세 소득 제외된 월 소득 (세전)</div>
          <div class="flex gap-2">
            <div
              class="rounded-lg divide-y divide-gray-200 ring-1 ring-gray-200 shadow flex-1 text-right px-4 py-1"
              color="gray"
            >
              {{ 보수월액.toLocaleString() }} 원
            </div>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-3">
            <div class="flex-1 flex gap-1">
              <UBadge label="중위소득" />
              <UPopover>
                <UButton color="primary" size="md" variant="ghost" icon="i-heroicons-question-mark-circle" />
                <template #panel>
                  <div class="p-3">
                    <div class="text-black text-sm">각종 <b class="text-primary">복지제도</b>에 활용되는 소득기준</div>
                    <UDivider class="py-1" />
                    <div class="text-xs text-gray-400">
                      시점마다 명확한 기준이 바뀔 수 있음. <br />
                      예를들어,<br />
                      희귀질환아동지원 : 중위소득 130% 이하 만18세 미만 <br />
                      청년도약계좌 : 중위소득 180% 이하 청년대상 <br />
                      청년월세지원사업 : 청년독립가구 중위소득 60% 이하<br />
                      청년내일저축계좌 : 중위소득 50% 초과 ~ 100% 이하<br />
                    </div>
                  </div>
                </template>
              </UPopover>
            </div>
            <div class="text-5xl font-bold tracking-tight text-gray-900">
              <span class="text-primary"> {{ 중위소득대비 }} </span>%
              <!-- <span class="text-primary"> {{ 중위소득대비2 }} </span>% -->
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex-1 flex gap-1 items-center">
              <UBadge>전년도 도시근로자<br />월평균소득</UBadge>
              <UPopover>
                <UButton color="primary" size="md" variant="ghost" icon="i-heroicons-question-mark-circle" />
                <template #panel>
                  <div class="p-3">
                    <div class="text-black text-sm">
                      각종 <b class="text-primary">청약/임대 제도</b>에 활용되는 소득기준
                    </div>
                    <UDivider class="py-1" />
                    <div class="text-xs text-gray-400">
                      시점마다 명확한 기준이 바뀔 수 있음. <br />
                      예를들어,<br />
                      행복주택 : 월평균소득기준 100% 이하<br />
                      국민임대주택 : 월평균소득기준 50% 이하<br />
                      뉴홈사전청약 : 월평균소득기준 100% 이하<br />
                    </div>
                  </div>
                </template>
              </UPopover>
            </div>
            <div class="text-5xl font-bold tracking-tight text-gray-900">
              <span class="text-primary"> {{ 월평균소득대비 }} </span>%
            </div>
          </div>
          <!-- <div class="text-red-400 text-xs">건강보험공단의</div> -->
        </div>

        <UDivider type="dashed" />
        <UButton
          block
          color="primary"
          label="뒤로가기"
          size="lg"
          icon="i-heroicons-arrow-left-16-solid"
          @click="recalculate()"
        />
        <UButton
          block
          color="black"
          label="링크복사"
          size="lg"
          icon="i-heroicons-clipboard-document-check"
          @click="copyLink()"
        />
        <UDivider type="dashed" />
        <div>
          <div class="text-xl font-bold leading-7">참고</div>
          <div v-for="r in refers">
            <div class="text-sm">
              {{ r.label }}
              <a class="underline-offset-4 text-primary-300" :href="r.url" :target="r.label"> 링크 </a>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <UButton block color="primary" label="계산하기" size="lg" icon="i-heroicons-calculator" @click="calculate()" />
        <UButton
          block
          color="black"
          label="링크복사"
          size="lg"
          icon="i-heroicons-clipboard-document-check"
          @click="copyLink()"
        />
      </template>
    </div>
  </div>
  <div class="flex justify-center pt-3">
    <a href="https://hits.sh/customcal.vercel.app/income/"
      ><img
        alt="Hits"
        src="https://hits.sh/customcal.vercel.app/income.svg?view=today-total&style=flat-square&color=6449FC"
    /></a>
  </div>
</template>

<style lang="scss" scoped></style>
