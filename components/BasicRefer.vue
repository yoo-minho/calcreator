<script setup lang="ts">
type PropsType = {
  refers: {
    title: string;
    author: string;
    url: string;
  }[];
};

defineProps<PropsType>();
</script>
<template>
  <div>
    <div class="text-xl font-bold leading-7 mb-2">참고</div>
    <div class="flex flex-col gap-3">
      <template v-for="r in refers">
        <UCard :ui="{ body: { padding: 'p-3 sm:p-3' }, background: 'bg-white dark:bg-gray-900' }">
          <div class="flex w-full flow-wrap gap-1">
            <div class="truncate flex-1 tracking-tighter">{{ r.title }}</div>
            <a class="text-primary-600" :href="r.url" :target="r.title"> 링크 </a>
          </div>
          <div class="text-gray-400 text-sm mt-[-4px]">by {{ r.author }}</div>
        </UCard>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
