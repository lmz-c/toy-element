// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  define: {
    PROD:JSON.stringify(false),
    DEV:JSON.stringify(true),
    TEST:JSON.stringify(false),
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: [
      "**/*.test.{ts,tsx,js,jsx}",
      "**/*.spec.{ts,tsx,js,jsx}"
    ]
  },
});

// "test": "vitest --coverage"