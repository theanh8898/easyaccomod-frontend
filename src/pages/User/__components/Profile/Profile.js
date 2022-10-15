import React from 'react';
import {connect} from 'react-redux';
import './Profile.scss';
import {Link} from "react-router-dom";
import {Field, Formik} from 'formik';
import {updateCurrentUserAPI} from '../../../../api';
import {toast} from 'react-toastify';
import {getApiErrorMessage} from '../../../../common/helpers';
import {getCurrentUserAC} from '../../../../redux/actions';

class Profile extends React.PureComponent {
  state = {
    initialValues: {},
    isLoaded: false,
    isChangePass: false,
  };

  componentDidMount() {
    this.initData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user !== this.props.user) {
      this.initData();
    }
  }

  initData = () => {
    const {user} = this.props;
    if (user) {
      this.setState({
        initialValues: JSON.parse(JSON.stringify(user)),
        isLoaded: true,
      });
    }
  };

  toggleChangePass = () => {
    this.setState(prevState => ({
      isChangePass: !prevState.isChangePass,
    }));
  };

  onSubmit = (values, {setSubmitting}) => {
    const {dispatch} = this.props;
    updateCurrentUserAPI(values).then(() => {
      setSubmitting(false);
      dispatch(getCurrentUserAC());
      toast.success('Đã lưu');
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
      setSubmitting(false);
    });
  };

  render() {
    const {isChangePass, isLoaded, initialValues} = this.state;
    if (!isLoaded) {
      return null;
    }
    return (
      <div className="user-profile">
        <h2 className="user-page-main__heading">Thông tin tài khoản</h2>
        <div className="user-page-main__body">
          <div className="user-profile__wrapper">
            <Formik
              initialValues={initialValues}
              onSubmit={this.onSubmit}
            >
              {
                ({handleSubmit, isSubmitting}) => (
                  <div className="user-information">
                    <form className="user-form">

                      <div className="input-group">
                        <label className="input__label">Họ và tên:</label>
                        <Field name="full_name" className="input__text" type="text"/>
                      </div>

                      <div className="input-group">
                        <label className="input__label">Số điện thoại:</label>
                        <Field name="phone" className="input__text" type="text"/>
                      </div>

                      <div className="input-group">
                        <label className="input__label">Email:</label>
                        <Field name="email" className="input__text" type="email"/>
                      </div>

                      {
                        !isChangePass &&
                        <div className="change-pass" onClick={this.toggleChangePass}>Đổi mật khẩu?</div>
                      }

                      {
                        isChangePass &&
                        <>
                          <div className="input-group">
                            <label className="input__label">Mật khẩu hiện tại:</label>
                            <Field name="password" className="input__text" type="password"/>
                          </div>

                          <div className="input-group">
                            <label className="input__label">Mật khẩu mới:</label>
                            <Field name="new_password" className="input__text" type="password"/>
                          </div>

                          <div className="input-group">
                            <label className="input__label">Xác nhận mật khẩu mới:</label>
                            <Field name="confirm_password" className="input__text" type="password"/>
                          </div>

                          <div className="change-pass" onClick={this.toggleChangePass}>Không đổi mật khẩu</div>
                        </>
                      }

                      <button className="user-form-btn btn" onClick={handleSubmit} disabled={isSubmitting} type="submit">Cập
                        nhật
                      </button>

                    </form>
                  </div>
                )
              }
            </Formik>
            <div className="user-avatar">
              <div className="user-avatar__img">
                <img className="avatar" src="https://pm1.narvii.com/5974/22e162da7460781dba1a28976b21532929969275_00.jpg"/>
                <div className="overlay">
                  <span>Click để thay đổi</span>
                </div>
              </div>

              <Link to="#">Đổi ảnh đại diện</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps)(Profile);
