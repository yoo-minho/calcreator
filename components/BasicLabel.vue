<script setup lang="ts">
defineProps<{ title: string; contents?: string; help?: string }>();
</script>
<template>
  <div class="text-xl leading-7 flex flex-wrap items-center justify-between">
    <div class="font-bold" :class="{ 'flex-1': !$slots.tooltip }">{{ title }}</div>
    <UPopover v-if="$slots.tooltip" class="flex-1">
      <UButton color="primary" size="md" variant="ghost" icon="i-heroicons-question-mark-circle" />
      <template #panel>
        <div class="p-3 text-base">
          <slot name="tooltip" />
        </div>
      </template>
    </UPopover>
    <div class="pl-3">{{ contents }}</div>
  </div>
  <div v-if="help" class="text-xs text-gray-400 mb-2">{{ help }}</div>
</template>
<style lang="scss" scoped></style>
