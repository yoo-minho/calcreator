<script setup lang="ts">
defineProps<{ title: string; title2?: string; }>();
</script>
<template>
  <h1 class="font-bold flex flex-col items-center justify-center">
    <span class="break-keep tracking-tighter text-primary text-3xl mb-[-4px]">{{ title }}</span>
    <span class="break-keep tracking-tighter  text-black text-3xl">{{ title2 }}</span>
  </h1>
</template>
<style lang="scss" scoped></style>
