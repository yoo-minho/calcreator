<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    title2?: string;
    desc?: string;
    colorCode?: string;
    colorCode2?: string;
    chip?: string;
  }>(),
  {
    title: "calcreator.cc",
    title2: "",
    desc: "계산기로 널리 이롭게",
    colorCode: "black",
    colorCode2: "black",
  }
);
</script>

<template>
  <div class="h-full w-full flex items-center justify-center">
    <div class="flex items-center justify-center h-full">
      <div class="flex flex-col justify-center items-center px-20 w-full h-full text-center">
        <div v-if="chip" class="text-[36px] leading-[36px]" style="color: black">{{ chip }}</div>
        <div class="text-[108px] leading-[108px] font-bold tracking-tighter" :style="{ color: colorCode }">
          {{ title }}
        </div>
        <div
          v-if="title2"
          class="text-[108px] leading-[108px] font-bold tracking-tighter mt-[-24px]"
          :style="{ 'margin-top': '-24px', color: colorCode2 }"
        >
          {{ title2 }}
        </div>
        <div class="text-[32px] leading-[32px] mt-[24px] whitespace-pre" style="color: rgb(75, 85, 99)">
          {{ desc }}
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
