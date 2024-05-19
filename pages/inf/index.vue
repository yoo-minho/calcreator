<script setup lang="ts">
import { 지식공유자들 } from "./data/지식공유자";

const goInf = () => {
  window.open("https://www.inflearn.com/open-knowledge", "inf");
};

const searchWord = ref("");
const targetArr = ref(지식공유자들);
watch(searchWord, () => {
  targetArr.value = 지식공유자들.filter((tg) => tg.name.includes(searchWord.value));
});

const routerPush = (id: string) => {
  location.href = `${id}`;
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <LandingHero>
      <span class="text-4xl">예상수익 자극받고</span>
      <span class="text-4xl text-green-500">지식공유 시작하자</span>
      <UButton class="mt-3 w-full" color="white" @click="goInf()">
        <div class="text-center text-green-500 w-full">인프런에서 지식공유하려면? click!</div>
      </UButton>
    </LandingHero>
    <SearchInput v-model="searchWord" />

    <div class="flex flex-wrap gap-1 mt-3">
      <template v-for="tg in targetArr">
        <UButton color="white" variant="solid" @click="routerPush(`inf/${tg.id}`)">
          {{ tg.name }}
        </UButton>
      </template>
    </div>
    <div class="flex justify-center pt-3">
      <a href="https://hits.sh/customcal.vercel.app/inf/">
        <img
          alt="Hits"
          src="https://hits.sh/customcal.vercel.app/inf.svg?view=today-total&style=flat-square&color=22C55E"
        />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
