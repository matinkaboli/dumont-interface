import type { Meta, StoryObj } from '@storybook/react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components';

const meta = {
  title: 'Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Dialog {...args} />
  ),
};

export const Template: Story = {
  args: {},
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="primary">open</Button>
      </DialogTrigger>
      <DialogContent size="md" showCloseButton>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when yore done.
        </DialogDescription>
        <DialogTrigger asChild>
          <Button type="submit" className="mt-2">
            Save changes
          </Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  ),
};
