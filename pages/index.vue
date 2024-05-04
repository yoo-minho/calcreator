<script setup lang='ts'>


const click2 = () => {
    window.open('/inf', '_self')
}
</script>

<template>
    <div>
        <LandingHero>
            <span class="text-base font-light">"그거 계산해보면 좋겠다" 하면 만들어버리는</span>
            <span>커스텀 계산기</span>
        </LandingHero>
        <div class="flex flex-col gap-3">
            <UButton class="w-full" color="vviolet" variant="outline" size="xl" to="/income">
                <div class="flex gap-2 justify-between w-full">
                    <UIcon name="i-heroicons-presentation-chart-bar" dynamic size="1.5rem" />
                    <span class="flex-1 text-left">첫번째. 중위소득 계산기</span>
                    <UIcon name="i-ph-arrow-circle-right-fill" dynamic size="1.5rem" />
                </div>
            </UButton>

            <UButton class="w-full" color="green" variant="outline" size="xl" @click="click2">
                <div class="flex gap-2 justify-between w-full">
                    <UIcon name="i-ph-user-circle-check-light" dynamic size="1.5rem" />
                    <span class="flex-1 text-left">두번째. 인프런 지식공유자 예상수익 계산기</span>
                    <UIcon name="i-ph-arrow-circle-right-fill" dynamic size="1.5rem" />
                </div>
            </UButton>
        </div>
    </div>
</template>

<style lang='scss' scoped></style>
