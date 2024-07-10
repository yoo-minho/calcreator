<script setup lang="ts">
import { inject } from "@vercel/analytics";

inject();
</script>
<template>
  <Header />
  <div class="flex justify-center">
    <div class="min-w-xs max-w-lg w-full">
      <UNotifications />
      <slot />
    </div>
  </div>
  <MadeBanner />
</template>

<style lang="scss" scoped></style>
