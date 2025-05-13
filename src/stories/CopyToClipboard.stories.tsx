import type { Meta, StoryObj } from '@storybook/react';

import { CopyToClipboard } from '@/components';

const meta = {
  title: 'CopyToClipboard',
  component: CopyToClipboard,
  parameters: {
    layout: 'centered',
    inspectComponents: [CopyToClipboard],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CopyToClipboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    copyText: 'copy text',
  },
};

export const ButtonWithIcon: Story = {
  args: {
    copyText: 'copy text',
    copyLabel: 'copy button',
    className: 'text-white text-sm bg-primary-500 py-1 px-2 rounded',
  },
};

export const ButtonWithoutIcon: Story = {
  args: {
    showIcon: false,
    copyText: 'copy text',
    copyLabel: 'copy button',
    className: 'text-white text-sm bg-primary-500 py-1 px-2 rounded',
  },
};
