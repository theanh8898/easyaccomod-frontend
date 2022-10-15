import React from 'react';
import {NavLink} from "react-router-dom";
import './Sidebar.scss';
import {connect} from 'react-redux';
import {USER_ROLE} from '../../../../common/constants';

function Sidebar({user}) {
  if (!user) {
    return (
      <div className="user-page-sidebar">
      </div>
    );
  }
  return (
    <div className="user-page-sidebar">
      <div className="user-page-sidebar__heading">
        <img className="avatar" src="https://pm1.narvii.com/5974/22e162da7460781dba1a28976b21532929969275_00.jpg"/>
        <div className="info">
          <span>Xin chào!</span>
          <h3 className="info-name">{user.full_name}</h3>
        </div>
      </div>

      <div className="user-page-sidebar__body">
        <ul className="user-nav">
          <li className="user-nav-item">
            <NavLink className="user-nav-item__link" to="/user/profile" activeClassName="active">
              <i className="material-icons green-color">person</i>
              <span className="user-nav-item__link-label">Thông tin tài khoản</span>
            </NavLink>
          </li>

          <li className="user-nav-item">
            <NavLink className="user-nav-item__link" to="/user/notifications">
              <i className="material-icons blue-color">notifications</i>
              <span className="user-nav-item__link-label">Thông báo của tôi</span>
            </NavLink>
          </li>

          <li className="user-nav-item">
            <NavLink className="user-nav-item__link" to="/user/favorites">
              <i className="material-icons pink-color">favorite</i>
              <span className="user-nav-item__link-label">Yêu thích</span>
            </NavLink>
          </li>

          {
            user.role === USER_ROLE.HOUSE_OWNER &&
            <>
              <li className="user-nav-item">
                <h3 className="user-nav-item__label">Quản lí bài viết</h3>
              </li>

              <li className="user-nav-item">
                <NavLink className="user-nav-item__link" to="/user/post/create">
                  <i className="material-icons" style={{color: '#26de81'}}>post_add</i>
                  <span className="user-nav-item__link-label">Thêm tin mới</span>
                </NavLink>
              </li>

              <li className="user-nav-item">
                <NavLink className="user-nav-item__link" to="/user/post/all">
                  <i className="material-icons" style={{color: '#EE5A24'}}>article</i>
                  <span className="user-nav-item__link-label">Tin của bạn</span>
                </NavLink>
              </li>
            </>
          }

          {
            user.role === USER_ROLE.ADMIN &&
            <>
              <li className="user-nav-item">
                <h3 className="user-nav-item__label">Quản trị viên</h3>
              </li>

              <li className="user-nav-item">
                <NavLink className="user-nav-item__link" to="/admin/accounts/all">
                  <i className="material-icons" style={{color: '#45aaf2'}}>people_alt</i>
                  <span className="user-nav-item__link-label">Quản lý tài khoản</span>
                </NavLink>
              </li>

              <li className="user-nav-item">
                <NavLink className="user-nav-item__link" to="/admin/post/all">
                  <i className="material-icons" style={{color: '#EE5A24'}}>article</i>
                  <span className="user-nav-item__link-label">Quản lý tin đăng</span>
                </NavLink>
              </li>

              <li className="user-nav-item">
                <NavLink className="user-nav-item__link" to="/admin/post/create">
                  <i className="material-icons" style={{color: '#26de81'}}>post_add</i>
                  <span className="user-nav-item__link-label">Thêm tin mới</span>
                </NavLink>
              </li>

              <li className="user-nav-item">
                <NavLink className="user-nav-item__link" to="/admin/post/attributes">
                  <i className="material-icons" style={{color: '#fd9644'}}>workspaces</i>
                  <span className="user-nav-item__link-label">Quản lý thuộc tính</span>
                </NavLink>
              </li>

              <li className="user-nav-item">
                <NavLink className="user-nav-item__link" to="/admin/invoices">
                  <i className="material-icons" style={{color: '#ffdd59'}}>receipt_long</i>
                  <span className="user-nav-item__link-label">Hóa đơn</span>
                </NavLink>
              </li>
            </>
          }

        </ul>
      </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps)(Sidebar);
