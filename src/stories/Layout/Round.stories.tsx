import type { Meta, StoryObj } from '@storybook/react';

import Round from '@/components/Layout/Footer/Round';
import ConnectKit from '@/providers/ConnectKit';

const meta = {
  title: 'Layout/Round',
  component: Round,
  parameters: {
    layout: 'centered',
    inspectComponents: [Round],
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ConnectKit>
        <Story />
      </ConnectKit>
    ),
  ],
} satisfies Meta<typeof Round>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { roundTime: '2h 30m 30s' },
};
