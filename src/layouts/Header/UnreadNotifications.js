import React from 'react';
import {Link} from "react-router-dom";
import {getUnreadNotificationsAPI} from "../../api";

class UnreadNotifications extends React.PureComponent {
  state = {
    isLoading: false,
    isLoaded: false,
    unreadnotifications: 0,
  };

  componentDidMount() {
    this.getData();
    window.reloadNotifications = this.getData;
  }

  componentWillUnmount() {
    window.reloadNotifications = undefined;
  }

  getData = () => {
    this.setState({
      isLoading: true,
    });
    getUnreadNotificationsAPI().then(res => {
      this.setState({
        unreadnotifications: res.data.data.totalItems,
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

  render() {
    const {unreadnotifications} = this.state;

    return (
      <Link className="header__top-link " to="/user/notifications">
        <span className="noti-icon">
          <i className="material-icons">notifications_none</i>
          {
            !!unreadnotifications &&
            <i className="noti-count">{unreadnotifications}</i>
          }
        </span>
        <span>Thông báo</span>
      </Link>
    );
  }
}

export default UnreadNotifications;
