<script setup lang="ts">
const toast = useToast();

const copyLink = async () => {
  await navigator.clipboard.writeText(location.href);
  toast.add({
    id: "copyLink",
    title: "링크 복사 완료! 공유를 시작하세요!",
    icon: "i-heroicons-check-circle",
  });
};

const install = async () => {
  const nuxtApp = useNuxtApp();
  await nuxtApp.$pwa?.install();
};

const isPWAUnInstalled = ref(false);

onMounted(() => {
  const nuxtApp = useNuxtApp();
  isPWAUnInstalled.value = nuxtApp.$pwa?.isPWAInstalled === false;
});
</script>

<template>
  <div class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-primary-200/75">
    <div class="mx-auto px-4 max-w-7xl flex items-center justify-between gap-3 h-[4rem]">
      <div class="flex items-center gap-2 font-bold w-full">
        <div class="flex-1 text-2xl cursor-pointer tracking-tighter" @click="$router.push('/')">calcreator</div>
        <div v-if="isPWAUnInstalled">
          <UButton color="black" size="sm" @click="install()">
            <UIcon name="i-ph-download-simple" dynamic class="text-xl" />
            앱 설치
          </UButton>
        </div>
        <div>
          <UButton color="black" size="sm" icon="i-heroicons-clipboard-document-check" @click="copyLink()">
            공유하기
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
