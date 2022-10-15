import React, {Fragment} from 'react';
import {Field, Formik} from "formik";
import ErrorMessage from "../../../../components/Form/ErrorMessage";
import {ATTRIBUTE_VALUE_TYPE} from "../../../../common/constants";
import Select from "../../../../components/Form/Select";
import {addAttributeAPI} from '../../../../api';
import {toast} from 'react-toastify';
import {getApiErrorMessage} from '../../../../common/helpers';

const typeOptions = [
  {
    id: ATTRIBUTE_VALUE_TYPE.INTEGER,
    name: 'Kiểu số'
  },
  {
    id: ATTRIBUTE_VALUE_TYPE.TEXT,
    name: 'Kiểu chữ'
  }
];

class AttributeForm extends React.PureComponent {
  state = {
    initialValues: {
      name: '',
      value_type: '',
      predefined_values: ''
    }
  };

  validate = (values) => {
    const errors = {};
    const requireFields = [
      'name',
      'value_type'
    ];

    requireFields.forEach(field => {
      if (!values[field] || (typeof values[field] === 'string' && !values[field].trim())) {
        errors[field] = 'Vui lòng điền vào trường  này.';
      }
    });

    return errors;
  };

  onSubmit = (values, {setSubmitting}) => {
    const {onSuccess} = this.props;
    const data = {...values};
    if (data.predefined_values) {
      data.predefined_values = data.predefined_values.split('\n').map(item => item.trim());
    }
    addAttributeAPI(data).then(() => {
      setSubmitting(false);
      onSuccess();
      toast.success('Đã tạo');
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
      setSubmitting(false);
    });
  };

  render() {
    const {initialValues} = this.state;

    return (
      <div className="attribute-form">
        <h3 className="attribute-form__heading">Thêm tiện ích mới</h3>
        <div className="attribute-form__body">
          <Formik
            initialValues={initialValues}
            validate={this.validate}
            onSubmit={this.onSubmit}
          >
            {({
              handleSubmit,
              isSubmitting,
            }) => (
              <Fragment>
                <form className="ea-form">
                  <div className="input-group">
                    <label className="label">Tên tiện ích:</label>
                    <Field type="text" className="input" name="name" placeholder="Nhập tên tiện ích mới ..."/>
                    <ErrorMessage name="name"/>
                  </div>

                  <div className="input-group">
                    <label className="label">Loại giá trị:</label>
                    <Select
                      options={typeOptions}
                      name="value_type"
                    />
                    <ErrorMessage name="value_type"/>
                  </div>

                  <div className="input-group">
                    <label className="label">Giá trị mặc định:</label>
                    <Field as="textarea" rows={4} placeholder="Mỗi dòng là một giá trị" className="input" name="predefined_values"/>
                    <ErrorMessage name="predefined_values"/>
                  </div>

                  <div className="ea-form__btn">
                    <button onClick={handleSubmit} disabled={isSubmitting}>Tạo mới</button>
                  </div>
                </form>
              </Fragment>
            )}

          </Formik>
        </div>
      </div>
    );
  }
}

export default AttributeForm;
