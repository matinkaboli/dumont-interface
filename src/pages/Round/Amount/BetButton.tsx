import React, { useRef } from 'react';
import { Button } from '@/components';
import { ButtonProps } from '@/components/Button';

const BetButton = ({ size, children }: ButtonProps) => {
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
      onMouseMove={handleMouseMove}
      className="relative bg-primary-300 text-white cursor-pointer overflow-hidden !font-semibold
      after:content-[''] after:absolute after:w-28 after:h-28 after:rounded-full after:bg-gradiant-glow
      after:top-[calc(var(--y,0)*1px-50px)] after:left-[calc(var(--x,0)*1px-50px)]
      after:transition-opacity after:duration-200 after:opacity-0 hover:after:opacity-50"
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export default BetButton;
