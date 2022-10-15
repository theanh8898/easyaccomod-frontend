import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import './Auth.scss';
import {Field, Formik} from 'formik';
import ErrorMessage from '../../components/Form/ErrorMessage';
import {loginAPI} from '../../api';
import {loginSuccessAC} from '../../redux/actions';
import {toast} from 'react-toastify';
import {getApiErrorMessage} from '../../common/helpers';

class Login extends React.PureComponent {
  state = {
    initialValues: {
      username: '',
      password: '',
    },
  };

  validate = (values) => {
    const errors = {};
    const requiredFields = [
      'username',
      'password',
    ];
    requiredFields.forEach(field => {
      if (!values[field] || (typeof values[field] === 'string' && !values[field].trim())) {
        errors[field] = 'Vui lòng điền vào trường này.';
      }
    });
    return errors;
  };

  onSubmit = (values, {setSubmitting}) => {
    const {dispatch} = this.props;
    loginAPI(values).then((res) => {
      setSubmitting(false);
      dispatch(loginSuccessAC(res.data.data));
      toast.success('Đăng nhập thành công.');
    }).catch((error) => {
      toast.error(getApiErrorMessage(error));
      setSubmitting(false);
    });
  };

  render() {
    const {initialValues} = this.state;
    return (
      <Formik
        initialValues={initialValues}
        validate={this.validate}
        onSubmit={this.onSubmit}
      >
        {({
          handleSubmit,
          isSubmitting,
        }) =>
          (
            <div className="auth-page login-page page-paper">
              <div className="grid wide">
                <div className="auth-page__wrapper">
                  <h2 className="auth-page__heading">Đăng nhập</h2>
                  <div className="auth-page__body">
                    <form className="auth-form">
                      <div className="input-group">
                        <label className="input__label">Tên truy cập:</label>
                        <Field type="text" className="input__text" name="username"/>
                        <ErrorMessage name="username"/>
                      </div>
                      <div className="input-group">
                        <label className="input__label">Mật khẩu:</label>
                        <Field type="password" className="input__text" name="password"/>
                        <ErrorMessage name="password"/>
                      </div>
                      <button className="auth-form-btn" onClick={handleSubmit} disabled={isSubmitting}>Đăng nhập
                      </button>
                      <div className="auth-more">
                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                        <Link to="/register">Đăng ký</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </Formik>
    );
  }
}

export default connect()(Login);
