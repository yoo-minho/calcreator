<script setup lang="ts"></script>
<template>
  <Header />
  <div class="flex justify-center">
    <div class="min-w-xs max-w-lg w-full">
      <UNotifications />
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
