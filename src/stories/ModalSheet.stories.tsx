import type { Meta } from '@storybook/react';
import {useState} from 'react';

import { ModalSheet } from '@/components';

const meta = {
  title: 'ModalSheet',
  component: ModalSheet,
  parameters: {
    layout: 'centered',
    inspectComponents: [ModalSheet],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalSheet>;

export default meta;

export const Basic = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleClose = () => setIsOpenModal((prev) => !prev);

  return (
    <div className="text-white text-center">
      <button className="md:hidden block" onClick={handleClose}>
        Open Sheet
      </button>
      <ModalSheet isOpen={isOpenModal} onClose={handleClose}>
        <div>There are some info</div>
      </ModalSheet>

      <p className="md:block hidden">Please test it in mobile size!</p>
    </div>
  );
};
