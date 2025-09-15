import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";
import { readFile} from "fs";
import {delay ,filter, map,defer} from "lodash-es";
import dts from "vite-plugin-dts";
import shell from "shelljs";
// import hooks from "./hooksPlugins";
import {hooksplugin as hooks} from "@toy-element/vite-plugins";

const TRY_MOVE_STYLES_DELAY = 750 as const;
function moveStyles() {
  readFile("./dist/umd/index.css.gz", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"));
  });
}
const COMP_NAMES = [
  "Button",
  "Icon",
  "Alert",
  "Collapse",
  "Dropdown",
  "Input",
  "Form",
  "Loading",
  "Message",
  "MessageBox",
  "Notification",
  "Overlay",
  "Popconfirm",
  "Select",
  "Switch",
  "Tooltip",
  "Upload",
] as const;

export default defineConfig({
  plugins: [vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
     hooks({
      rmFiles: [
        "./dist/es",
        "./dist/theme",
        "./dist/types",
        "./dist/stats.es.html",
      ],
      afterBuild: moveStyles,
    }),
  ],
  build: {
    outDir: "dist/es",
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "ToyElement",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {

        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string;
        },
        // 分包
        manualChunks(id) {
          if(id.includes("node_modules")){
            return "vendor";
          }
          if(id.includes("packages/hooks")){
            return "hooks";
          }
          if(id.includes("packages/utils")){
            return "utils";
          }
          for (const name of COMP_NAMES) {
            if (id.includes(`packages/${name}`)) {
              return name
            }
          }      
        },
      },
    },
  }
});