import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import clsx from 'clsx';

import { Icon, Skeleton } from '@/components';

import NavButton from './NavButton';

import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  isLoading?: boolean;
  slides: string[];
}

const breakpoints = {
  768: {
    slidesPerView: 3,
  },
};

const Slider = ({ isLoading = false, slides }: Props) => {
  const swiperRef = useRef<SwiperType>();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onActiveIndexChange = (swiper: SwiperType) => setActiveIndex(swiper.activeIndex);

  const onBeforeInit = (swiper: SwiperType) => (swiperRef.current = swiper);

  const onSlidePrev = () => swiperRef.current?.slidePrev();
  const onSlideNext = () => swiperRef.current?.slideNext();

  return (
    <div className="flex items-center gap-7 pt-6">
      <NavButton onClick={onSlidePrev}>
        <Icon name="angle-left" color="#DBDBE2" />
      </NavButton>
      <Swiper
        centeredSlides
        slidesPerView={2}
        spaceBetween={10}
        speed={800}
        onActiveIndexChange={onActiveIndexChange}
        onBeforeInit={onBeforeInit}
        modules={[Navigation]}
        breakpoints={{ 768: { slidesPerView: 3 } }}
      >
        {slides.map((slide, index) => {
          const isActive = activeIndex === index;
          return (
            <SwiperSlide
              key={index}
              className={clsx(
                isActive ? '!scale-100' : '!scale-[calc(190/210)]',
                'transition-all duration-300 ease-linear transform rounded-2xl',
              )}
            >
              {isLoading ? (
                <Skeleton width={205} height={300} className="mx-auto" />
              ) : (
                <div className="fade-in animate-in duration-1000">
                  <div
                    className={clsx(
                      isActive ? 'bg-primary-300' : '',
                      'text-center p-1 font-bold text-base text-white w-28 h-28 rounded-full -mb-20 mx-auto',
                    )}
                  >
                    {isActive && index}
                  </div>

                  <div
                    className={clsx(
                      isActive && 'bg-gradiant-slide p-1',
                      'md:w-52 w-48 h-auto rounded-2xl flex items-center justify-center mx-auto',
                    )}
                  >
                    <Image
                      width={198}
                      height={0}
                      src={slide}
                      className="mx-auto w-full h-full rounded-2xl"
                      alt=""
                    />
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <NavButton onClick={onSlideNext}>
        <Icon name="angle-right" color="#DBDBE2" />
      </NavButton>
    </div>
  );
};

export default Slider;
