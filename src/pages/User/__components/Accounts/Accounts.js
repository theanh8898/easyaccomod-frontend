import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Accounts.scss';
import {deleteUserAPI, getUsersAPI, updateUserAPI} from "../../../../api";
import {USER_ROLE, USER_STATUS} from "../../../../common/constants";
import {getApiErrorMessage} from "../../../../common/helpers";
import {toast} from "react-toastify";

class Accounts extends React.PureComponent{
  state = {
    listUser: [],
    isLoaded: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const params = {
      role: USER_ROLE.HOUSE_OWNER
    }
    getUsersAPI(params).then(res => {
      this.setState({
        isLoaded: true,
        listUser: res.data?.data?.pageData || [],
      });
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
      this.setState({
        isLoaded: true,
      })
    })
  };

  updateStatusUser = (user, status) => {
    updateUserAPI(user.id, status).then(res => {
      toast.success('Đã lưu');
      this.getData();

    }).catch(error => {
      toast.error(getApiErrorMessage(error));
    })
  }

  deleteUser = (user) => {
    deleteUserAPI(user.id).then(res => {
      toast.success('Xóa thành công');
      this.getData();

    }).catch(error => {
      toast.error(getApiErrorMessage(error));
    })
  }

  render() {
    const {listUser} = this.state;

    return (
      <div className="accounts">
        <h2 className="user-page-main__heading">Danh sách tài khoản chủ nhà</h2>
        <div className="user-page-main__body">
          <div className="accounts__wrapper">
            <div className="user-list-table">
              <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">ID</TableCell>
                      <TableCell align="center">Tài khoản</TableCell>
                      <TableCell align="center">Họ tên</TableCell>
                      <TableCell align="center">Số điện thoại</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Trạng thái</TableCell>
                      <TableCell align="center">Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listUser.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="left" component="th" scope="row">
                          {item.id}
                        </TableCell>
                        <TableCell align="center">{item.username}</TableCell>
                        <TableCell align="center">{item.full_name}</TableCell>
                        <TableCell align="center">{item.phone}</TableCell>
                        <TableCell align="center">{item.email}</TableCell>
                        <TableCell align="center">
                      <span className={`user-status user-status--${item.status ? 'active' : 'block'}`}>
                        {item.status ? 'Active' :  'Block'}
                      </span>
                        </TableCell>
                        <TableCell align="center">
                          <div className="table-cell-actions">
                            {
                              item.status !== USER_STATUS.ACTIVE &&
                              <i onClick={() => this.updateStatusUser(item, USER_STATUS.ACTIVE)}
                                 className="material-icons green-color" title="Phê duyệt"
                              >
                                check
                              </i>
                            }

                            {
                              item.status === USER_STATUS.ACTIVE &&
                              <i onClick={() => this.updateStatusUser(item, 0) }
                                 className="material-icons gray-color" title="Khóa tài khoản"
                              >
                                block
                              </i>
                            }


                            <span></span>
                            <i onClick={() => this.deleteUser(item)}
                               className="material-icons red-color" title="Xóa tài khoản"
                            >
                              cancel
                            </i>
                          </div>
                        </TableCell>
                      </TableRow>
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

export default Accounts;
