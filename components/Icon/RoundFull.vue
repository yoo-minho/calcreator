<script setup lang="ts">
defineProps<{ flag: string }>();
</script>
<template>
  <UIcon :name="flag" class="w-[36px] h-[36px] border-solid border-gray-300 border rounded-full shadow" dynamic />
</template>
