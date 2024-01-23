import { useEffect, useState } from 'react';

import { Carousel, CarouselItem } from '@/components';

import Card from './Card';

const imgSrc = '/images/full-card.png';

const slides = Array.from({ length: 8 }, () => imgSrc);

const Cards = () => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    onLoading();
  }, []);

  return (
    <Carousel>
      {slides.map((slide, index) => {
        return (
          <CarouselItem key={index}>
            {({ isActive }) => (
              <Card isActive={isActive} isLoading={isLoading} index={index} slide={slide} />
            )}
          </CarouselItem>
        );
      })}
    </Carousel>
  );
};

export default Cards;
