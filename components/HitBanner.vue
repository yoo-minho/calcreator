<script setup lang="ts">
defineProps<{ domain: string; color: string }>();
</script>
<template>
  <div class="flex justify-center pt-3">
    <a :href="`https://hits.sh/${domain}`">
      <img alt="Hits" :src="`https://hits.sh/${domain}.svg?view=today-total&style=flat-square&color=${color}`" />
    </a>
  </div>
</template>

<style lang="scss" scoped></style>
