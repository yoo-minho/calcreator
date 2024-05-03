<script setup lang="ts">
defineProps<{ chip?: string }>();
</script>

<template>
  <div class="mx-auto px-4 flex flex-col max-w-4xl my-6">
    <div class="text-center relative z-[1]">
      <template v-if="chip">
        <UChip :text="chip" size="2xl">
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 mt-3">
            <slot />
          </h1>
        </UChip>
      </template>
      <template v-else>
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 mt-3">
          <slot /></h1
      ></template>
    </div>
  </div>
</template>
<style></style>
