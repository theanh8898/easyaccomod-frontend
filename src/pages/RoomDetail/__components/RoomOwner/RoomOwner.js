import React from 'react';
import avatarDefault from '../../../../assets/images/no-avatar.png'
import './RoomOwner.scss'
import {Link} from "react-router-dom";

function RoomOwner({room}) {
  return (
    <div className="room-owner">
      <div className="wrap">
        <img src={avatarDefault} alt="avatar" className="avatar"/>
        <div className="info">
          <h3 className="name">{room.owner_full_name}</h3>
          <span className="role">Chủ nhà trọ</span>
        </div>
      </div>

      <Link className="link-to-profile" to="">Xem trang</Link>

      <Link className="contact" to="">
        <i className="material-icons">call</i>
        <span>{room.owner_phone}</span>
      </Link>
    </div>
  );
}

export default RoomOwner;
