import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination, Navigation, EffectFade} from 'swiper';

import './RoomSlider.scss'

SwiperCore.use([Pagination,Navigation, EffectFade]);

function RoomSlider(props) {
  const {images} = props;

  const slides = images.map((item, index) => {
    return (
      <SwiperSlide key={index}>
        <div className="slider-item" style={{backgroundImage: `url(${item.url})`}}/>
      </SwiperSlide>
    )
  });

  const params = {
    spaceBetween: 10,
    slidesPerView: 1,
    loop:true,
    navigation: true,
    pagination: true
  }

  return (
    <div className="room-slider-main">
      <Swiper {...params}>
        {slides}
      </Swiper>
    </div>
  );
}

export default RoomSlider;