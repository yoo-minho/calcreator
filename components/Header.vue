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
  if (nuxtApp.$pwa) {
    nuxtApp.$pwa.install();
  }
};

const isPWAUnInstalled = ref(false);

onMounted(() => {
  const nuxtApp = useNuxtApp();
  isPWAUnInstalled.value = nuxtApp.$pwa?.isPWAInstalled === false;
});

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <div class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50">
    <div class="mx-auto px-4 max-w-7xl flex items-center justify-between gap-3 h-[4rem]">
      <div class="flex items-center gap-1 font-bold w-full">
        <template v-if="$route.path === '/'">
          <div class="w-full"></div>
        </template>
        <template v-else>
          <div class="flex-1 text-2xl cursor-pointer tracking-tighter" @click="$router.push('/')">calcreator</div>
        </template>
        <UButton v-if="isPWAUnInstalled" color="gray" size="sm" @click="install()" variant="ghost" class="flex-col">
          <UIcon name="i-ph-download-simple" dynamic class="text-xl" />
          <span class="tracking-tighter">앱설치</span>
        </UButton>
        <UButton
          color="gray"
          size="sm"
          icon="i-heroicons-clipboard-document-check"
          @click="copyLink()"
          variant="ghost"
          class="flex-col"
        >
          <span class="tracking-tighter">공유</span>
        </UButton>
        <UButton
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          color="gray"
          variant="ghost"
          class="flex-col"
          @click="isDark = !isDark"
        >
          <span class="tracking-tighter text-sm">{{ isDark ? "어둠" : "밝음" }}</span>
        </UButton>
      </div>
    </div>
  </div>
</template>
<style></style>
