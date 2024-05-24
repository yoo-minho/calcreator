<script setup lang="ts">
const q = defineModel();

type BaseInputType = {
  label: string;
  help?: string;
  trailing: string;
  type: string;
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
          <div class="p-3">
            <slot name="tooltip" />
          </div>
        </template>
      </UPopover>
    </div>
    <div v-if="help" class="text-xs text-gray-400">{{ help }}</div>
    <UInput v-model="q" color="gray" variant="outline" :type="type" input-class="text-right" size="xl">
      <template #trailing v-if="trailing"> {{ trailing }} </template>
    </UInput>
  </div>
</template>

<style lang="scss" scoped></style>
