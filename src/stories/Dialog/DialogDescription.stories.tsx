import type { Meta, StoryObj } from '@storybook/react';

import { Dialog, DialogDescription } from '@/components';


const meta = {
  title: 'Dialog/Description',
  component: DialogDescription,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DialogDescription>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogDescription>test</DialogDescription>
    </Dialog>
  ),
};

