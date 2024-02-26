'use client';

import 'swiper/css';
import 'swiper/css/navigation';

import { createRef, RefObject } from 'react';
import { Swiper, SwiperProps, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import clsx from 'clsx';

import NavButton from './NavButton';
import CarouselItem from './CarouselItem';

interface Props extends Pick<SwiperProps, Exclude<keyof SwiperProps, 'modules' | 'navigation'>> {
  prevELClassName?: string;
  nextELClassName?: string;
}

export const swiperRef: RefObject<SwiperRef> | null = createRef();

const Carousel = ({
  children,
  centeredSlides = true,
  slidesPerView = 2,
  spaceBetween = 10,
  speed = 600,
  breakpoints = { 600: { slidesPerView: 3 } },
  prevELClassName = '',
  nextELClassName = '',
  ...props
}: Props) => {
  return (
    <div className="flex items-center lg:gap-7 md:gap-2 gap-0">
      <NavButton className={clsx('prev', prevELClassName)} dir="left" />
      <Swiper
        ref={swiperRef}
        onSwiper={(swiper) => {
          // @ts-ignore
          swiperRef.current = swiper;
        }}
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        centeredSlides={centeredSlides}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        speed={speed}
        modules={[Navigation]}
        breakpoints={breakpoints}
        {...props}
      >
        {children}
      </Swiper>
      <NavButton className={clsx('next', nextELClassName)} dir="right" />
    </div>
  );
};

Carousel.displayName = Swiper.displayName;

export { Carousel, CarouselItem };
