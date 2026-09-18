import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  integrations: [
    icon({
      include: {
        lucide: [
          "badge-check",
          "circle-check",
          "copy",
          "download",
          "external-link",
          "info",
          "menu",
          "search",
          "settings",
          "triangle-alert",
          "upload",
          "x",
        ],
        "simple-icons": ["discord", "github"],
      },
    }),
  ],
});
