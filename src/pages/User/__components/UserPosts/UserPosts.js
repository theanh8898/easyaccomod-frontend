import React from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {getRoomsAPI, updateRoomApprovedStatusAPI, updateRoomStatusAPI} from '../../../../api';
import {toast} from 'react-toastify';
import {getApiErrorMessage, transferRooms} from '../../../../common/helpers';
import PostItem from './PostItem';

class UserPosts extends React.PureComponent {
  state = {
    rooms: [],
    isLoaded: false,
    isAdminPage: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {match: {path}} = this.props;
    const isAdminPage = `${path}`.startsWith('/admin');
    getRoomsAPI().then(res => {
      this.setState({
        isLoaded: true,
        rooms: transferRooms(res.data?.data?.pageData || []),
        isAdminPage,
      });
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
      this.setState({
        isLoaded: true,
      });
    });
  };

  approvePost = (item, status) => () => {
    updateRoomApprovedStatusAPI(item.id, status).then(() => {
      toast.success('Đã lưu.');
      this.getData();
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
    });
  };

  updateRoomStatus = (item, status) => () => {
    updateRoomStatusAPI(item.id, status).then(() => {
      toast.success('Đã lưu.');
      this.getData();
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
    });
  };

  render() {
    const {rooms, isLoaded, isAdminPage} = this.state;
    if (!isLoaded) {
      return (
        <div className="user-posts">
          <h2 className="user-page-main__heading"/>
          <div className="user-page-main__body">
            <div className="user-posts__wrapper">
              Đang tải...
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="user-posts">
        <h2 className="user-page-main__heading">{isAdminPage ? 'Quản lý tin đăng' : 'Tin của bạn'}</h2>
        <div className="user-page-main__body">
          <div className="user-posts__wrapper">
            <div className="ea-table">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Tiêu đề</TableCell>
                      <TableCell align="center">Tình trạng</TableCell>
                      <TableCell align="center">Lượt xem</TableCell>
                      <TableCell align="center">Yêu thích</TableCell>
                      <TableCell align="center">Thời hạn</TableCell>
                      <TableCell align="center">Trạng thái</TableCell>
                      {
                        isAdminPage &&
                        <TableCell align="center">Thao tác</TableCell>
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms.map((item, index) => (
                      <PostItem
                        item={item}
                        itemIndex={index}
                        isAdmin={isAdminPage}
                        approvePost={this.approvePost}
                        updateRoomStatus={this.updateRoomStatus}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPosts;
