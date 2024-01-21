import 'swiper/css';
import 'swiper/css/navigation';

import { useRef } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';

import NavButton from './NavButton';

const CarouselItem = SwiperSlide;

interface Props extends Omit<Omit<SwiperProps, 'onBeforeInit'>, 'modules'> {}

const Carousel = ({
  children,
  centeredSlides = true,
  slidesPerView = 2,
  spaceBetween = 10,
  speed = 500,
  breakpoints = { 768: { slidesPerView: 3 } },
}: Props) => {
  const swiperRef = useRef<SwiperType>();

  const onBeforeInit = (swiper: SwiperType) => (swiperRef.current = swiper);

  const onSlidePrev = () => swiperRef.current?.slidePrev();

  const onSlideNext = () => swiperRef.current?.slideNext();

  return (
    <div className="flex items-center gap-7 pt-6">
      <NavButton dir="left" onClick={onSlidePrev} />
      <Swiper
        centeredSlides={centeredSlides}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        speed={speed}
        onBeforeInit={onBeforeInit}
        modules={[Navigation]}
        breakpoints={breakpoints}
      >
        {children}
      </Swiper>
      <NavButton dir="right" onClick={onSlideNext} />
    </div>
  );
};

Carousel.displayName = SwiperSlide.displayName;

export { Carousel, CarouselItem };
