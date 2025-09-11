import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-essentials"  // 建议加上 essentials（包含 actions/controls 等）
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  }
};

export default config;
