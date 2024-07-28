<script setup lang="ts">
const isOpen = defineModel<boolean>();
defineProps<{ currencyArr: any; currentCurrencyUnit: string }>();
const emits = defineEmits<{ (e: "submit", currencyUnit: string): void }>();

const submit = (currency: any) => {
  isOpen.value = false;
  emits("submit", currency.unit);
};
</script>
<template>
  <div>
    <UModal v-model="isOpen" :ui="{ container: 'items-center' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-300' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900">화폐 선택</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpen = false" />
          </div>
        </template>
        <div class="grid grid-cols-3 gap-1">
          <template v-for="currency in currencyArr">
            <div class="flex flex-col shadow border p-2 items-center rounded text-sm text-center"
              :class="currentCurrencyUnit === currency.unit ? 'bg-primary text-white' : ''" @click="submit(currency)">
              <IconRoundFull :flag="currency.flag" />
              <span class="text-xs">{{ currency.unit }}</span>
              <span class="text-xs break-keep">{{ currency.name }} ({{ currency.unitName }})</span>
            </div>
          </template>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
