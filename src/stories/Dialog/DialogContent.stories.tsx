import type { Meta, StoryObj } from '@storybook/react';

import { Dialog, DialogContent } from '@/components';


const meta = {
  title: 'DialogContent',
  component: DialogContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DialogContent>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogContent>test</DialogContent>
    </Dialog>
  ),
};

