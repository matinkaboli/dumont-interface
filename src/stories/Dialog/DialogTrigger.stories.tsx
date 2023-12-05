import type { Meta, StoryObj } from '@storybook/react';

import { Dialog, DialogTrigger } from '@/components';


const meta = {
  title: 'Dialog/Trigger',
  component: DialogTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DialogTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>test</DialogTrigger>
    </Dialog>
  ),
};

