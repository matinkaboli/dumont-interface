import type { Meta, StoryObj } from '@storybook/react';

import { Status } from '@/components';

const meta = {
  title: 'status',
  component: Status,
  parameters: {
    layout: 'centered',
    inspectComponents: [Status],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Success',
  },
};

export function Variant() {
  return (
    <div className="flex gap-4">
      <Status variant="success">Success</Status>
      <Status variant="warning">Warning</Status>
      <Status variant="error">Error</Status>
    </div>
  );
}
