import { useDispatch } from 'react-redux';

import { Carousel, CarouselItem } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { setActiveCardIndex } from '@/redux/features/cardsSlice';
import { Card } from '@/redux/features/gameSlice';

import Slide from './Slide';

interface Props {
  slides?: Card[];
}

const CardSlides = ({ slides = [] }: Props) => {
  const dispatch = useDispatch();
  const { activeCardIndex } = useTypedSelector((state) => state.cards);

  return (
    <Carousel
      initialSlide={1}
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
                slide='/images/card.png'
                isLeaked={slide.isLeaked}
                revealed={slide.revealed}
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
