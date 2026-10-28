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
        terms: resolve(import.meta.dirname, "nutzungsbedingungen.html"),
        deletion: resolve(import.meta.dirname, "datenloeschung.html"),
        notFound: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
