import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

const meta = {
  title: 'Tooltip/Trigger',
  component: TooltipTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TooltipTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Basic = {
  render: () => (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="text-white">hover</TooltipTrigger>
        <TooltipContent>some information</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
