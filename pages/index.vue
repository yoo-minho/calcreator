<script setup lang="ts"></script>

<template>
  <div>
    <LandingHero>
      <span class="text-base font-light">"그거 계산해보면 좋겠다" 하면 만들어버리는</span>
      <span>계산기 창조자</span>
      <span class="text-base font-light">작품 모음</span>
    </LandingHero>
    <div class="flex flex-col gap-3">
      <UButton class="w-full" color="vviolet" variant="outline" size="xl" to="/income">
        <div class="flex gap-2 justify-between w-full">
          <UIcon name="i-heroicons-presentation-chart-bar" dynamic size="1.5rem" />
          <span class="flex-1 text-left">중위소득 · 도시월평균소득 계산기</span>
          <UIcon name="i-ph-arrow-circle-right-fill" dynamic size="1.5rem" />
        </div>
      </UButton>

      <UButton class="w-full" color="green" variant="outline" size="xl" to="/inf">
        <div class="flex gap-2 justify-between w-full">
          <UIcon name="i-ph-user-circle-check-light" dynamic size="1.5rem" />
          <span class="flex-1 text-left">인프런 지식공유자 예상수익 계산기</span>
          <UIcon name="i-ph-arrow-circle-right-fill" dynamic size="1.5rem" />
        </div>
      </UButton>

      <UButton class="w-full" color="gray" variant="outline" size="xl" to="https://naver.me/Gpfd5bxD" target="form">
        <div class="flex gap-2 justify-between w-full">
          <UIcon name="i-heroicons-envelope-open" dynamic size="1.5rem" />
          <span class="flex-1 text-left">"그거 계산해보면 좋겠다" 제안하기</span>
          <UIcon name="i-ph-arrow-circle-right-fill" dynamic size="1.5rem" />
        </div>
      </UButton>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
