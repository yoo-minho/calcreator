<script setup lang="ts">
defineProps<{ title: string; count: number; unit: string; mode: "선택" | "조회", icon: { on: string, off: string } }>();
const selected = defineModel<number>({ default: 1 });
</script>

<template>
  <div>
    <div class="text-xl leading-7 flex gap-3">
      <div class="font-bold">{{ title }}</div>
      <div>{{ selected }}{{ unit }}</div>
    </div>
    <div v-if="mode === '선택'">
      <div class="flex">
        <template v-for="i in count">
          <template v-if="i <= selected">
            <div class="flex-1 text-4xl cursor-pointer flex justify-center items-center text-primary "
              @click="selected = selected === i && i > 1 ? i - 1 : i">
              <UIcon :name="icon.on" dynamic />
            </div>
          </template>
          <template v-else>
            <div class="flex-1 text-4xl cursor-pointer flex justify-center items-center" @click="selected = i">
              <UIcon :name="icon.off" dynamic />
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style></style>
