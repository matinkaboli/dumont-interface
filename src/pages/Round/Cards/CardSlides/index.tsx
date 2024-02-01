import { useState } from 'react';
import { Carousel, CarouselItem } from '@/components';

import Slide from './Slide';
import { SlideSrc } from '../.';

interface Props {
  slides: SlideSrc[];
}

const CardSlides = ({ slides }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <Carousel
      centeredSlidesBounds={activeIndex < 2}
      onActiveIndexChange={(s) => setActiveIndex(s.activeIndex)}
    >
      {slides.map((slide, index) => {
        return (
          <CarouselItem key={index}>
            {({ isActive }) => <Slide isActive={isActive} index={slide.id} slide={slide.src} />}
          </CarouselItem>
        );
      })}
    </Carousel>
  );
};

export default CardSlides;
