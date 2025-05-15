'use client';

import { ComponentPropsWithRef, useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import clsx from 'clsx';

const Slider = ({ ref, className, onValueChange, ...props }: ComponentPropsWithRef<typeof SliderPrimitive.Root>) => {
  const [value, setValue] = useState<number[] | undefined>(props.defaultValue || [1]);

  const handleValueChange = (newValue: []) => {
    setValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={clsx('relative flex w-full touch-none select-none items-center', className)}
      onValueChange={handleValueChange}
      {...props}
    >
      <SliderPrimitive.Track className='relative h-0.5 w-full grow overflow-hidden rounded-full bg-primary-700'>
        <SliderPrimitive.Range className='absolute h-full bg-primary-400' />
      </SliderPrimitive.Track>
      {value?.map((val, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className='text-white cursor-pointer block h-3 w-3 rounded-full border border-primary-400 bg-primary-400 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
        >
          <div className='text-primary-400 text-sm font-bold mt-3 -ml-1.5'>{val}x</div>
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
};
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
