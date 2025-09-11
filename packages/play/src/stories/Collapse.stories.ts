import type { Meta, StoryObj } from "@storybook/vue3";
import  {ErCollapse,ErCollapseItem }  from "toy-element";
// import 'eric-ui/dist/theme/Collapse.css'

type Story = StoryObj<typeof ErCollapse>;

const meta: Meta<typeof ErCollapse> = {
  title: "Example/Collapse",
  component: ErCollapse,
  subcomponents: { ErCollapseItem },
  tags: ["autodocs"],
};

interface DefaultStoryArgs {
  accordion?: boolean;
  modelValue?: string[];
}

interface DefaultStoryContext {
  args: DefaultStoryArgs;
}

export const Default: Story = {
  render: (args: DefaultStoryArgs) => ({
    components: {
      ErCollapse,
      ErCollapseItem,
    },
    setup(): DefaultStoryContext {
      return {
        args,
      };
    },
    template: `
    <er-collapse v-bind="args">
      <er-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </er-collapse-item>
      <er-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </er-collapse-item>
      <er-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </er-collapse-item>
    </er-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  } as DefaultStoryArgs,
};

export default meta;
