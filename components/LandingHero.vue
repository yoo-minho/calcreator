<script setup lang="ts">
defineProps<{ chip?: { label: string; color: string }; slgn?: string; }>();
</script>

<template>
  <div class="mx-auto px-4 flex flex-col max-w-4xl mb-6 mt-3">
    <div class="text-center relative z-[1]">
      <template v-if="chip">
        <UChip :text="chip.label" size="2xl" :color="chip.color">
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 flex flex-col">
            <slot />
          </h1>
        </UChip>
      </template>
      <template v-else>
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 flex flex-col">
          <slot />
        </h1>
      </template>
      <template v-if="slgn">
        <p class="mt-6 text-lg tracking-tight text-gray-600">{{ slgn }}</p>
      </template>
    </div>
  </div>
</template>
<style></style>
