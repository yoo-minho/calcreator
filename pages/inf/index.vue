<script setup lang='ts'>
import KnowledgeUser from './components/KnowledgeUser.vue';

const goInf = () => {
    window.open('https://www.inflearn.com/open-knowledge', 'inf');
}
</script>

<template>
    <div class="flex flex-col gap-3">
        <UCard :ui="{ background: 'bg-green-500' }">
            <div class="text-white">
                <div class="text-2xl font-bold text-center">네임드들에게 자극 받고<br />지식 공유를 시작하자!</div>
                <UButton class="mt-3 w-full" color="white" @click="goInf()">
                    <div class="text-center text-green-500 w-full">
                        인프런에서 지식공유하려면? click!
                    </div>
                </UButton>
            </div>
        </UCard>
        <div>
            <div class="text-md text-right text-gray-400 flex justify-between">
                <div>
                    <UIcon name="i-ph-sort-descending-bold" dynamic /> 수익적은순
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
        <KnowledgeUser :id="209585" name="최상용" sales="0.5" />
        <KnowledgeUser :id="432199" name="짐코딩" sales="2.3" />
        <KnowledgeUser :id="31989" name="유인동" sales="2.8" />
        <KnowledgeUser :id="182068" name="이정환" sales="2.7" />
        <KnowledgeUser :id="292818" name="얄팍한코딩사전" sales="4.2" />
        <KnowledgeUser :id="217966" name="John Ahn" sales="5.5" />
        <KnowledgeUser :id="22632" name="1분코딩" sales="6.7" />
        <KnowledgeUser :id="14793" name="조현영" sales="7.7" />
        <KnowledgeUser :id="865030" name="널널한개발자" sales="9.8" />
        <KnowledgeUser :id="60049" name="잔재미코딩" sales="12.3" />
        <KnowledgeUser :id="54224" name="장기효" sales="15" />
        <KnowledgeUser :id="20183" name="백기선" sales="29" />
        <KnowledgeUser :id="230375" name="Rookiss" sales="34" />
        <KnowledgeUser :id="74366" name="김영한" sales="150" />
    </div>
</template>

<style lang='scss' scoped></style>
