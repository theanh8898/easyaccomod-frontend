import React, {Fragment} from 'react';
import './HeaderNotification.scss';

function HeaderNotification(props) {
  const hasLogin = true;


  return (
    <ul className="header_notification">
      {
        hasLogin &&
        <Fragment>
          <li className="header_notification-item">
            <span>✅ Báo cáo của bạn đã được quản trị viên xử lí.</span>
          </li>
          <li className="header_notification-item">
            <span>⏰ Đã tiếp nhận báo cáo bài viết của bạn. Quản trị viên sẽ xác minh và xử lí trong thời gian sớm nhất.
            ⏰ Đã tiếp nhận báo cáo bài viết của bạn. Quản trị viên sẽ xác minh và xử lí trong thời gian sớm nhất.</span>
          </li>
          <li className="header_notification-item">
            <span>❌ Cập nhật thông tin thất bại. Vui lòng thử lại hoặc liên hệ hotline để được trợ giúp</span>
          </li>
          <li className="header_notification-item">
            <span>🎉 Chúc mừng bạn đã tạo tài khoản thành công</span>
          </li>
        </Fragment>
      }

      {
        !hasLogin &&
        <Fragment>
          <li className="header_notification-item--not-logged">
            <span>Vui lòng đăng nhập để xem thông báo của bạn.</span>
          </li>
        </Fragment>
      }
    </ul>
  );
}

export default HeaderNotification;