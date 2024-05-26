<script setup lang="ts">
const props = defineProps<{
  healthInsuranceFee: string;
  income: number;
  isDual: boolean;
  medianIncome: number;
  avgMonIncome: number;
}>();

const emits = defineEmits<{ (e: "back"): void }>();

const 보수월액 = ref(props.income);

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
</script>
<template>
  <div>
    <div class="text-xl leading-7 flex flex-wrap gap-x-3">
      <div class="font-bold">건강보험료</div>
      <div>
        {{ healthInsuranceFee }}
      </div>
    </div>
  </div>
  <UDivider />
  <div v-if="!isDual">
    <BasicInput
      v-model="보수월액"
      label="건강보험료로 추정된 월 소득"
      help="비과세 소득 제외된 월 소득 (세전)"
      trailing="원"
      :disabled="true"
    >
      <template #tooltip>
        사용처에 따라<br />
        다르게 표현되나<br />
        비슷하게 쓰임. <br />
        <UDivider class="py-3" />
        보수월액 (건강보험)<br />
        보수총액 (고용/산재보험)<br />
        기준소득월액 (국민연금)
      </template>
    </BasicInput>
  </div>
  <div>
    <div class="flex items-center gap-3">
      <div class="flex-1 flex gap-1 items-center">
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
        <span class="text-primary"> {{ medianIncome }} </span>%
      </div>
    </div>
    <div class="flex items-center">
      <div class="flex-1 flex gap-1 items-center">
        <UBadge>전년도 도시근로자<br />월평균소득</UBadge>
        <UPopover>
          <UButton color="primary" size="md" variant="ghost" icon="i-heroicons-question-mark-circle" />
          <template #panel>
            <div class="p-3">
              <div class="text-black text-sm">각종 <b class="text-primary">청약/임대 제도</b>에 활용되는 소득기준</div>
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
        <span class="text-primary"> {{ avgMonIncome }} </span>%
      </div>
    </div>
  </div>

  <UDivider type="dashed" />
  <UButton
    block
    color="primary"
    label="뒤로가기"
    size="lg"
    icon="i-heroicons-arrow-left-16-solid"
    @click="emits('back')"
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

<style lang="scss" scoped></style>
