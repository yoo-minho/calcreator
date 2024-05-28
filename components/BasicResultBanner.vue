<script setup lang="ts"></script>
<template>
  <div class="flex flex-wrap items-center justify-between">
    <div class="flex gap-1 items-center">
      <UBadge size="lg"><slot name="name" /></UBadge>
      <UPopover v-if="$slots.tooltip">
        <UButton color="primary" size="md" variant="ghost" icon="i-heroicons-question-mark-circle" />
        <template #panel>
          <div class="p-3">
            <slot name="tooltip" />
          </div>
        </template>
      </UPopover>
    </div>
    <div class="text-5xl tracking-tight text-gray-900">
      <slot name="resultValue" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
