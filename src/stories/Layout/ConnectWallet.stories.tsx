import type { Meta, StoryObj } from '@storybook/react';

import ConnectWallet from '@/components/Layout/Header/ConnectWallet';
import ConnectKit from '@/providers/ConnectKit';

const meta = {
  title: 'Layout/ConnectWallet',
  component: ConnectWallet,
  parameters: {
    layout: 'centered',
    inspectComponents: [ConnectWallet],
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ConnectKit>
        <Story />
      </ConnectKit>
    ),
  ],
} satisfies Meta<typeof ConnectWallet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
