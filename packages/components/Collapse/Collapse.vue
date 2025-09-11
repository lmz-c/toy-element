<script setup lang="ts">
import type {CollapseProps,CollapseEmits,CollapseItemName} from "./types";
import { ref, provide, watch, watchEffect } from "vue";
import { COLLAPSE_CTX_KEY } from "./constants";
import { debugWarn } from "@toy-element/utils/error";

const COMPONENT_NAME = "ErCollapse" as const;


defineOptions({
  name: COMPONENT_NAME,
});
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref(props.modelValue);

if (props.accordion && activeNames.value.length > 1) {
  console.log("手风琴模式下，只能有一个折叠面板处于展开状态");
  
}

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value];
  // 手风琴模式
  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? "" : item];
    updateActiveNames(_activeNames);
    return;
  }

  const index = _activeNames.indexOf(item);
  if (index > -1) {
    // 存在，删除数组中的一项
    _activeNames.splice(index, 1);
  } else {
    // 不存在，插入对应 name
    _activeNames.push(item);
  }
  updateActiveNames(_activeNames);
}

function updateActiveNames(val: CollapseItemName[]) {
  activeNames.value = val;
 emits("update:modelValue", val);
  emits("change", val); 
}
watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
   debugWarn(COMPONENT_NAME, "手风琴模式下，只能有一个折叠面板处于展开状态");
  }
});

watch(
  () => props.modelValue,
  (val) => updateActiveNames(val)
);

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});
</script>

<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>