<script setup lang="ts">
import { delay } from "~/util/CommUtil";

const page = useCookie("calcreator-page");
await delay(5000);
if (page.value && page.value !== "/" && page.value !== "/main") {
  await navigateTo(page.value, { replace: true, redirectCode: 301 });
} else {
  await navigateTo("/main", { replace: true, redirectCode: 302 });
}
</script>
