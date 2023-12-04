import type { Meta, StoryObj } from '@storybook/react';

import { Dialog, DialogTitle } from '@/components';


const meta = {
  title: 'DialogTitle',
  component: DialogTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DialogTitle>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTitle>test</DialogTitle>
    </Dialog>
  ),
};

