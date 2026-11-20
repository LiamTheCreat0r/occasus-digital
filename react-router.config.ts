import type { Config } from "@react-router/dev/config";
import { allPaths } from "./app/lib/paths";

export default {
  // Static hosting (GitHub Pages): no runtime server, every page pre-rendered.
  ssr: false,
  prerender: {
    paths: allPaths(),
    concurrency: 8,
  },
} satisfies Config;
