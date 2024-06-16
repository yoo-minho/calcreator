<script setup lang="ts">
const isOpen = defineModel<boolean>();
const fixPrice = defineModel<number>("fix");
const emits = defineEmits<{ (e: "submit"): void }>();
const submit = () => {
  emits("submit");
  isOpen.value = false;
};
</script>
<template>
  <div>
    <UModal v-model="isOpen" :ui="{ container: 'items-center' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-300' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">환율 직접 입력</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div class="flex gap-2">
          <UInput class="flex-1" autofocus v-model="fixPrice" type="number" />
          <UButton @click="submit">완료</UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
