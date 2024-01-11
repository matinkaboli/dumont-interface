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

export const Basic: Story = {
  render: () => (
    <Dialog open onOpenChange={function (): void {}}>
      <DialogDescription>test</DialogDescription>
    </Dialog>
  ),
};
