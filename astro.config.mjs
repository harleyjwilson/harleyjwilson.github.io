import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/consts";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: "/harleyjwilsoncom",
  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
    },
  },
  integrations: [sitemap()],
});
