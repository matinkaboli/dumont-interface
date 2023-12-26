import type { Meta, StoryObj } from '@storybook/react';

import { Layout } from '@/components';

const meta = {
  title: 'Layout',
  component: Layout,
  parameters: {
    layout: 'centered',
    inspectComponents: [Layout],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { children: <div className="text-white">Some content</div> },
};
