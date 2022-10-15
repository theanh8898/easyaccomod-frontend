import React from 'react';
import './RoomFilter.scss'

function RoomsFilter(props) {
  return (
    <div  className="rooms-filter">
      <h3 className="rooms-filter__heading">
        <i className="material-icons">filter_alt</i>
        <span>Bộ lọc tìm kiếm</span>
      </h3>

      <div className="filters">
        <div className="filter">
          <div className="filter__label">Địa điểm</div>
          <div className="filter__content">
            <div className="filter__wrapper">
              <i className="material-icons">location_on</i>
              <span>Hà Nội</span>
              <i className="material-icons">expand_more</i>
            </div>
          </div>

        </div>

        <div className="filter">
          <div className="filter__label">Khoảng giá</div>
          <div className="filter__content">
            <div className="filter-by-price">
              <div className="wrapper">
                <input name="price-from" type="number" placeholder="Từ"/>
                <span></span>
                <input name="price-to" type="number" placeholder="Đến"/>
              </div>

              <button className="filter__btn">Áp dụng</button>
            </div>

          </div>
        </div>
        <div className="filter">
          <div className="filter__label">Loại phòng</div>
          <div className="filter__content">
            <div className="filter-checkbox-list">
              <div className="filter-checkbox-item">
                <input type="checkbox" id="vehicle11" name="vehicle1" value="0"/>
                <label htmlFor="vehicle11">Chung cư</label>
              </div>
              <div className="filter-checkbox-item">
                <input type="checkbox" id="vehicle22" name="vehicle1" value="1"/>
                <label htmlFor="vehicle22">Chung cư mini</label>
              </div>
              <div className="filter-checkbox-item">
                <input type="checkbox" id="vehicle33" name="vehicle1" value="2"/>
                <label htmlFor="vehicle33">Nhà nguyên căn</label>
              </div>
              <div className="filter-checkbox-item">
                <input type="checkbox" id="vehicle44" name="vehicle1" value="3"/>
                <label htmlFor="vehicle44">Nhà trọ</label>
              </div>
            </div>

          </div>
        </div>

        <div className="filter">
          <div className="filter__label">Điều kiện cơ sở vật chất</div>
          <div className="filter__content">
            <div className="filter-checkbox-list">
              <div className="filter-checkbox-item">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="0"/>
                <label htmlFor="vehicle1">Điều hòa</label>
              </div>
              <div className="filter-checkbox-item">
                <input type="checkbox" id="vehicle2" name="vehicle1" value="1"/>
                <label htmlFor="vehicle2">Nóng lạnh</label>
              </div>
              <div className="filter-checkbox-item">
                <input type="checkbox" id="vehicle3" name="vehicle1" value="2"/>
                <label htmlFor="vehicle3">Khép kín</label>
              </div>
              <div className="filter-checkbox-item">
                <input type="checkbox" id="vehicle4" name="vehicle1" value="3"/>
                <label htmlFor="vehicle4">Chung chủ</label>
              </div>
            </div>

          </div>
        </div>

        <button className="filter__btn">Xóa tất cả</button>

      </div>

    </div>
  );
}

export default RoomsFilter;