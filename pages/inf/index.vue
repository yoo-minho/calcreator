<script setup lang='ts'>
import KnowledgeUser from './components/KnowledgeUser.vue';

const goInf = () => {
    window.open('https://www.inflearn.com/open-knowledge', 'inf');
}

const defaultTargetArr = [
    { id: "209585", name: "최상용", sales: "0.5" },
    { id: "432199", name: "짐코딩", sales: "2.3" },
    { id: "31989", name: "유인동", sales: "2.8" },
    { id: "182068", name: "이정환", sales: "2.7" },
    { id: "292818", name: "얄팍한코딩사전", sales: "4.2" },
    { id: "217966", name: "John Ahn", sales: "5.5" },
    { id: "22632", name: "1분코딩", sales: "6.7" },
    { id: "14793", name: "조현영", sales: "7.7" },
    { id: "865030", name: "널널한개발자", sales: "9.8" },
    { id: "60049", name: "잔재미코딩", sales: "12.3" },
    { id: "54224", name: "장기효", sales: "15" },
    { id: "20183", name: "백기선", sales: "29" },
    { id: "230375", name: "Rookiss", sales: "34" },
    { id: "74366", name: "김영한", sales: "150" },
    { id: "220802", name: "정수원", sales: "4.7" },
    { id: "431420", name: "데브원영", sales: "1.9" },
    { id: "438942", name: "데이터리안", sales: "3.7" },
    { id: "190123", name: "권철민", sales: "13" },
    { id: "414452", name: "이득우", sales: "5.4" },
    { id: "40572", name: "Dowon Lee", sales: "6.6" },
];

const searchWord = ref("");
const targetArr = ref(defaultTargetArr.sort((a, b) => +a.sales - +b.sales));
watch(searchWord, () => {
    targetArr.value = defaultTargetArr.filter(tg => tg.name.includes(searchWord.value));
})
</script>

<template>
    <div class="flex flex-col gap-3">
        <LandingHero>
            <span class="text-4xl">예상수익 자극받고</span>
            <span class="text-4xl text-green-500">지식공유 시작하자</span>
            <UButton class="mt-3 w-full" color="white" @click="goInf()">
                <div class="text-center text-green-500 w-full">
                    인프런에서 지식공유하려면? click!
                </div>
            </UButton>
        </LandingHero>
        <!-- <SearchInput v-model="searchWord" /> -->
        <div>
            <div class="text-xs text-right text-gray-400 flex justify-between">
                <div>
                    <UIcon name="i-ph-sort-descending-bold" dynamic /> 예상수익 오름차순
                </div>
                <div>
                    <UPopover>
                        <div>
                            <UIcon name="i-ph-circle-wavy-question-bold" dynamic /> 추정계산식
                        </div>
                        <template #panel>
                            <div class="p-3">
                                <div>
                                    <b class="text-green-600">추정계산식</b>
                                </div>
                                <UDivider class="py-1" />
                                <div class="text-md text-gray-400">
                                    강의가격 * 강의수강생 * 70% * 96.7%
                                </div>
                                <div class="text-xs text-gray-400">
                                    추정할뿐 실제 수익과는 오차가 클 수 있습니다.
                                </div>
                            </div>
                        </template>
                    </UPopover>

                </div>
            </div>
            <div class="text-md text-right text-gray-400">

            </div>
        </div>
        <template v-for="tg in targetArr">
            <KnowledgeUser :id="+tg.id" :name="tg.name" />
        </template>
        <div class="flex justify-center pt-3">
            <a href="https://hits.sh/customcal.vercel.app/inf/">
                <img alt="Hits"
                    src="https://hits.sh/customcal.vercel.app/inf.svg?view=today-total&style=flat-square&color=22C55E" />
            </a>
        </div>
    </div>
</template>

<style lang='scss' scoped></style>
