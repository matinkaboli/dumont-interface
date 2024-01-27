import { useState } from 'react';
import { Carousel, CarouselItem } from '@/components';

import Slide from './Slide';
import { SlideSrc } from '../.';

interface Props {
  slides: SlideSrc[];
  isLoading: boolean;
}

const CardSlides = ({ slides, isLoading }: Props) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  return (
    <Carousel
      allowSlideNext={!isLoading}
      allowSlidePrev={!isLoading}
      centeredSlidesBounds={activeIndex === null}
      onActiveIndexChange={(s) => setActiveIndex(s.activeIndex)}
    >
      {slides.map((slide, index) => {
        return (
          <CarouselItem key={index}>
            {({ isActive }) => (
              <Slide isActive={isActive} isLoading={isLoading} index={slide.id} slide={slide.src} />
            )}
          </CarouselItem>
        );
      })}
    </Carousel>
  );
};

export default CardSlides;
