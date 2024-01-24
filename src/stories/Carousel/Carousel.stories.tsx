import type { Meta } from '@storybook/react';

import { Carousel, CarouselItem } from '@/components';

const meta = {
  title: 'Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;

export function Basic() {
  return (
    <div className="min-w-[320px]">
      <Carousel>
        {[1, 2, 3, 4, 5].map((item) => (
          <CarouselItem key={item}>
            <div className="w-full h-28 text-center bg-blue-400">{item}</div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
}
