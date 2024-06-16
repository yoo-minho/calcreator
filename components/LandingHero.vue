<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    title2?: string;
    desc?: string;
    colorCode?: string;
    colorCode2?: string;
    chip?: { label: string; color: string };
  }>(),
  {
    title: "calcreator.cc",
    title2: "",
    desc: "",
    colorCode: "black",
    colorCode2: "black",
  }
);

const colorCode = props.colorCode === "primary" ? "rgb(var(--color-primary-DEFAULT))" : props.colorCode;
const colorCode2 = props.colorCode2 === "primary" ? "rgb(var(--color-primary-DEFAULT))" : props.colorCode2;
</script>

<template>
  <div class="mx-auto px-4 flex flex-col max-w-4xl my-6">
    <div class="text-center relative z-[1]">
      <template v-if="chip">
        <UChip :text="chip.label" size="2xl" :color="chip.color">
          <h1 class="text-5xl font-bold tracking-tighter text-gray-900 flex flex-col">
            <slot v-if="$slots.default" />
            <template v-else>
              <span class="tracking-tighter" :style="{ color: colorCode }">{{ title }}</span>
              <span class="tracking-tighter" :style="{ color: colorCode2 }">{{ title2 }}</span>
            </template>
          </h1>
        </UChip>
      </template>
      <template v-else>
        <h1 class="text-5xl font-bold tracking-tighter text-gray-900 flex flex-col">
          <slot v-if="$slots.default" />
          <template v-else>
            <span class="tracking-tighter" :style="{ color: colorCode }">{{ title }}</span>
            <span class="tracking-tighter" :style="{ color: colorCode2 }">{{ title2 }}</span>
          </template>
        </h1>
      </template>
      <template v-if="desc">
        <p class="mt-3 text-sm tracking-tight text-gray-600 break-keep whitespace-pre">{{ desc }}</p>
      </template>
    </div>
  </div>
</template>
<style></style>
