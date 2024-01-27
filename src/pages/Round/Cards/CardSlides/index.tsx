import { Carousel, CarouselItem } from '@/components';

import Slide from './Slide';

interface Props {
  slides: string[];
  isLoading: boolean
}

const CardSlides = ({ slides, isLoading }: Props) => {
  return (
    <Carousel allowSlideNext={!isLoading} allowSlidePrev={!isLoading}>
      {slides.map((slide, index) => {
        return (
          <CarouselItem key={index}>
            {({ isActive }) => (
              <Slide isActive={isActive} isLoading={isLoading} index={index} slide={slide} />
            )}
          </CarouselItem>
        );
      })}
    </Carousel>
  );
};

export default CardSlides;
