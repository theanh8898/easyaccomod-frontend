import React from 'react';
import {ROOM_APPROVED_STATUS} from "../../../../common/constants";
import {formatDateTime} from "../../../../common/helpers";
import {history} from '../../../../history';

const NOTIFICATION_TYPE = {
  ROOM_CREATED: 1,
  ROOM_APPROVED: 2,
  ROOM_DISPLAYED: 3,
};

const NOTIFICATION_STATUS = {
  UNREAD: 0,
  READ: 1,
};

function NotificationItem({item, markNotificationAsRead}) {
  let content = '';

  switch (item.type) {
    case NOTIFICATION_TYPE.ROOM_CREATED:
      content = `⏰ Tin đăng ${item.params.room.title} đã được tạo. Quản trị viên sẽ xác minh và phê duyệt trong thời gian sớm nhất.`;
      break;
    case NOTIFICATION_TYPE.ROOM_APPROVED:
      if (item.params.approved_status === ROOM_APPROVED_STATUS.APPROVED) {
        content = `✅ Tin đăng ${item.params.room.title} đã được phê duyệt. Vui lòng thanh toán để được hiển thị.`;
      } else if (item.params.approved_status === ROOM_APPROVED_STATUS.REJECTED) {
        content = `Tin đăng ${item.params.room.title} đã bị từ chối.`;
      }
      break;
    case NOTIFICATION_TYPE.ROOM_DISPLAYED:
      content = `✅ Tin đăng ${item.params.room.title} đã được hiển thị.`;
      break;
    default:
      break;
  }

  const handleClick = function () {
    if (item.status === NOTIFICATION_STATUS.UNREAD) {
      markNotificationAsRead(item.id).then(function () {
        if (item.params.room) {
          history.push(`/rooms/${item.params.room.id}`);
        }
        if (window.reloadNotifications) {
          window.reloadNotifications();
        }
      });
    } else {
      if (item.params.room) {
        history.push(`/rooms/${item.params.room.id}`);
      }
    }
  };

  if (!content) {
    return null;
  }

  return (
    <li className={`notification ${item.status === NOTIFICATION_STATUS.UNREAD ? 'unread' : ''}`} onClick={handleClick}>
      <div className="notification__img">
        <img src={'https://assets.ifttt.com/images/channels/651849913/icons/large.png'} alt="icon"/>
      </div>
      <div className="notification__info">
        <div className="content">{content}</div>
        <span className="created">{formatDateTime(item.created_at)}</span>
      </div>
    </li>
  );
}

export default NotificationItem;
