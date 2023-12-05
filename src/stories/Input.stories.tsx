import type { Meta, StoryObj } from '@storybook/react';

import { Icon as SvgIcon, Input } from '@/components';

const meta = {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
    inspectComponents: [Input],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'input',
  },
};

export function Size() {
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="sm input" size="sm" />
      <Input placeholder="md input" size="md" />
    </div>
  );
}

export const Icon: Story = {
  args: {
    placeholder: 'input',
    leftSection: <SvgIcon name="home" />,
    rightSection: <SvgIcon name="home" />,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'input',
    disabled: true,
  },
};

export const Description: Story = {
  args: {
    placeholder: 'input',
    description: 'This is description',
  },
};

export const Error: Story = {
  args: {
    placeholder: 'input',
    error: 'This is error',
  },
};
