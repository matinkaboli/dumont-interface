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
    name: 'input',
    placeholder: 'input',
  },
};

export function Size() {
  return (
    <div className="flex flex-col gap-4">
      <Input name="input1" placeholder="sm input" size="sm" />
      <Input name="input2" placeholder="md input" size="md" />
    </div>
  );
}

export const Icon: Story = {
  args: {
    name: 'input',
    placeholder: 'input',
    leftSection: <SvgIcon name="home" />,
    rightSection: <SvgIcon name="home" />,
  },
};

export const Disabled: Story = {
  args: {
    name: 'input',
    placeholder: 'input',
    disabled: true,
  },
};

export const Description: Story = {
  args: {
    name: 'input',
    placeholder: 'input',
    description: 'This is description',
  },
};

export const Error: Story = {
  args: {
    name: 'input',
    placeholder: 'input',
    errors: { input: { type: 'required', message: 'You should enter valid input!' } },
  },
};
