import type { Meta, StoryObj } from '@storybook/react';

import ConnectWallet from '../../components/Layout/ConnectWallet';

const meta = {
  title: 'Layout/ConnectWallet',
  component: ConnectWallet,
  parameters: {
    layout: 'centered',
    inspectComponents: [ConnectWallet],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConnectWallet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
