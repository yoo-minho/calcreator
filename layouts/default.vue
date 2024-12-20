<script setup lang="ts">
import { inject } from "@vercel/analytics";

inject();
</script>
<template>
  <div class="flex justify-center bg-gray-500">
    <div class="max-w-[430px] h-dvh w-full flex flex-col bg-white">
      <Header />
      <UNotifications />
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
      <MadeBanner />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
