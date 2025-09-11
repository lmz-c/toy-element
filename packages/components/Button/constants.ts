import type { InjectionKey } from "vue";
import type { ButtonGroupContext } from "./types";

// 存储依赖注入的key

export const BUTTON_GROUP_CTX_KEY: InjectionKey<ButtonGroupContext> =
  Symbol("buttonGroupContext");
