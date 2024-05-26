<script setup lang="ts">
const selected = defineModel();

type BaseInputType = {
  label?: string;
  items?: any[];
};

defineProps<BaseInputType>();
</script>
<template>
  <div>
    <div class="text-xl leading-7 flex items-center">
      <div class="font-bold">{{ label }}</div>
      <UPopover v-if="$slots.tooltip">
        <UButton color="primary" size="md" variant="ghost" icon="i-heroicons-question-mark-circle" />
        <template #panel>
          <div class="p-3 text-base">
            <slot name="tooltip" />
          </div>
        </template>
      </UPopover>
    </div>
    <UTabs :items="items" v-model="selected">
      <template #item="{ item }">
        <UCard>
          <slot name="tab-contents" :item="item" />
        </UCard>
      </template>
    </UTabs>
  </div>
</template>

<style lang="scss" scoped></style>
