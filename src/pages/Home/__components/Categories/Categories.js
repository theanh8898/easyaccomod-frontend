import React from 'react';
import {Link} from "react-router-dom";
import imgNhatro from '../../../../assets/images/categories/nha-tro.jpg';
import imgNhaNguyenCan from '../../../../assets/images/categories/nha-nguyen-can.jpg';
import imgChungCuMini from '../../../../assets/images/categories/chung-cu-mini.jpg';
import imgChungCu from '../../../../assets/images/categories/chung-cu.png';
import './Categories.scss';
import {ROOM_TYPE, ROOM_TYPE_NAME} from '../../../../common/constants';

function Categories() {
  const categories = [
    {
      id: ROOM_TYPE.BOARDING_HOUSE,
      title: ROOM_TYPE_NAME[ROOM_TYPE.BOARDING_HOUSE],
      avatarUrl: {
        backgroundImage: `url(${imgNhatro})`
      }
    },

    {
      id: ROOM_TYPE.FULL_HOUSE,
      title: ROOM_TYPE_NAME[ROOM_TYPE.FULL_HOUSE],
      avatarUrl: {
        backgroundImage: `url(${imgNhaNguyenCan})`
      }
    },

    {
      id: ROOM_TYPE.MINI_APARTMENT,
      title: ROOM_TYPE_NAME[ROOM_TYPE.MINI_APARTMENT],
      avatarUrl: {
        backgroundImage: `url(${imgChungCuMini})`
      }
    },

    {
      id: ROOM_TYPE.FULL_APARTMENT,
      title: ROOM_TYPE_NAME[ROOM_TYPE.FULL_APARTMENT],
      avatarUrl: {
        backgroundImage: `url(${imgChungCu})`
      }
    },

  ];

  return (
    <div className="home-categories">
        <div className="grid wide">
          <div className="home-categories__wrap">
            <h3 className="home-categories__title">Khám phá danh mục</h3>
            <div className="home-categories__list row">
              {
                categories.map((item,index) => (
                  <div className="col c-6 m-6 l-3" key={index}>
                    <Link className="home-categories-item" to={`/rooms/category/${item.id}`}>
                      <div className="home-categories-item__img" style={item.avatarUrl}/>
                      <h3 className="home-categories-item__title">{item.title}</h3>
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
    </div>
  );
}

export default Categories;
