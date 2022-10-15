import React from 'react';
import PostItem from "../../../../components/PostItem/PostItem";
import './NewPost.scss';
import {getAvailableRoomsAPI} from '../../../../api';
import {toast} from 'react-toastify';
import {getApiErrorMessage, transferRooms} from '../../../../common/helpers';
import HyperLink from '../../../../components/HyperLink/HyperLink';

class NewPosts extends React.PureComponent {
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
    getAvailableRoomsAPI({page, pageSize}).then(res => {
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

  render() {
    const {rooms, isLoaded, hasMore} = this.state;
    if (!isLoaded) {
      return null;
    }
    return (
      <div className="home-new-posts bg-gray">
        <div className="grid wide">
          <div className="home-new-posts__wrap">
            <h3 className="home-new-posts__title">Tin mới đăng</h3>

            <div className="home-new-posts__list">
              <div className="row">

                {
                  rooms.map((post) => (
                    <div className="col c-6 m-4 l-2-4" key={post.id}>
                      <PostItem post={post}/>
                    </div>
                  ))
                }

              </div>
            </div>

            {
              hasMore &&
              <div className="home-new-posts__more">
                <HyperLink className="btn btn-link-more" onClick={this.loadMore}>
                  <span>Xem thêm</span>
                  <i className="material-icons">
                    double_arrow
                  </i>
                </HyperLink>
              </div>
            }


          </div>

          {/*<div className="home-new-post__pagination hide-mobile">*/}
          {/*  <Pagination/>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

export default NewPosts;
