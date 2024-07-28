<script setup lang="ts">
import { version } from "@/package.json";

const goUpdateNote = () => {
  const router = useRouter();
  router.push("/update-note");
};

const cheerUp = () => {
  const toast = useToast();
  toast.add({
    id: "info",
    title: "감사합니다! 열심히 만들게요!",
    icon: "i-fluent-emoji-flat-grinning-face",
  });
  useBombPetal();
};
</script>

<template>
  <UDivider />
  <div class="flex items-center gap-2 justify-center my-1 sm:my-3">
    <UButton color="white" size="sm" class="py-[2px]" @click="goUpdateNote">
      <div>v{{ version }}</div>
    </UButton>
    <UButton color="white" to="https://www.threads.net/@irontaek" target="blog" class="py-[2px]" size="sm">
      <div class="tracking-tighter">made by 유철택</div>
      <UIcon name="i-ph-threads-logo-bold" class="text-xl m-[-4px]" />
    </UButton>
    <UButton color="white" @click="cheerUp()">
      <UIcon name="i-fluent-emoji-flat-heart-suit" />
    </UButton>
  </div>
</template>

<style lang="scss" scoped></style>
