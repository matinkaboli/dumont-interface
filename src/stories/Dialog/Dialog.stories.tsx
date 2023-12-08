import type { Meta } from '@storybook/react';

import { Button, Dialog, DialogDescription, DialogTitle, DialogTrigger } from '@/components';

import { useArgs } from '@storybook/preview-api';

const meta = {
  title: 'Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;

const fakeText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export const LargeSize = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs();
  const onOpenChange = () => updateArgs({ open: !open });
  return (
    <Dialog
      {...args}
      size="lg"
      open={open}
      onOpenChange={onOpenChange}
      triggerElement={<Button variant="primary">open</Button>}
    >
      <DialogDescription className="h-[200px]">{fakeText}</DialogDescription>
    </Dialog>
  );
};

export const MediumSize = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs();
  const onOpenChange = () => updateArgs({ open: !open });
  return (
    <Dialog
      {...args}
      size="md"
      open={open}
      onOpenChange={onOpenChange}
      triggerElement={<Button variant="primary">open</Button>}
    >
      <DialogDescription className="min-h-[200px]">{fakeText}</DialogDescription>
    </Dialog>
  );
};

export const SmallSize = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs();
  const onOpenChange = () => updateArgs({ open: !open });
  return (
    <Dialog
      {...args}
      size="sm"
      open={open}
      onOpenChange={onOpenChange}
      triggerElement={<Button variant="primary">open</Button>}
    >
      <DialogDescription>
        Make changes to your profile here. Click save when yore done.
      </DialogDescription>
    </Dialog>
  );
};

export const ShowCloseButton = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs();
  const onOpenChange = () => updateArgs({ open: !open });
  return (
    <Dialog
      {...args}
      size="md"
      open={open}
      onOpenChange={onOpenChange}
      showCloseButton
      triggerElement={<Button variant="primary">open</Button>}
    >
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when yore done.
      </DialogDescription>
      <DialogTrigger asChild>
        <Button type="submit" className="mt-2">
          Save changes
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export const TriggerElement = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs();
  const onOpenChange = () => updateArgs({ open: !open });
  return (
    <Dialog
      {...args}
      size="md"
      open={open}
      onOpenChange={onOpenChange}
      showCloseButton
      triggerElement={<div className="bg-white p-1 cursor-pointer">This is new Trigger</div>}
    >
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when yore done.
      </DialogDescription>
      <DialogTrigger asChild>
        <Button type="submit" className="mt-2">
          Save changes
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};
