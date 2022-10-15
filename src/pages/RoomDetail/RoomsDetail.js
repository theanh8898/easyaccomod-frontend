import React from 'react';
import {Breadcrumb} from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import './RoomsDetail.scss';
import RoomSlider from "./__components/RoomSlider/RoomSlider";
import {Link} from "react-router-dom";
import RoomOwner from "./__components/RoomOwner/RoomOwner";
import RoomRelate from "./__components/RoomRelate/RoomRelate";
import bannerImg from "../../assets/images/banner-sidebar.png";
import RoomRating from "./__components/RoomRating/RoomRating";
import UserRating from "../../components/UserRating/UserRating";
import {favoriteAPI, getIsFavoriteAPI, getRoomAPI, getUserInfoAPI, removeFavoriteAPI} from '../../api';
import {getApiErrorMessage, imageUrl, numberAsCurrency, transferRooms} from '../../common/helpers';
import {ROOM_TYPE_NAME} from '../../common/constants';
import RoomAttribute from '../../components/RoomAttributes/RoomAttribute';
import {toast} from 'react-toastify';
import {connect} from 'react-redux';

class RoomsDetail extends React.PureComponent {
  state = {
    isLoaded: false,
    room: null,
    owner: null,
    isFavorite: undefined,
    ratingID: null,
  };

  componentDidMount() {
    this.getData();

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params?.roomId !== this.props.match.params?.roomId) {
      this.getData();
    }
  }

  getData = () => {
    const {match: {params: {roomID}}} = this.props;
    this.getDataAsync(roomID).then(data => {
      this.setState({
        isLoaded: true,
        ...data,
      }, this.getIsFavorite);
    }).catch(() => {
      this.setState({
        isLoaded: true,
        room: null,
        owner: null,
      });
    });
  };

  getDataAsync = async (id) => {
    let owner = null;
    let {data: {data: room}} = await getRoomAPI(id);
    room = transferRooms(room);
    if (room?.images) {
      room.images.forEach(item => {
        item.url = imageUrl(item.url);
      });
    }
    if (room) {
      const {data: {data: user}} = await getUserInfoAPI(room.created_by);
      owner = user;
    }
    return {
      room,
      owner,
    };
  };

  getIsFavorite = () => {
    const {isAuthenticated} = this.props;
    const {room} = this.state;
    if (!isAuthenticated) {
      this.setState({
        isFavorite: undefined,
      });
      return;
    }
    getIsFavoriteAPI(room.id).then(res => {
      this.setState({
        isFavorite: res?.data?.data,
      });
    }).catch(error => {
      console.error(error);
    });
  };


  toggleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const {room} = this.state;
    const {isFavorite} = this.state;
    const api = isFavorite ? removeFavoriteAPI : favoriteAPI;
    api(room.id).then(() => {
      this.setState({
        isFavorite: !isFavorite,
      });
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
    });
  };

  onUpdateRating = (ratingID) => {
    this.setState({
      ratingID: ratingID,
    })
  };

  render() {
    const {isFavorite, isLoaded, room, ratingID} = this.state;

    if (!isLoaded || !room) {
      return (
        <div className="room-detail-page page-paper">
          {/*<Breadcrumb>*/}
          {/*  <BreadcrumbItem text="Nhà trọ" path={`/rooms/category`}/>*/}
          {/*</Breadcrumb>*/}
          <div className="grid wide">
            <div className="room-detail-page__wrap">
              {!isLoaded ? 'Đang tải...' : 'Bài viết không tồn tại.'}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="room-detail-page page-paper">
        <Breadcrumb>
          <BreadcrumbItem text={ROOM_TYPE_NAME[room.type]} path={`/rooms/category/${room.type}`}/>
          <BreadcrumbItem text={room.title} path={`/rooms/${room.id}`} isActive={true}/>
        </Breadcrumb>

        <div className="grid wide">
          <div className="room-detail-page__wrap">
            <div className="row">
              <div className="col c-12 m-12 l-8">
                <div className="room">
                  <div className="room__img">
                    <RoomSlider images={room.images}/>
                  </div>
                  <div className="room__text">
                    <h2 className="room__title">{room.title}</h2>
                    <div className="room__overview">
                      <div>
                        <span className="price">{numberAsCurrency(room.price)}</span>
                        {
                          room.area && <span className="area"> - {room.area} m2</span>
                        }
                      </div>

                      {
                        isFavorite !== undefined &&
                        <div className="favorite" onClick={this.toggleFavorite}>
                          <span>{isFavorite ? 'Đã lưu' : 'Lưu tin'}</span>
                          <i className="material-icons">{isFavorite ? 'favorite' : 'favorite_border'}</i>
                        </div>
                      }

                    </div>
                    <div className="room__address">
                      <i className="material-icons">place</i>
                      <span>{room.full_address}</span>
                    </div>

                    {
                      !!room.attributes.length &&
                      <div className="room__service">
                        <label className="title">Cơ sở vật chất:</label>
                        <div className="room__service-list">
                          <div className="row">
                            {
                              room.attributes.map((item, index) => (
                                <div className="col c-6 m-6 l-6" key={index}>
                                  <RoomAttribute attribute={item}/>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    }

                    <div className="room__description">
                      <h3>Thông tin chi tiết:</h3>
                      <pre>
                        {room.description}
                      </pre>
                    </div>

                    <div className="room__contact">
                      Liện hệ chủ nhà: <Link className="phone" to="">{room.owner_phone}</Link>
                    </div>
                  </div>
                  <RoomRating ratingID={ratingID}/>
                  <UserRating roomId={room.id} onSuccess={this.onUpdateRating}/>
                </div>
              </div>
              <div className="col c-12 m-12 l-4">
                <div className="right-bar">
                  <RoomOwner room={room}/>

                  <div className="banner-sidebar">
                    <img src={bannerImg} alt="banner"/>
                  </div>
                  <RoomRelate/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(RoomsDetail);
