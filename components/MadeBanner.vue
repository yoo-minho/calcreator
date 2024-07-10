<script setup lang="ts">
const goUpdateNote = () => {
  const router = useRouter();
  router.push("/update-note");
};
</script>

<template>
  <div class="flex items-center my-3 gap-2 justify-center">
    <UButton color="white" size="sm" class="py-[2px]" @click="goUpdateNote">
      <div>v0.0.2</div>
    </UButton>
    <UButton color="white" to="https://www.threads.net/@irontaek" target="blog" class="py-[2px]" size="sm">
      <div class="tracking-tighter">made by 유철택</div>
      <UIcon name="i-ph-threads-logo-bold" class="text-xl m-[-4px]" />
    </UButton>
  </div>
</template>

<style lang="scss" scoped></style>
