<script setup lang="ts">
const toast = useToast();

const copyLink = async () => {
  await navigator.clipboard.writeText(location.href);
  toast.add({
    id: "copyLink",
    title: "링크 복사! 공유를 시작하세요!",
    icon: "i-heroicons-check-circle",
  });
  useBombPetal();
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

const isPWAUnInstalled = ref(false);
const route = useRoute();
watch(
  () => route.path,
  () => {
    const nuxtApp = useNuxtApp();
    if (route.path.includes("inf") && route.params.id) {
      isPWAUnInstalled.value = false;
    } else {
      isPWAUnInstalled.value = nuxtApp.$pwa?.isPWAInstalled === false;
    }
  },
  { immediate: true }
);

const seo = useSeoStore() as Ref<{ title: string; title2: string; icon: string }>;
</script>

<template>
  <ModalInstallModal v-model="isOpen" />
  <div class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50">
    <div class="mx-auto px-4 max-w-7xl flex items-center justify-between gap-3 h-[60px]">
      <div class="flex items-center w-full flex-wrap">
        <template v-if="route.path === '/' || route.path === '/main' || route.path === '/update-note' || !seo">
          <div class="flex-1"></div>
        </template>
        <template v-else-if="seo">
          <div class="flex-1">
            <UButton color="gray" size="sm" variant="ghost" class="p-0">
              <span class="text-xl flex flex-col items-start">
                <span class="font-bold tracking-tighter text-primary text-base mb-[-8px]">{{ seo.title }}</span>
                <span class="font-bold tracking-tighter text-base">{{ seo.title2 }}</span>
              </span>
            </UButton>
          </div>
        </template>
        <div class="flex gap-1">
          <UButton v-if="isPWAUnInstalled" color="primary" @click="install()">
            <span class="text-sm">앱설치</span>
          </UButton>
          <UButton color="gray" variant="ghost" @click="copyLink()">
            <span class="text-sm">공유</span>
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
