<script setup lang="ts"></script>
<template>
  <UPopover>
    <div class="text-gray-400">
      <UIcon name="i-ph-question-bold" />
    </div>
    <template #panel>
      <div class="p-3">
        <div>
          <b class="text-primary">추정계산식</b>
        </div>
        <UDivider class="py-1" />
        <UMeterGroup :min="0" :max="100" size="md">
          <UMeter :value="9" color="gray" label="부가세" />
          <UMeter :value="30" color="green" label="최대 인프런수수료" />
          <UMeter :value="21" color="red" label="평균 할인이벤트폭" />
          <UMeter :value="40" color="vviolet" label="예상 수익" />
        </UMeterGroup>
        <UDivider class="py-1" />
        <div class="text-md text-gray-400">강의가격 X 강의수강생 X <span class="text-vviolet-500">40%</span></div>
        <div class="text-xs text-gray-400">추정할뿐 실제 수익과는 오차가 클 수 있습니다.</div>
      </div>
    </template>
  </UPopover>
</template>

<style lang="scss" scoped></style>
