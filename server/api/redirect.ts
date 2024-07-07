import { defineEventHandler, parseCookies } from "h3";

export default defineEventHandler((event) => {
  const cookies = parseCookies(event);
  const calcreatorPage = cookies["calcreator-page"];

  if (calcreatorPage && calcreatorPage !== "/") {
    return { redirect: calcreatorPage };
  }
  return { redirect: null };
});
