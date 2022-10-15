import React, {Fragment} from 'react';
import {connect, useDispatch} from 'react-redux';
import './Header.scss';
import logo from '../../assets/images/logo.png';
import appStoreIcon from '../../assets/images/icons/app-store.svg';
import chPlayIcon from '../../assets/images/icons/chplay.svg';
import {Link} from "react-router-dom";
import HeaderFavorite from "../../components/HeaderFavorite/HeaderFavorite";
import HeaderNavMobile from "../../components/HeaderNavMobile/HeaderNavMobile";
import {logoutAC} from '../../redux/actions';
import UnreadNotifications from "./UnreadNotifications";

const Header = React.memo(function Header({user}) {
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutAC());
  };

  return (
    <header className="header">
      <div className="header__top hide-for-mobile">
        <div className="grid wide wrap">
          <div className="header__top-collection">
            <span>Tải ứng dụng</span>
            <Link className="header__top-link-icon" to="/">
              <img src={appStoreIcon} alt="app-store"/>
            </Link>
            <Link className="header__top-link-icon" to="/">
              <img src={chPlayIcon} alt="ch-play"/>
            </Link>
          </div>

          <ul className="header__top-navbar">
            <li className="header__top-navbar-item header__top-notify">
              <UnreadNotifications/>
            </li>
            <li className="header__top-navbar-item">
              <Link className="header__top-link" to="/">
                <i className="material-icons">help_outline</i>
                <span>Trợ giúp</span>
              </Link>
            </li>
            {
              !user.info &&
              <Fragment>
                <li className="header__top-navbar-item header__top-navbar-item--separate">
                  <Link className="header__top-link" to="/register">
                    Đăng ký
                  </Link>
                </li>
                <li className="header__top-navbar-item">
                  <Link className="header__top-link" to="/login">
                    Đăng nhập
                  </Link>
                </li>
              </Fragment>
            }
            {
              user.info &&
              <Fragment>
                <li className="header__top-navbar-item header__top-navbar-item--separate">
                  <Link className="header__top-link" to="/user/profile">{user.info.full_name}</Link>
                </li>
                <li className="header__top-navbar-item">
                  <a href={`#`} className="header__top-link" onClick={handleLogout}>Đăng xuất</a>
                </li>
              </Fragment>
            }
          </ul>
        </div>

      </div>

      <div className="grid wide">

        <div className="header-with-search">
          <div className="header__logo">
            <Link className="header__logo-link" to="/">
              <img className="header__logo-img" src={logo} alt="Logo"/>
            </Link>
          </div>

          <div className='d-flex'>
            <HeaderFavorite/>

            <div className="header__account hide-for-desktop hide-mobile">
              <Link to="/">
                <i className="material-icons">account_circle</i>
              </Link>

              <ul className="header__account-menu dropdown">
                {
                  !user.info &&
                  <Fragment>
                    <li className="header__account-menu-item">
                      <Link to="/login">
                        Đăng nhập
                      </Link>
                    </li>

                    <li className="header__account-menu-item">
                      <Link to="/register">
                        Đăng ký
                      </Link>
                    </li>
                  </Fragment>
                }

                {
                  user.info &&
                  <Fragment>
                    <li className="header__account-menu-item">
                      <Link to="/user/profile">{user.info.full_name}</Link>
                    </li>
                    <li className="header__account-menu-item">
                      <a href={`#`} onClick={handleLogout}>Đăng xuất</a>
                    </li>
                  </Fragment>
                }
              </ul>
            </div>

            <HeaderNavMobile user={user}/>

          </div>

        </div>
      </div>
    </header>
  );
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Header);
