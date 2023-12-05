import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
    inspectComponents: [Button],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'button',
  },
};

export function Variant() {
  return (
    <div className="flex gap-4">
      <Button variant="primary">Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="warning">Button</Button>
      <Button variant="neutral">Button</Button>
      <Button variant="link">Button</Button>
    </div>
  );
}

export function Size() {
  return (
    <div className="flex gap-4">
      <Button variant="primary" size="lg">
        Button
      </Button>
      <Button variant="primary" size="md">
        Button
      </Button>
      <Button variant="primary" size="sm">
        Button
      </Button>
    </div>
  );
}

export function BorderRadius() {
  return (
    <div className="flex gap-4">
      <Button radius="md">Button</Button>
      <Button radius="lg">Button</Button>
      <Button radius="full">Button</Button>
    </div>
  );
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'button',
    fullWidth: true
  },
};

export const Icon: Story = {
  args: {
    variant: 'primary',
    children: 'button',
    leftSection: <span>x</span>,
    rightSection: <span>x</span>,
  },
};

export const IsLoading: Story = {
  args: {
    variant: 'primary',
    children: 'button',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'button',
    disabled: true,
  },
};
