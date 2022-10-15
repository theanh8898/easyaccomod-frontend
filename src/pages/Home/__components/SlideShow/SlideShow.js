import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination, Autoplay} from 'swiper';
import 'swiper/swiper-bundle.css'
import 'swiper/swiper.scss';
import './SlideShow.scss'
import bannerImg1 from '../../../../assets/images/banner-1.jpg';
import bannerImg2 from '../../../../assets/images/banner-2.jpg';
import bannerImg3 from '../../../../assets/images/banner-3.jpg';
import bannerImg4 from '../../../../assets/images/banner-4.jpg';

SwiperCore.use([Pagination, Autoplay]);

function SlideShow(props) {

  const images = [
    {url: `${bannerImg1}`},
    {url: `${bannerImg2}`},
    {url: `${bannerImg3}`},
    {url: `${bannerImg4}`},

  ];

  const slides = images.map((item, index) => {
    return (
      <SwiperSlide key={index}>
        <div className="slide-item" style={{backgroundImage: `url(${item.url})`}}></div>
      </SwiperSlide>
    )
  });

  return (
    <div className="home-slide-show">
      <div className="grid wide">
        <Swiper
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={12}
          autoplay={{
            delay: 5000,
          }}
        >
          {slides}
        </Swiper>
      </div>
    </div>
  );
}

export default SlideShow;