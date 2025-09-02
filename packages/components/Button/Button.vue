<script setup lang="ts">
import type { ButtonProps,ButtonEmits,ButtonInstance } from './types'
import { ref, computed } from 'vue'
import { throttle } from 'lodash-es';
import  ErIcon  from '../Icon/Icon.vue';

defineOptions({
  name: 'ErButton',
})

// 定义 props，带默认值
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle:true,
  throttleDuration:500
})

// 定义事件
const emit = defineEmits<ButtonEmits>()

// DOM 引用
const _ref = ref<HTMLButtonElement>()

defineExpose<ButtonInstance>({
  ref: _ref,
})

// 如果有默认插槽就给一个mr
const slots = defineSlots();
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));

// 点击事件，触发 emit
const handleBtnClick = (evt: MouseEvent) => emit('click', evt)
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration) ;
</script>

<template>
  <!-- 这里可以不用写props，因为template下自动调用props -->
  <component
    :is="props.tag"
    :autofocus="props.autofocus"
    :type="props.tag === 'button' ? props.nativeType : void 0"
    :ref="_ref"
    class="er-button"
    :disabled="props.disabled || props.loading ? true : void 0"
    :class="{
      [`er-button--${props.type}`]: props.type,
      [`er-button--${props.size}`]: props.size,
      'is-plain': props.plain,
      'is-round': props.round,
      'is-circle': props.circle,
      'is-loading': props.loading,
      'is-disabled': props.disabled
    }"
    @click="(e:MouseEvent)=>
      props.useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)
    "
  >
  <template v-if="loading">
      <slot name="loading">
        <er-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <er-icon
      :icon="icon"
      size="1x"
      :style="iconStyle"
      v-if="icon && !loading"
    />
    <slot></slot>
  </component>
</template>

<style scoped>
@import './style.css';
</style>
