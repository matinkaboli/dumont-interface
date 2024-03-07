import { useDispatch } from 'react-redux';

import { Carousel, CarouselItem } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { setActiveCardIndex } from '@/redux/features/cardsSlice';
import { Card } from '@/types';

import Slide from './Slide';

interface Props {
  slides: Card[];
}

const CardSlides = ({ slides }: Props) => {
  const dispatch = useDispatch();
  const { activeCardIndex } = useTypedSelector((state) => state.cards);

  return (
    <Carousel
      initialSlide={1}
      allowSlidePrev={activeCardIndex > 1}
      prevELClassName={activeCardIndex === 1 ? '!bg-neutral-700 [&_.path]:!fill-neutral-500' : ''}
      onActiveIndexChange={(s) => dispatch(setActiveCardIndex(s.activeIndex))}
    >
      {slides.map((slide, index) => {
        return (
          <CarouselItem key={index}>
            {({ isActive }) => (
              <Slide
                index={slide.id}
                slide={slide.src}
                isRevealed={slide.isRevealed}
                isActive={isActive}
              />
            )}
          </CarouselItem>
        );
      })}
    </Carousel>
  );
};

export default CardSlides;
