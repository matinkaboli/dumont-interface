import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from '@/components';

const meta = {
  title: 'Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    inspectComponents: [Loading],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Size: Story = {
  args: {
    size: 32,
  },
};

export const Color: Story = {
  args: {
    color: 'blue',
  },
};
