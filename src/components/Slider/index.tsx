import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { Icon, Skeleton } from '@/components';

const imgSrc = '/images/full-card.png';
const imgShowSrc = '/images/card-show.png';

const slides = [imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgShowSrc];

interface Props {
  isLoading?: boolean;
}

const Slider = ({ isLoading = false }: Props) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className="flex items-center gap-7">
      <div>
        <button
          className="w-10 h-10 rounded-full flex-center border border-neutral-600"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <Icon name="angle-left" color="#DBDBE2" />
        </button>
      </div>
      <Swiper
       onActiveIndexChange={newIndex => console.log(newIndex)}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={30}
        centeredSlides={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="text-black">
            {isLoading ? (
              <Skeleton width={198} height={265} className="mx-auto" />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {index}
                <Image width={198} height={265} src={slide} className="mx-auto" alt="" />
              </motion.div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <button
          className="w-10 h-10 rounded-full flex-center border border-neutral-600"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <Icon name="angle-right" color="#DBDBE2" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
