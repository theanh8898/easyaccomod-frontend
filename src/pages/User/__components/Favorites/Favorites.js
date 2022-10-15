import React from 'react';
import {Link} from "react-router-dom";
import './Favorites.scss';
import {getAvailableRoomsAPI} from '../../../../api';
import {getApiErrorMessage, transferRooms} from '../../../../common/helpers';
import {toast} from 'react-toastify';
import HyperLink from '../../../../components/HyperLink/HyperLink';
import FavoriteItem from './FavoriteItem';

class Favorites extends React.PureComponent {
  state = {
    rooms: [],
    isLoaded: false,
    hasMore: false,
    pageInfo: {
      page: 1,
      pageSize: 10,
      totalItems: 0,
    },
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {pageInfo: {page, pageSize}} = this.state;
    getAvailableRoomsAPI({page, pageSize, is_favorite: true}).then(res => {
      const {pageSize, page, totalItems} = res.data.data.pageInfo;
      const hasMore = totalItems > page * pageSize;
      const rooms = transferRooms(res.data.data.pageData);
      this.setState(prevState => ({
        isLoaded: true,
        rooms: page === 1 ? rooms : [...prevState.rooms, ...rooms],
        pageInfo: res.data.data.pageInfo,
        hasMore,
      }));
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
    });
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        pageInfo: {
          ...prevState.pageInfo,
          page: prevState.pageInfo.page + 1,
        }
      }
    }, this.getData);
  };

  onRemoved = (id) => {
    this.setState(prevState => {
      const rooms = [...prevState.rooms];
      const idx = rooms.findIndex(item => item.id === id);
      if (idx >= 0) {
        rooms.splice(idx, 1);
      }
      return {
        rooms,
      }
    });
  };

  render() {
    const {rooms, isLoaded, hasMore} = this.state;
    if (!isLoaded) {
      return (
        <div className="user-favorite">
          <h2 className="user-page-main__heading">Danh sách yêu thích</h2>
          <div className="user-page-main__body">
            Đang tải...
          </div>
        </div>
      );
    }
    return (
      <div className="user-favorite">
        <h2 className="user-page-main__heading">Danh sách yêu thích</h2>
        <div className="user-page-main__body">
          <div className="favorites">
            {
              rooms.map((item) => (
                <FavoriteItem item={item} onRemoved={this.onRemoved} key={item.id}/>
              ))
            }
          </div>
          {
            hasMore &&
            <div className="show-more">
              <HyperLink className="btn btn-link-more" onClick={this.loadMore}>
                <span>Xem thêm</span>
                <i className="material-icons">
                  double_arrow
                </i>
              </HyperLink>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
