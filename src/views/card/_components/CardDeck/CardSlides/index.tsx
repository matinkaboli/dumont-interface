import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';

import { Carousel, CarouselItem } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Card, setActiveCardIndex } from '@/redux/features/gameSlice';

import Slide from './Slide';
import { Swiper } from 'swiper/types';

interface Props {
  slides?: Card[];
}

const CardSlides = ({ slides = [] }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { activeCardIndex, data: game } = useTypedSelector((state) => state.game);

  const initialSlide = useMemo(() => {
    const cardIdParam = searchParams.get('cardId');

    if (typeof cardIdParam === 'string' && !isNaN(parseInt(cardIdParam))) {
      const cardId = parseInt(cardIdParam, 10);

      if (cardId >= 1 && cardId <= 52) {
        return cardId;
      }
    }

    const index = game?.cards.findIndex((card) => card.number === -1);
    return index && index !== -1 ? index + 1 : 1;
  }, [game]);

  const onActiveIndexChange = (s: Swiper) => {
    dispatch(setActiveCardIndex(s.activeIndex));
    router.push(`?cardId=${s.activeIndex}`);
  };

  return (
    <Carousel
      initialSlide={initialSlide}
      allowSlidePrev={activeCardIndex > 1}
      prevELClassName={activeCardIndex === 1 ? '!bg-neutral-700 [&_.path]:!fill-neutral-500' : ''}
      onActiveIndexChange={onActiveIndexChange}
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
                isPlayerWinner={slide?.result?.isPlayerWinner}
                isFreeReveal={slide?.isFreeReveal}
              />
            )}
          </CarouselItem>
        );
      })}
    </Carousel>
  );
};

export default CardSlides;
