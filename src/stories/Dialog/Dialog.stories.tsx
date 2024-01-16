import type { Meta } from '@storybook/react';

import { Button, Dialog, DialogDescription, DialogTitle } from '@/components';

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
    <div>
      <Button variant="primary" onClick={onOpenChange}>
        open
      </Button>
      <Dialog {...args} size="lg" open={open} onOpenChange={onOpenChange}>
        <DialogDescription className="h-[200px]">{fakeText}</DialogDescription>
      </Dialog>
    </div>
  );
};

export const MediumSize = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs();
  const onOpenChange = () => updateArgs({ open: !open });
  return (
    <div>
      <Button variant="primary" onClick={onOpenChange}>
        open
      </Button>
      <Dialog {...args} size="md" open={open} onOpenChange={onOpenChange}>
        <DialogDescription className="min-h-[200px]">{fakeText}</DialogDescription>
      </Dialog>
    </div>
  );
};

export const SmallSize = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs();
  const onOpenChange = () => updateArgs({ open: !open });
  return (
    <div>
      <Button variant="primary" onClick={onOpenChange}>
        open
      </Button>
      <Dialog {...args} size="sm" open={open} onOpenChange={onOpenChange}>
        <DialogDescription>
          Make changes to your profile here. Click save when yore done.
        </DialogDescription>
      </Dialog>
    </div>
  );
};

export const DisableEvents = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs();
  const onOpenChange = () => updateArgs({ open: !open });
  return (
    <div>
      <Button variant="primary" onClick={onOpenChange}>
        open
      </Button>
      <Dialog {...args} disableEvents size="sm" open={open} onOpenChange={onOpenChange}>
        <DialogDescription>
          Make changes to your profile here. Click save when yore done.
        </DialogDescription>
      </Dialog>
    </div>
  );
};

export const ShowCloseButton = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs();
  const onOpenChange = () => updateArgs({ open: !open });
  return (
    <div>
      <Button variant="primary" onClick={onOpenChange}>
        open
      </Button>
      <Dialog {...args} size="md" open={open} onOpenChange={onOpenChange} showCloseButton>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when yore done.
        </DialogDescription>
        <Button type="submit" className="mt-2" onClick={onOpenChange}>
          Save changes
        </Button>
      </Dialog>
    </div>
  );
};
