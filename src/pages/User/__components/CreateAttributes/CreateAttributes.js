import React, {PureComponent} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './CreateAtrributes.scss';
import AttributeForm from "./AttributeForm";
import {deleteAttributeAPI, getAttributesAPI} from '../../../../api';
import {toast} from 'react-toastify';
import {getApiErrorMessage} from '../../../../common/helpers';
import HyperLink from '../../../../components/HyperLink/HyperLink';
import {getAttributeType} from "./common";

class CreateAttributes extends PureComponent {
  state = {
    openModal: false,
    attributes: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    getAttributesAPI().then(res => {
      this.setState({
        attributes: res.data.data,
      });
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
    });
  };

  handleOpen = () => {
    this.setState({
      openModal: true,
    });
  };

  handleClose = () => {
    this.setState({
      openModal: false,
    });
  };

  onUpsertSuccess = () => {
    this.getData();
    this.handleClose();
  };

  handleDelete = (item) => () => {
    const r = window.confirm(`Thuộc tính "${item.name}" sẽ bị xóa, bạn có chắc?`);
    if (r) {
      deleteAttributeAPI(item.id).then(() => {
        this.getData();
        toast.info('Đã xóa.');
      }).catch(error => {
        toast.error(getApiErrorMessage(error));
      });
    }
  };

  render() {
    const {openModal, attributes} = this.state;
    return (
      <div className="create-attributes">
        <h2 className="user-page-main__heading">Tiện ích phòng</h2>
        <div className="user-page-main__body">
          <div className="create-attributes__wrapper">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="center">Tên tiện ích</TableCell>
                    <TableCell align="center">Loại giá trị</TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attributes.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="left" component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{getAttributeType(row.value_type)}</TableCell>
                      <TableCell align="center">
                        <HyperLink onClick={this.handleDelete(row)}>Xóa</HyperLink>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <button className="create-attributes__button" onClick={this.handleOpen}>
              <i className="material-icons">add</i> <span>Thêm mới</span>
            </button>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className="ea-modal"
              open={openModal}
              onClose={this.handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openModal}>
                <div className="paper">
                  <AttributeForm onSuccess={this.onUpsertSuccess}/>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAttributes;
