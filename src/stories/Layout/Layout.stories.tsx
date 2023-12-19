import type { Meta, StoryObj } from '@storybook/react';

import { Layout } from '@/components';
import ConnectKit from '@/providers/ConnectKit';

const meta = {
  title: 'Layout',
  component: Layout,
  parameters: {
    layout: 'centered',
    inspectComponents: [Layout],
  },
  decorators: [
    (Story) => (
      <ConnectKit>
        <Story />
      </ConnectKit>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { children: <div className="text-white">Some content</div> },
};
