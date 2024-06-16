<script setup lang="ts">
const isOpen = defineModel<boolean>();
defineProps<{ currencyArr: any; currentCurrencyUnit: string }>();
const emits = defineEmits<{ (e: "submit", currencyUnit: string): void }>();

const submit = (currency: any) => {
  isOpen.value = false;
  emits("submit", currency.unit);
};

const selected = ref(false);
</script>
<template>
  <div>
    <UModal v-model="isOpen" :ui="{ container: 'items-center' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-300' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">화폐 선택</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div class="flex flex-col gap-1">
          <template v-for="currency in currencyArr">
            <UButton
              class="flex gap-3"
              :variant="currentCurrencyUnit === currency.unit ? 'solid' : 'soft'"
              color="primary"
              @click="submit(currency)"
            >
              <IconRoundFull :flag="currency.flag" />
              <span>{{ currency.unit }}</span>
              <span>{{ currency.name }}</span>
            </UButton>
          </template>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
