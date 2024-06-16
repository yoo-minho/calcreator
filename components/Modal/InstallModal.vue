<script setup lang="ts">
const isOpen = defineModel();
</script>

<template>
  <div>
    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-300' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">초간단 앱 설치방법</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div class="flex flex-col gap-2 tracking-tighter text-sm">
          <div class="flex items-center gap-2">
            <span>1. 브라우저</span>
            <UButton variant="outline"><UIcon name="i-mingcute-upload-line" /></UButton>
            <span>또는</span>
            <UButton variant="outline"><UIcon name="i-mingcute-more-2-fill" /></UButton>
            <span>버튼 클릭</span>
          </div>
          <div class="flex items-center gap-2">
            <span>2. 아래로 스크롤 </span>
            <UButton variant="outline">홈 화면에 추가 <UIcon name="i-ph-plus-square" /></UButton>
            <span>버튼 클릭</span>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
