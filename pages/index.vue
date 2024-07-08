<script setup lang="ts">
const page = useCookie("calcreator-page");
if (page.value && page.value !== "/" && page.value !== "/main") {
  await navigateTo(page.value, { replace: true, redirectCode: 301 });
} else {
  await navigateTo("/main", { replace: true, redirectCode: 302 });
}
</script>
<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
