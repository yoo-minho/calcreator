<script setup lang="ts">
const page = useCookie("calcreator-page");
if (page.value && page.value !== "/") {
  await navigateTo(page.value, { replace: true, redirectCode: 301 });
}
</script>
<template>
  <div>wait...</div>
</template>

<style lang="scss" scoped></style>
