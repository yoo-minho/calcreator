<script setup lang="ts">
const goHome = () => {
  window.location.reload();
};
</script>

<template>
  <div
    class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-primary-200/75"
  >
    <div
      class="mx-auto px-4 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]"
    >
      <div class="flex items-center gap-2 font-bold">
        <div class="text-2xl cursor-pointer" @click="goHome()">customcal</div>
        <UBadge
          label="v0.1.0"
          variant="subtle"
          size="xs"
          class="-mb-[2px] rounded font-semibold"
        />
      </div>
    </div>
  </div>
</template>
<style></style>
