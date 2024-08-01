<script setup lang="ts">
import { version } from "@/package.json";

const goUpdateNote = () => {
  const router = useRouter();
  router.push("/update-note");
};
</script>

<template>
  <UDivider />
  <div class="flex items-center gap-2 justify-center h-[60px]">
    <UButton color="white" size="sm" @click="navigateTo('/main')" class="flex flex-col" variant="ghost">
      <UIcon name="i-ph-calculator" class="text-xl" />
      <div class="tracking-tighter text-xs">다른 계산기</div>
    </UButton>
    <UButton
      color="white"
      to="https://www.threads.net/@irontaek"
      target="blog"
      size="sm"
      class="flex flex-col"
      variant="ghost"
    >
      <UIcon name="i-ph-threads-logo-bold" class="text-xl" />
      <div class="tracking-tighter text-xs">만든이 유철택</div>
    </UButton>
    <UButton color="white" size="sm" variant="ghost" class="flex flex-col" @click="goUpdateNote">
      <UIcon name="i-fluent-emoji-flat-heart-suit" class="text-xl" />
      <div>v{{ version }}</div>
    </UButton>
  </div>
</template>

<style lang="scss" scoped></style>
