import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Carousel, CarouselItem } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Card, setActiveCardIndex } from '@/redux/features/gameSlice';

import Slide from './Slide';

interface Props {
  slides?: Card[];
}

const CardSlides = ({ slides = [] }: Props) => {
  const dispatch = useDispatch();
  const { activeCardIndex, data: game } = useTypedSelector((state) => state.game);

  const initialSlide = useMemo(() => {
    const index = game?.cards.findIndex((card) => card.number === -1);
    return index !== undefined ? index + 1 : 1;
  }, [game]);

  return (
    <Carousel
      initialSlide={initialSlide}
      allowSlidePrev={activeCardIndex > 1}
      prevELClassName={activeCardIndex === 1 ? '!bg-neutral-700 [&_.path]:!fill-neutral-500' : ''}
      onActiveIndexChange={(s) => dispatch(setActiveCardIndex(s.activeIndex))}
    >
      <CarouselItem>
        {({ isActive }) => (
          <Slide isActive={isActive} index={53} slide="/images/card-placeholder.png" />
        )}
      </CarouselItem>

      {slides.map((slide, index) => {
        return (
          <CarouselItem key={index}>
            {({ isActive }) => (
              <Slide
                index={index + 1}
                slide="/images/card.png"
                isLeaked={slide.isFreeReveal}
                number={slide?.number}
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
