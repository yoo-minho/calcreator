<script setup lang="ts">
const isLoading = defineModel();
</script>
<template>
  <div
    v-if="isLoading"
    class="fixed w-full h-full flex items-center justify-center min-h-screen bg-black/50 inset-0"
    style="z-index: 51"
  >
    <span class="rounded-full w-24 h-24 border-primary border-8 flex justify-center items-center text-primary"> </span>
    <span
      class="rounded-full w-24 h-24 animate-spin flex justify-center items-center absolute opacity-25"
      style="border: 8px solid transparent; border-top-color: black"
    >
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
