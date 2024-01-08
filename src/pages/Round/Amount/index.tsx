'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { Button, Icon, Input } from '@/components';

import AmountInfo from './Info';

const inputProps = {
  size: 'sm' as any,
  placeholder: 'Enter amount',
  rightSection: <Image src="/images/USDT.svg" width={24} height={24} alt="" />,
};

const mobileInputProps = {
  size: 'md' as any,
  placeholder: 'Enter amount',
  rightSection: (
    <div className="flex gap-1.5 items-center">
      <Image src="/images/USDT.svg" width={32} height={32} alt="" />
      <span className="text-base font-medium text-neutral-800">USDT</span>
    </div>
  ),
};

const Amount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop View */}
      <div className="md:block hidden bg-gradiant-border-amount bg-origin-border border border-transparent rounded-lg w-full h-full">
        <div className="flex flex-col justify-between bg-primary-800 px-4 py-6 rounded-lg w-full h-full">
          <div>
            <Input {...inputProps} />

            <AmountInfo odd={6.6} total={220} className="gap-3 mt-4" />
          </div>

          <Button fullWidth size="md" radius="lg" className="!font-semibold">
            Connect Wallet
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="flex items-end gap-2">
          <div className="grow">
            <Input {...mobileInputProps} />
          </div>
          <div className="flex-none">
            <button
              type="button"
              onClick={handleToggle}
              className="bg-neutral-800 border border-neutral-600 h-12 w-12 rounded-lg"
            >
              <motion.span
                className="block"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon name="angle-down" color="white" width="28" height="28" className="mx-auto" />
              </motion.span>
            </button>
          </div>
        </div>

        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : '0' }}
        >
          <AmountInfo
            odd={6.6}
            total={220}
            className="bg-neutral-750 border border-neutral-600 rounded-lg px-4 py-2 gap-2"
            labelClassName="text-neutral-400"
            valueClassName="text-neutral-200"
          />
        </motion.div>

        <div className="bg-neutral-750 px-5 pt-6 pb-8 fixed bottom-0 right-0 left-0 rounded-t-2xl">
          <Button fullWidth size="lg" radius="lg" className="!font-semibold">
            Connect Wallet
          </Button>
        </div>
      </div>
    </>
  );
};

export default Amount;
