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
  if (nuxtApp.$pwa) {
    let showInstallPrompt = false;
    nuxtApp.$pwa.install().then(() => {
      showInstallPrompt = true;
    });
    setTimeout(() => {
      if (!showInstallPrompt) {
        isOpen.value = true;
      }
    }, 500);
  } else {
    isOpen.value = true;
  }
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
          <UButton class="flex-col items-center p-0" size="sm" variant="ghost" @click="$router.push('/')">
            <div class="text-2xl cursor-pointer tracking-tighter mb-[-4px]">calcreator</div>
            <span class="tracking-tighter text-xs">다른 계산기 보러가기</span>
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
