import React from 'react';
import {Field} from 'formik';
import ErrorMessage from '../../components/Form/ErrorMessage';
import Select from '../../components/Form/Select';
import {Link} from 'react-router-dom';
import {USER_ROLE} from '../../common/constants';
import SelectLocations from '../../components/Form/SelectLocations';

const roleOptions = [
  {
    id: USER_ROLE.NORMAL_USER,
    name: 'Người thuê nhà',
  },
  {
    id: USER_ROLE.HOUSE_OWNER,
    name: 'Người cho thuê nhà',
  },
];

class RegisterForm extends React.PureComponent {
  render() {
    const {handleSubmit, isSubmitting, values} = this.props;
    return (
      <div className="auth-page register-page page-paper">
        <div className="grid wide">
          <div className="auth-page__wrapper">
            <h2 className="auth-page__heading">Đăng ký</h2>
            <div className="auth-page__body">
              <form className="auth-form-register">
                <h2 className="auth-form__title">1. Thông tin tài khoản</h2>
                <div className="row">
                  <div className="col c-12 m-6 l-4">
                    <div className="input-group">
                      <label className="input__label">Tên truy cập:</label>
                      <Field type="text" className="input__text" name="username"/>
                      <ErrorMessage name="username"/>
                    </div>
                  </div>

                  <div className="col c-12 m-6 l-4">
                    <div className="input-group">
                      <label className="input__label">Mật khẩu:</label>
                      <Field type="password" className="input__text" name="password"/>
                      <ErrorMessage name="password"/>
                    </div>
                  </div>


                  <div className="col c-12 m-6 l-4">
                    <div className="input-group">
                      <label className="input__label">Nhập lại mật khẩu:</label>
                      <Field type="password" className="input__text" name="confirmPassword"/>
                      <ErrorMessage name="confirmPassword"/>
                    </div>
                  </div>

                  <div className="col c-12 m-6 l-4">
                    <div className="input-group">
                      <label className="input__label">Loại tài khoản:</label>
                      <Select
                        options={roleOptions}
                        name="role"
                      />
                    </div>
                  </div>

                  <div className="col c-12 m-6 l-4">
                    <div className="input-group">
                      <label className="input__label">CCCD / CMND:</label>
                      <Field type="text" className="input__text" name="id_number"/>
                      <ErrorMessage name="id_number"/>
                    </div>
                  </div>

                </div>

                <h2 className="auth-form__title">2. Thông tin cá nhân</h2>
                <div className="row">
                  <div className="col c-12 m-4 l-4">
                    <div className="input-group">
                      <label className="input__label">Họ và tên:</label>
                      <Field type="text" className="input__text" name="full_name"/>
                      <ErrorMessage name="full_name"/>
                    </div>
                  </div>

                  <div className="col c-12 m-4 l-4">
                    <div className="input-group">
                      <label className="input__label">Số điện thoại:</label>
                      <Field type="text" className="input__text" name="phone"/>
                      <ErrorMessage name="phone"/>
                    </div>
                  </div>

                  <div className="col c-12 m-4 l-4">
                    <div className="input-group">
                      <label className="input__label">Email:</label>
                      <Field type="email" className="input__text" name="email"/>
                      <ErrorMessage name="email"/>
                    </div>
                  </div>

                  <SelectLocations values={values}/>

                  <div className="col c-12 m-6 l-12">
                    <div className="input-group">
                      <label className="input__label">Địa chỉ</label>
                      <Field name="address" className="input__text" type="text"/>
                      <ErrorMessage name="address"/>
                    </div>
                  </div>
                </div>
                <button className="auth-form-btn" onClick={handleSubmit} disabled={isSubmitting}>Đăng Ký</button>
                <div className="auth-more">
                  <span/>
                  <Link to="/login">Đăng nhập</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
