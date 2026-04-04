import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import react from "@vitejs/plugin-react";
import path from "node:path";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "development" && screenGraphPlugin()],
  publicDir: "./static",
  base: "/",
  resolve: {
    alias: {
      "liquid-glass-react": path.resolve(__dirname, "src/vendor/liquid-glass-react/index.tsx"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
}));
