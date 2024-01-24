import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperProps } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import NavButton from './NavButton';
import CarouselItem from './CarouselItem';

interface Props extends Pick<SwiperProps, Exclude<keyof SwiperProps, 'modules' | 'navigation'>> {}

const Carousel = ({
  children,
  centeredSlides = true,
  slidesPerView = 2,
  spaceBetween = 10,
  speed = 600,
  breakpoints = { 600: { slidesPerView: 3 } },
  ...props
}: Props) => {
  return (
    <div className="flex items-center lg:gap-7 md:gap-2 gap-0 pt-6">
      <NavButton className="prev" dir="left" />
      <Swiper
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
      <NavButton className="next" dir="right" />
    </div>
  );
};

Carousel.displayName = Swiper.displayName;

export { Carousel, CarouselItem };
