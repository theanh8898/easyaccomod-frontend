import React from 'react';
import {Link} from "react-router-dom";
import './RoomSortBart.scss'
import {toast} from "react-toastify";

class RoomsSortBar extends React.PureComponent{
  showNotification = () => {
    toast.info('Tính năng đang được phát triển');
  };

  render() {
    return (
      <div className="rooms-sort-bar">
        <div className="sort-btn-mobile">
          <div className="d-flex">
            <i className="material-icons">sort</i>
            <span>Sắp xếp</span>
          </div>

          <ul className="sort-list">
            <li className="sort-item" onClick={this.showNotification}>Mới nhất</li>
            <li className="sort-item sort-item--selected">Xem nhiều</li>
            <li className="sort-item">Giá từ thấp đến cao</li>
            <li className="sort-item">Giá từ cao đến thấp</li>
          </ul>
        </div>

        <span className="rooms-sort-bar__label hide-mobile">Sắp xếp theo:</span>
        <div className="rooms-sort-bar-options hide-mobile">
          <div className="rooms-sort-bar-options__option rooms-sort-bar-options__option--selected">Mới nhất</div>
          <div className="rooms-sort-bar-options__option">Xem nhiều</div>
          <div className="rooms-sort-bar-options__option rooms-sort-bar-options__option--dropdown">
            <div className="select-input">
              <label>Giá</label>
              <i className="material-icons">expand_more</i>
            </div>

            <ul className="select-input__list">
              <li className="select-input__item">
                <Link to="#" className="select-input__link selected">
                  <span>Giá thấp đến cao</span>
                  <i className="material-icons">check</i>
                </Link>
              </li>

              <li className="select-input__item">
                <Link to="#" className="select-input__link">
                  <span>Giá cao đến thấp</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="filter-btn-mobile">
          <div className="d-flex">
            <span>Bộ lọc</span>
            <i className="material-icons">filter_alt</i>
          </div>
        </div>

      </div>
    );
  }
}

export default RoomsSortBar;