import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@/components';

const meta = {
  title: 'Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export function WithDefaultValue() {
  return <Slider defaultValue={[50]} max={100} step={1} />;
}
