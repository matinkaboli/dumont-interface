import { type Meta } from '@storybook/react';
import { toast } from 'react-toastify';

import { Button, Toast, ToastContent } from '@/components';
import { ToastContentProps } from '@/components/Toast/ToastContent';

const meta = {
  title: 'Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    inspectComponents: [Toast],
    docs: {
      description: {
        component:
          "Auto-generated arguments don't work for react-toastify. You can find the full information on their documents.",
      },
    },
  },
  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;

export function Basic() {
  const notify = () =>
    toast(<ToastContent variant="neutral" title="Title" description="Some extra info." />, {
      position: 'bottom-right',
    });

  return (
    <>
      <Button onClick={notify}>Notify!</Button>
      <Toast />
    </>
  );
}

interface Props extends Pick<ToastContentProps, 'variant'> {}

export function ContentVariant() {
  const notify = ({ variant }: Props) =>
    toast(<ToastContent variant={variant} title="Title" description="Some extra info." />, {
      position: 'bottom-right',
    });

  return (
    <div className="flex-center gap-2">
      <Button onClick={() => notify({ variant: 'neutral' })}>Neutral</Button>
      <Button variant="secondary" onClick={() => notify({ variant: 'success' })}>Success</Button>
      <Button variant="warning" onClick={() => notify({ variant: 'error' })}>Error</Button>
      <Toast />
    </div>
  );
}
