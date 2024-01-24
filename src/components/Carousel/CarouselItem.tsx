import { SwiperSlide, SwiperSlideProps } from 'swiper/react';

const CarouselItem = ({ ...props }: SwiperSlideProps) => {
  return <SwiperSlide {...props} />;
};
CarouselItem.displayName = 'SwiperSlide';

export default CarouselItem;
