<script setup lang="ts">
useAppConfig().ui.primary = "cyan";

const 연간구독매출 = ref(10);
const 월구독료 = ref(1);
const 필요유료고객수 = computed(() => Math.round((연간구독매출.value * 10000) / (월구독료.value * 12)));
const 필요모델고객수 = (percent: number) => Math.round(필요유료고객수.value * (100 / percent)).toLocaleString();

const page = ref<"intro" | "result">("intro");

const calculate = () => {
  page.value = "result";
};

const items = [
  {
    label: "부분유료화",
    aka: "Freemium",
    content: "기본 서비스는 무료, 프리미엄 기능 사용시 유료",
    percent: 4,
    expression: "필요 무료고객수",
  },
  {
    label: "무료체험판",
    aka: "Free Trial",
    content: "통상 2주 체험판 제공, 계속 사용시 유료",
    percent: 8,
    expression: "필요 체험고객수",
  },
];

const selected = ref(0);

const refers = [
  {
    title: "2024년 Micro SaaS에 주목하는 이유?",
    author: "기획하는 창업가",
    url: "https://brunch.co.kr/@firstevan/14",
  },
  {
    title: "Freemium and Free Trial Conversion Benchmarks",
    author: "Ada Chen Rekhi",
    url: "https://www.adachen.com/freemium-and-free-trial-conversion-benchmarks/",
  },
];
</script>
<template>
  <div class="m-3">
    <LandingHero>
      <span class="tracking-tighter">월 구독모델</span>
      <span class="text-primary tracking-tighter">몇 명필요해</span>
    </LandingHero>

    <div class="flex flex-col gap-3">
      <template v-if="page === 'intro'">
        <BasicInput v-model="연간구독매출" label="연간구독매출 a.k.a ARR" trailing="억 원" type="number">
          <template #tooltip> Annual Recurring Revenue </template>
        </BasicInput>

        <BasicInput v-model="월구독료" label="1인당 월 구독료" trailing=" 만 원" type="number" />

        <BasicTab v-model="selected" label="모델에 따른 유료전환율" :items="items">
          <template #tooltip>
            <div class="text-sm">
              <span> 아래 자료를 활용하여<br />계산식에 활용할 유료전환율을 각각 정함 </span>
              <UDivider class="py-3" />
              <div class="font-bold tracking-tighter">Freemium and Free Trial Conversion Benchmarks</div>
              <div>by Ada Chen Rekhi</div>
              <a
                class="text-primary-600"
                href="https://www.adachen.com/freemium-and-free-trial-conversion-benchmarks/"
                target="Ada Chen Rekhi"
              >
                링크
              </a>
            </div>
          </template>
          <template #tab-contents="{ item }">
            <div class="flex flex-col">
              <span>
                a.k.a <b class="text-primary">{{ item.aka }}</b>
              </span>
              <span> {{ item.content }} </span>
              <span>
                보통 전체 경험 고객 중 <b class="text-primary">{{ item.percent }}%</b> 유료 전환됨
              </span>
            </div>
          </template>
        </BasicTab>

        <UButton block color="primary" label="계산하기" size="lg" icon="i-heroicons-calculator" @click="calculate()" />
      </template>
      <template v-else-if="page === 'result'">
        <BasicLabel title="연간 구독 매출" :contents="연간구독매출 + '억 원'" />
        <BasicLabel title="1인당 월 구독료" :contents="월구독료 + '만 원'" />
        <BasicLabel title="모델" :contents="`${items[selected].label} (${items[selected].aka})`" />
        <UDivider />
        <BasicResultBanner>
          <template #name>필요 유료고객수</template>
          <template #resultValue>
            <span class="text-primary">
              <span class="font-bold tracking-tighter">{{ 필요유료고객수.toLocaleString() }}</span>
              <span class="text-base ml-1">명</span>
            </span>
          </template>
        </BasicResultBanner>
        <BasicResultBanner>
          <template #name>{{ items[selected].expression }}</template>
          <template #resultValue>
            <span class="font-bold tracking-tighter">{{ 필요모델고객수(items[selected].percent) }}</span>
            <span class="text-base ml-1">명</span>
          </template>
        </BasicResultBanner>
        <UDivider type="dashed" />
        <UButton
          block
          color="primary"
          label="뒤로가기"
          size="lg"
          icon="i-heroicons-arrow-left-16-solid"
          @click="page = 'intro'"
        />
        <UDivider type="dashed" />
        <BasicRefer :refers="refers" />
      </template>
      <HitBanner domain="customcal.vercel.app/micro-saas" color="cyan" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
