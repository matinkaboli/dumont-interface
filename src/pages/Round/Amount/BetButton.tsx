import React, { useRef, useMemo } from 'react';
import { ConnectKitButton } from 'connectkit';

import { Button } from '@/components';
import { ButtonProps } from '@/components/Button';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const buttonStyle =
  "relative bg-primary-300 text-white cursor-pointer disabled:cursor-auto overflow-hidden !font-semibold after:content-[''] after:absolute after:w-28 after:h-28 after:rounded-full after:top-[calc(var(--y,0)*1px-50px)] after:left-[calc(var(--x,0)*1px-50px)] after:transition-opacity after:duration-200 after:opacity-0 hover:after:opacity-50";

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

  const buttonProps = useMemo<ButtonProps>(() => ({
    fullWidth: true,
    variant: 'link',
    radius: 'lg',
    size: size,
    onMouseMove: handleMouseMove,
  }), [size, handleMouseMove]);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <div>
            {isConnected ? (
              <Button
                {...buttonProps}
                ref={buttonRef}
                disabled={!isConfirmed}
                className={`${buttonStyle} ${isConfirmed && 'after:bg-gradiant-glow'}`}
              >
                <span className="relative z-10">Bet</span>
              </Button>
            ) : (
              <Button
                {...buttonProps}
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                className={`${buttonStyle} after:bg-gradiant-glow`}
                onClick={show}
              >
                <span className="relative z-10">Connect Wallet</span>
              </Button>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default BetButton;
