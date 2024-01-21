import type { Meta } from '@storybook/react';

import { CarouselItem } from '@/components';

const meta = {
  title: 'Carousel/Item',
  component: CarouselItem,
  tags: ['autodocs'],
} satisfies Meta<typeof CarouselItem>;

export default meta;

export function Basic() {
  return (
    <CarouselItem className="mx-auto">
      <div className="w-28 h-28 text-center bg-blue-400">Carousel Item</div>
    </CarouselItem>
  );
}
