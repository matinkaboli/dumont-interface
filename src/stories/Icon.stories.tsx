import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@/components';
import { iconMap } from '@/components/Icon/iconConfig';

const meta = {
  title: 'Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    inspectComponents: [Icon],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    name: 'home',
    width: '24',
    height: '24',
    viewBox: '0 0 24px 24px',
    color: '#fff',
  },
};

const iconEntries = Object.entries(iconMap);
export const Icons = () => (
  <div className="grid grid-cols-4 gap-x-14 gap-y-5">
    {iconEntries.map(([iconName, icon], index) => (
      <div key={index} className="flex items-center gap-1 [&_.path]:fill-white">
        {icon} <span className="text-xs text-white">{iconName}</span>
      </div>
    ))}
  </div>
);

Icons.story = {
  name: 'Icons',
};
