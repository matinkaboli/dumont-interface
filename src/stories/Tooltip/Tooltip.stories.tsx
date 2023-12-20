import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

const meta = {
  title: 'Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="text-white">hover</TooltipTrigger>
        <TooltipContent>some information</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
