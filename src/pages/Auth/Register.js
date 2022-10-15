import React from 'react';
import "./Auth.scss";
import {USER_ROLE, USER_STATUS} from '../../common/constants';
import {Formik} from 'formik';
import {registerAPI} from '../../api';
import {history} from '../../history';
import RegisterForm from './RegisterForm';
import {toast} from 'react-toastify';
import {getApiErrorMessage} from '../../common/helpers';

class Register extends React.PureComponent {
  state = {
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      role: USER_ROLE.NORMAL_USER,
      id_number: '',
      full_name: '',
      phone: '',
      email: '',
      province_id: '',
      district_id: '',
      ward_id: '',
      address: '',
    },
  };

  validate = (values) => {
    const errors = {};
    const requiredFields = [
      'username',
      'password',
      'confirmPassword',
      'email',
      'full_name',
      'address',
      'province_id',
      'district_id',
      'ward_id',
      'phone',
    ];
    requiredFields.forEach(field => {
      if (!values[field] || (typeof values[field] === 'string' && !values[field].trim())) {
        errors[field] = 'Vui lòng điền vào trường này.';
      }
    });
    if (values.role === USER_ROLE.HOUSE_OWNER && !values.id_number) {
      errors.id_number = 'Vui lòng điền vào trường này.';
    }
    return errors;
  };

  onSubmit = (values, {setSubmitting}) => {
    registerAPI(values).then((res) => {
      setSubmitting(false);
      if (res?.data?.data?.status === USER_STATUS.INACTIVE) {
        toast.success("Đăng ký thành công, vui lòng chờ phê duyệt.");
        history.push('/');
      } else {
        toast.success("Đăng ký thành công, bạn có thể đăng nhập.");
        history.push('/login');
      }
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
        {({handleSubmit, isSubmitting, values, setFieldValue}) =>
          <RegisterForm
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            values={values}
            setFieldValue={setFieldValue}
          />
        }
      </Formik>
    );
  }

}

export default Register;
