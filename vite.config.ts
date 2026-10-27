import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    sourcemap: false,
    rolldownOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        imprint: resolve(import.meta.dirname, "impressum.html"),
        privacy: resolve(import.meta.dirname, "datenschutz.html"),
        notFound: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
