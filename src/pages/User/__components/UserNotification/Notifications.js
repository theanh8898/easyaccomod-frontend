import React from 'react';
import './Notifications.scss';
import {getNotificationsAPI, updateNotificationStatusAPI} from "../../../../api";
import NotificationItem from "./NotificationItem";

class Notifications extends React.PureComponent {
  state = {
    isLoading: false,
    isLoaded: false,
    notifications: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({
      isLoading: true,
    });
    getNotificationsAPI().then(res => {
      this.setState({
        notifications: res.data.data.pageData,
        isLoaded: true,
        isLoading: false,
      });
    }).catch(error => {
      this.setState({
        isLoading: false,
      });
      console.log(error);
    });
  };

  markNotificationAsRead = (id) => {
    return updateNotificationStatusAPI(id, {status: 1})
      .then(this.getData)
      .catch(console.error);
  };

  render() {
    const {notifications} = this.state;

    return (
      <div className="user-notification">
        <h2 className="user-page-main__heading">Thông báo</h2>
        <div className="user-main-page__body">
          <ul className="notifications">
            {
              notifications.map((item, index) => (
                <NotificationItem key={index} item={item} markNotificationAsRead={this.markNotificationAsRead}/>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Notifications;
