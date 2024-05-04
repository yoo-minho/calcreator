<script setup lang="ts">
const goHome = () => {
  useRouter().push('/');
};
</script>

<template>
  <div class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-primary-200/75">
    <div class="mx-auto px-4 max-w-7xl flex items-center justify-between gap-3 h-[4rem]">
      <div class="flex items-center gap-2 font-bold">
        <div class="text-2xl cursor-pointer" @click="goHome()">customcal</div>
      </div>
    </div>
  </div>
</template>
<style></style>
