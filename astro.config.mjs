import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  base: "/doc-cannonphp",
  integrations: [
    starlight({
      title: "CannonPHP",
      social: {
        github: "https://github.com/cannonmaster/CannonPHP",
      },
      sidebar: [
        {
          label: "The basics",
          translations: { zh: "基本" },
          autogenerate: { directory: "basics" },
          // items: [
          //   // Each item here is one entry in the navigation menu.
          //   { label: "Example Guide", link: "guides/example/" },
          // ],
        },
        {
          label: "Cascade ORM",
          translations: { zh: "Cascase ORM" },
          autogenerate: { directory: "cascadeorm" },
        },
        // {
        //   label: "Reference",
        //   autogenerate: { directory: "reference" },
        // },
      ],
      defaultLocale: "en",
      locales: {
        // English docs in `src/content/docs/en/`
        en: {
          label: "English",
          lang: "en",
        },
        // Simplified Chinese docs in `src/content/docs/zh/`
        zh: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
    }),
  ],

  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: { service: { entrypoint: "astro/assets/services/sharp" } },
});
