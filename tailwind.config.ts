import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        vviolet: {
          "50": "#edeeff",
          "100": "#dee0ff",
          "200": "#c3c5ff",
          "300": "#9e9eff",
          "400": "#8378ff",
          "500": "#6449fc",
          "600": "#6439f2",
          "700": "#562cd6",
          "800": "#4627ac",
          "900": "#3c2788",
          "950": "#25174f",
        },
      },
    },
  },
};
