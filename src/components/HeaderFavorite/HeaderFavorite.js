import React, {Fragment} from 'react';
import './HeaderFavorite.scss';
import {Link} from "react-router-dom";

function HeaderFavorite(props) {
  const bgImage = {
    backgroundImage: "url(https://cdn.chotot.com/JQxNKBS7OrkzsB5BDioLePXKtnofkxREjlRaVpnL5YQ/preset:listing/plain/5c38c65dc8b0a56ff45dafc4d59bc672-2697211333899878863.jpg)",
  }

  const isLogin =  false;
  const hasFavorite = true;

  return (
    <div className="header__favorite hide-mobile">
      <Link className="header__favorite-link" to="/user/favorites" >
        <i className="material-icons">favorite_border</i>
        <span className="hide-for-mobile">Yêu thích</span>
      </Link>
      {
        isLogin &&

        <Fragment>
          {
            hasFavorite  &&
            <ul className="header__favorite-list">
              <li className="header__favorite-item">
                <Link className="header__favorite-item-link" to="/">
                  <div className="header__favorite-item-img" style={bgImage}></div>
                  <h3 className="header__favorite-item-title">Nhà trọ sinh viên Quận 3, Đường Trần Quang Diệu</h3>
                </Link>
              </li>

              <li className="header__favorite-item">
                <Link className="header__favorite-item-link" to="/">
                  <div className="header__favorite-item-img" style={bgImage}></div>
                  <h3 className="header__favorite-item-title">CHO THUÊ PHÒNG BÌNH TRỊ ĐÔNG CÓ BẢO VỆ ,GIỜ TỰ DO CHO THUÊ PHÒNG BÌNH TRỊ ĐÔNG CÓ BẢO VỆ ,GIỜ TỰ DO</h3>
                </Link>
              </li>

              <li className="header__favorite-item">
                <Link className="header__favorite-item-link" to="/">
                  <div className="header__favorite-item-img" style={bgImage}></div>
                  <h3 className="header__favorite-item-title">Nhà trọ khép kín Cầu Diễn - 20m2</h3>
                </Link>
              </li>

              <li className="header__favorite-item">
                <Link className="header__favorite-item-link" to="/">
                  <div className="header__favorite-item-img" style={bgImage}></div>
                  <h3 className="header__favorite-item-title">Nhà trọ khép kín Cầu Diễn - 20m2</h3>
                </Link>
              </li>

              <li className="header__favorite-item">
                <Link className="header__favorite-item-link" to="/">
                  <div className="header__favorite-item-img" style={bgImage}></div>
                  <h3 className="header__favorite-item-title">Nhà trọ khép kín Cầu Diễn - 20m2</h3>
                </Link>
              </li>
            </ul>
          }

          {
            !hasFavorite &&
              <div className="header__favorite-list header__favorite-list--not-favorite">
                <div className="wrap">
                  <p>Bạn chưa lưu bài viết nào trong danh sách</p>
                </div>
              </div>
          }

        </Fragment>
      }

      {/*{*/}
      {/*  !isLogin &&*/}
      {/*  <div className="header__favorite-list header__favorite-list--not-logged">*/}
      {/*    <div className="wrap">*/}
      {/*      <p>Vui lòng đăng nhập để xem danh sách yêu thích</p>*/}
      {/*      <Link className="btn" to="/">Đăng nhập</Link>*/}
      {/*    </div>*/}

      {/*  </div>*/}
      {/*}*/}

    </div>
  );
}

export default HeaderFavorite;