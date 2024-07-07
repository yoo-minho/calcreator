import { defineEventHandler, sendRedirect } from "h3";

export default defineEventHandler((event) => {
  const cookies = parseCookies(event);
  const calcreatorPage = cookies["calcreator-page"];
  if (event.node.req.url === "/" || event.node.req.url === "") {
    if (calcreatorPage && calcreatorPage !== "/") {
      console.log("redirect", calcreatorPage);
      return sendRedirect(event, calcreatorPage);
    }
  }
});
