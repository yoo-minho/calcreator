import { useCookie } from "#app";

export default defineNuxtRouteMiddleware(() => {
  const page = useCookie("calcreator-page");
  page.value = "";
});
