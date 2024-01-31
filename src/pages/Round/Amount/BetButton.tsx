import React, { useRef } from 'react';

import { Button } from '@/components';
import { ButtonProps } from '@/components/Button';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const BetButton = ({ size }: ButtonProps) => {
  const isConfirmed = useTypedSelector((state) => state.createRound.isConfirmed);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (button) {
      const { x, y } = button.getBoundingClientRect();
      button.style.setProperty('--x', `${e.clientX - x}`);
      button.style.setProperty('--y', `${e.clientY - y}`);
    }
  };

  return (
    <Button
      fullWidth
      variant="link"
      radius="lg"
      size={size}
      ref={buttonRef}
      disabled={!isConfirmed}
      onMouseMove={handleMouseMove}
      className={`relative bg-primary-300 text-white cursor-pointer disabled:cursor-auto overflow-hidden !font-semibold
      after:content-[''] after:absolute after:w-28 after:h-28 after:rounded-full
      after:top-[calc(var(--y,0)*1px-50px)] after:left-[calc(var(--x,0)*1px-50px)]
      after:transition-opacity after:duration-200 after:opacity-0 hover:after:opacity-50 ${
        isConfirmed && 'after:bg-gradiant-glow'
      }`}
    >
      <span className="relative z-10">Bet</span>
    </Button>
  );
};

export default BetButton;
