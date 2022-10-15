import React, {Fragment, useState} from 'react';
import './HeaderNavMobile.scss'
import {Link} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {logoutAC} from '../../redux/actions';

function HeaderNavMobile({user}) {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const handleOnClick = () => {
    setIsActive(!isActive);
  }
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutAC());
  };

  const isLogged = user.isAuthenticated;
  return (
    <div className="header__navbar-mobile hide-for-desktop" onClick={handleOnClick}>
      <div className={`menu-icon ${isActive ? 'open-menu' : ''}`}>
        <span/>
        <span/>
        <span/>
        <div className="menu_overlay"/>
      </div>
      <ul className="menu-mobile">
        {
          !isLogged &&
            <Fragment>
              <li className="menu-item">
                <Link to="/login">
                  <i className="material-icons">login</i>
                  <span>Đăng nhập</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/register">
                  <i className="material-icons">person_add</i>
                  <span>Đăng ký</span>
                </Link>
              </li>
            </Fragment>
        }

        {
          isLogged && user.info &&
            <Fragment>
              <li className="menu-item">
                <Link to="/user">
                  <i className="material-icons green-color">person</i>
                  <span>Tài khoản</span>
                </Link>
              </li>
              {/*<li className="menu-item">*/}
              {/*  <Link to="/">*/}
              {/*    <i className="material-icons blue-color">notifications</i>*/}
              {/*    <span>Thông báo</span>*/}
              {/*  </Link>*/}
              {/*</li>*/}
              <li className="menu-item">
                <Link to="/favorites">
                  <i className="material-icons pink-color">favorite</i>
                  <span>Yêu thích</span>
                </Link>
              </li>

              <li className="menu-item">
                <a onClick={handleLogout} href="frontend/src/components/HeaderNavMobile/HeaderNavMobile#">
                  <i className="material-icons black-color">login</i>
                  <span>Đăng xuất</span>
                </a>
              </li>
            </Fragment>
        }

      </ul>
    </div>
  );
}

export default HeaderNavMobile;
