/// <reference types="vitest" />
import { defineConfig } from "vite";
import {resolve} from 'path'
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  define: {
    PROD: JSON.stringify(false),
    DEV: JSON.stringify(false),
    TEST: JSON.stringify(true),
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles:[resolve(__dirname, './vitest.setup.ts')]
  },
  build: {
    // ...你的 build 配置
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            {
              src: "packages/components/Alert/style.css",
              dest: "dist/theme"
            },
            // 如果有多个组件样式，可以继续添加
            { 
              src: "packages/components/Button/style.css", 
              dest: "dist/theme" 
            },
            { 
              src: "packages/components/Collapse/style.css", 
              dest: "dist/theme" 
            },
          ],
          hook: "writeBundle"
        })
      ]
    }
  },
});
