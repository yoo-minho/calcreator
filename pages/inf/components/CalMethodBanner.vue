<script setup lang="ts"></script>
<template>
  <UPopover>
    <div class="text-gray-400"><UIcon name="i-ph-question-bold" dynamic /></div>
    <template #panel>
      <div class="p-3">
        <div>
          <b class="text-primary">추정계산식</b>
        </div>
        <UDivider class="py-1" />
        <div class="text-md text-gray-400">강의가격 X 강의수강생 X 70% X 96.7%</div>
        <div class="text-xs text-gray-400">추정할뿐 실제 수익과는 오차가 클 수 있습니다.</div>
      </div>
    </template>
  </UPopover>
</template>

<style lang="scss" scoped></style>
