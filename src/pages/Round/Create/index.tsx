'use client';

import { useState } from 'react';
import { Button, Dialog, DialogDescription, DialogTitle } from '@/components';

import DemoCard from './DemoCard';

const CreateRound = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenChange = () => setIsOpen((prev) => !prev);

  return (
    <div className="bg-gradiant-box rounded-lg md:px-8 px-1.5 pt-8 text-center">
      <h1 className="text-2xl text-white font-bold">Let’s start your round</h1>
      <p className="text-sm text-neutral-200 mt-1">To start the game, you need to create a round</p>
      <Button
        variant="primary"
        size="sm"
        radius="lg"
        onClick={onOpenChange}
        className="mt-4 mx-auto !font-bold md:w-auto w-full"
      >
        Create Round
      </Button>
      <Dialog showCloseButton open={isOpen} onOpenChange={onOpenChange}>
        <div className="px-8">
          <div className="bg-white w-full h-[136px] rounded-xl" />
          <DialogTitle className="text-center mt-6">Confirm round</DialogTitle>
          <DialogDescription className="text-center mt-2">
            You need to pay <span className="font-bold">$1</span> to create the round. It is the
            price of honesty
          </DialogDescription>
        </div>
        <Button fullWidth size="md" radius="lg" className="mt-6">
          Confirm round
        </Button>
      </Dialog>

      <div className="flex justify-center items-end gap-4 mt-10">
        <DemoCard width={190} className="hidden md:block" />
        <DemoCard width={222} />
        <DemoCard width={190} className="hidden md:block" />
      </div>
    </div>
  );
};

export default CreateRound;
