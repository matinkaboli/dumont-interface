import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '@/components';
import { iconMap } from '@/components/Icon/iconConfig';

const meta = {
  title: 'Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    inspectComponents: [Checkbox],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Basic: Story = {
  args: {},
};

export const Label: Story = {
  args: {
    label: 'This is a label'
  },
};


export function Size() {
  return (
    <div className="flex gap-3">
      <Checkbox size="lg" />
      <Checkbox size="md" />
      <Checkbox size="sm" />
    </div>
  );
}
