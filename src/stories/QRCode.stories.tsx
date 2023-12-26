import type { Meta, StoryObj } from '@storybook/react';

import { QRCode } from '@/components';

const meta = {
  title: 'QRCode',
  component: QRCode,
  parameters: {
    layout: 'centered',
    inspectComponents: [QRCode],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
   value: 'You just scanned a QR code!'
  },
};
