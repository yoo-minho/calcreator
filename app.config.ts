export default defineAppConfig({
  ui: {
    primary: "vviolet",
    gray: "cool",
  },
  vercelAnalytics: {
    mode: "auto",
    debug: true,
    beforeSend: (event: { url: string | string[] }) => {
      if (event.url.includes("/private")) return null;

      return event;
    },
  },
});
