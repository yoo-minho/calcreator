<script setup lang="ts">
import { inject } from "@vercel/analytics";

inject();
</script>
<template>
  <div class="flex flex-col h-dvh">
    <Header />
    <UNotifications />
    <div class="flex justify-center flex-1 overflow-y-auto">
      <div class="min-w-xs max-w-[430px] w-full">
        <slot />
      </div>
    </div>
    <MadeBanner />
  </div>
</template>

<style lang="scss" scoped></style>
