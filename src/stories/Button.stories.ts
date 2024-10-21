import type { Meta, StoryObj } from '@storybook/vue3';

import CopyButton from '../components/CopyButton.ce.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/CopyButton',
  component: CopyButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args: any) => ({
    components: { CopyButton },
    setup() {
      return { args }
    },
    template: '<copy-button v-bind="args"/>',
  }),
  parameters: {
  },
  args: {
    label: 'Kopiere',
    copy_label: 'Kopiet!',
    copy_value: 'das was ich kopiert habe',
    color: 'dark',
    countdown: 5
  }

} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Small: Story = {
  args: {
    label: 'Kopiere',
    copy_label: 'Kopiet!',
    copy_value: 'das was ich kopiert habe',
    color: 'dark',
    countdown: 5
  },
};
