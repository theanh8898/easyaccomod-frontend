import React, {useEffect, useState} from 'react';
import './RoomRelate.scss'
import {Link} from "react-router-dom";
import {getAvailableRoomsAPI} from "../../../../api";
import {imageUrl, numberAsCurrency} from "../../../../common/helpers";

function RoomItem({room}) {
  const avatar = room.images?.[0];
  return (
    <li className="room-relate__item" key={room.id}>
      <Link to="" className="room-relate__item-link">
        <div className="room-relate__item-img" style={{backgroundImage: `url(${imageUrl(avatar?.url)})`}}/>
        <div className="room-relate__item-info">
          <div className="wrap">
            <h3 className="title">{room.title}</h3>
            <div className="area">{room.area} m2</div>
            <div className="price">{numberAsCurrency(room.price)}</div>
          </div>
          <div className="address">{room.province?.name}</div>
        </div>
      </Link>
    </li>
  );
}

function RoomRelate(props) {
  const [rooms, setRooms] = useState([]);

  useEffect(function () {
    getAvailableRoomsAPI().then(res => {
      const {data: {data: {pageData}}} = res;
      setRooms(pageData);
    }).catch(console.error);
  }, [setRooms]);

  return (
    <div className="room-relate">
      <h3 className="room-relate__title">Có thể bạn quan tâm ?</h3>

      <ul className="room-relate__list">
        {
          rooms.map(room => (
            <RoomItem room={room} key={room.id}/>
          ))
        }
      </ul>
    </div>
  );
}

export default RoomRelate;