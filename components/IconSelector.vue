<script setup lang="ts">
defineProps<{ title: string; count: number; unit: string; mode: "SELECT" | "READ" }>();
const selected = defineModel<number>();
</script>

<template>
  <div>
    <div class="text-xl leading-7 flex gap-3">
      <div class="font-bold">{{ title }}</div>
      <div>{{ selected }}{{ unit }}</div>
    </div>
    <div v-if="mode === 'SELECT'">
      <div class="flex">
        <template v-for="i in count"
          >e
          <template v-if="i <= selected">
            <div
              class="flex-1 text-4xl text-primary cursor-pointer"
              @click="selected = selected === i && i > 1 ? i - 1 : i"
            >
              <slot name="icon-on" />
            </div>
          </template>
          <template v-else>
            <div class="flex-1 text-4xl cursor-pointer" @click="selected = i">
              <slot name="icon-off" />
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style></style>
