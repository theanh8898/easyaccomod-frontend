import React, {PureComponent} from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {getInvoicesAPI, updateInvoiceAPI} from "../../../../api";
import {toast} from "react-toastify";
import {formatDateTime, getApiErrorMessage} from "../../../../common/helpers";
import SwitchTerm from "../../../../components/SwitchTerm/SwitchTerm";
import {INVOICE_STATUS} from "../../../../common/constants";
import './Invoices.scss'


class Invoices extends PureComponent {
  state = {
    invoices: [],
    isLoaded: false,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    getInvoicesAPI().then(res => {
      this.setState({
        isLoaded: true,
        invoices: res.data?.data?.pageData || [],
      })
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
      this.setState({
        isLoaded: true,
      })
    });
  }

  updateStatusInvoice = (status, id) => {
    console.log(status);

    updateInvoiceAPI(id, status).then(() => {
      toast.success('Đã lưu.');
      this.getData();
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
      this.setState({
        isLoaded: true,
      })
    })
  }


  render() {
    const {invoices} = this.state;
    return (
        <div className="invoices">
          <h2 className="user-page-main__heading">Quản lí hóa đơn</h2>
          <div className="user-page-main__body">
            <div className="invoices__wrapper">
              <div className="invoices-table ea-table">
                <TableContainer component={Paper}>
                  <Table  aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="center">Tin đăng</TableCell>
                        <TableCell align="center">Thời hạn</TableCell>
                        <TableCell align="center">Chi phí</TableCell>
                        <TableCell align="center">Ngày tạo</TableCell>
                        <TableCell align="center">Thanh toán</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                        <TableCell align="center">Thao tác</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoices.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell align="left" component="th" scope="row" width={60}>
                              {item.id}
                            </TableCell>
                            <TableCell align="center">{item.room_title}</TableCell>
                            <TableCell align="center" width={90}>{item.qty} <SwitchTerm term={item.term} /></TableCell>
                            <TableCell align="center" width={130}>{item.amount} VNĐ</TableCell>
                            <TableCell align="center" width={110}>{formatDateTime(item.created_at)}</TableCell>
                            <TableCell align="center" width={110}>{item.paid_at ? formatDateTime(item.paid_at) : 'Đang chờ'}</TableCell>
                            <TableCell align="center" width={120}>
                              <span
                                className={`
                                table-cell-status 
                                table-cell-status--${item.status === INVOICE_STATUS.WAIT_FOR_APPROVE ? 'disable' : ''}
                                table-cell-status--${item.status === INVOICE_STATUS.WAIT_FOR_PAY ? 'primary' : ''}
                                table-cell-status--${item.status === INVOICE_STATUS.PAID ? 'active' : ''}
                                table-cell-status--${item.status === INVOICE_STATUS.CANCELLED ? 'block' : ''}
                                
                                `}

                              >
                                {item.status === INVOICE_STATUS.WAIT_FOR_APPROVE ? 'Chờ duyệt' :  ''}
                                {item.status === INVOICE_STATUS.WAIT_FOR_PAY ? 'Chờ thanh toán' :  ''}
                                {item.status === INVOICE_STATUS.PAID ? 'Đã thanh toán' :  ''}
                                {item.status === INVOICE_STATUS.CANCELLED ? 'Hủy bỏ' :  ''}
                              </span>
                            </TableCell>
                            <TableCell width={70}>
                              {
                                item.status === INVOICE_STATUS.WAIT_FOR_APPROVE &&
                                <div className="invoice-actions" onClick={() => this.updateStatusInvoice(INVOICE_STATUS.WAIT_FOR_PAY, item.id)} >
                                  <i title={`Duyệt bài`} className="material-icons green-color">check</i>
                                </div>
                              }

                              {
                                item.status === INVOICE_STATUS.WAIT_FOR_PAY &&
                                <div className="invoice-actions" onClick={() => this.updateStatusInvoice(INVOICE_STATUS.PAID, item.id)} >
                                  <i title={`Thanh toán`} className="material-icons green-color">check</i>
                                </div>
                              }

                              {
                                item.status !== INVOICE_STATUS.PAID && item.status !== INVOICE_STATUS.CANCELLED &&
                                <div className="invoice-actions" onClick={() => this.updateStatusInvoice(INVOICE_STATUS.CANCELLED, item.id)} >
                                  <i title={`Hủy bỏ`} className="material-icons" style={{color: '#ff3f34'}}>cancel</i>
                                </div>
                              }

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

export default Invoices;
