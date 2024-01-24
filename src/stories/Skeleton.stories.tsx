import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from '@/components';

const meta = {
  title: 'Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    inspectComponents: [Skeleton],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    width: 200,
    height: 300,
    className: 'rounded-lg',
  },
};
