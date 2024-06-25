import { Meta } from '@storybook/react';

import { Confetti } from '@/components';

const meta = {
  title: 'Confetti',
  component: Confetti,
  parameters: {
    inspectComponents: [Confetti],
  },
  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Confetti>;

export default meta;

export function Basic() {
  return <Confetti run />;
}
