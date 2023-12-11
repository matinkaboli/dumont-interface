'use client';

import { useState } from 'react';
import { Button, Dialog, DialogDescription, DialogTitle, DialogTrigger } from '@/components';

const ExpDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      size="md"
      open={open}
      onOpenChange={setOpen}
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

export default ExpDialog;
