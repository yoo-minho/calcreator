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

const isOpen = ref(false);

const install = async () => {
  localStorage.removeItem("true");
  const nuxtApp = useNuxtApp();
  if (nuxtApp.$pwa && nuxtApp.$pwa.showInstallPrompt) {
    nuxtApp.$pwa.install();
  } else {
    isOpen.value = true;
  }
};

const goHome = async () => {
  await navigateTo("/");
};

const isPWAUnInstalled = ref(false);

onMounted(() => {
  const nuxtApp = useNuxtApp();
  isPWAUnInstalled.value = nuxtApp.$pwa?.isPWAInstalled === false;
});
</script>

<template>
  <ModalInstallModal v-model="isOpen" />
  <div class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50">
    <div class="mx-auto px-4 max-w-7xl flex items-center justify-between gap-3 h-[4rem]">
      <div class="flex items-center font-bold w-full">
        <template v-if="$route.path === '/'"> </template>
        <template v-else>
          <UButton color="gray" size="sm" @click="goHome" variant="ghost" class="flex-col p-0">
            <UIcon name="i-ph-calculator" class="text-xl" />
            <span class="tracking-tighter text-xs">다른계산기</span>
          </UButton>
        </template>
        <div class="flex-1"></div>
        <UButton v-if="isPWAUnInstalled" color="gray" size="sm" @click="install()" variant="ghost" class="flex-col">
          <UIcon name="i-ph-download-simple" class="text-xl" />
          <span class="tracking-tighter text-xs">앱설치</span>
        </UButton>
        <UButton
          color="gray"
          size="sm"
          icon="i-heroicons-clipboard-document-check"
          @click="copyLink()"
          variant="ghost"
          class="flex-col"
        >
          <span class="tracking-tighter text-xs">공유</span>
        </UButton>
      </div>
    </div>
  </div>
</template>
<style></style>
