import React, {Fragment} from 'react';
import {Field, Formik} from "formik";
import ErrorMessage from "../../../../components/Form/ErrorMessage";
import Select from "../../../../components/Form/Select";
import {ATTRIBUTE_VALUE_TYPE, OBJECT_TYPE, ROOM_TERM, ROOM_TYPE} from "../../../../common/constants";
import {addRoomApi, getAttributesAPI, uploadImageAPI} from '../../../../api';
import {toast} from 'react-toastify';
import {getApiErrorMessage} from '../../../../common/helpers';
import RoomAttributes from './RoomAttributes';
import SelectLocations from '../../../../components/Form/SelectLocations';
import UploadImages from '../../../../components/images/UploadImages';
import {history} from '../../../../history';
import {connect} from 'react-redux';

const typeOptions = [
  {
    id: ROOM_TYPE.FULL_APARTMENT,
    name: "Chung cư"
  },
  {
    id: ROOM_TYPE.MINI_APARTMENT,
    name: "Chung cư mini",
  },
  {
    id: ROOM_TYPE.FULL_HOUSE,
    name: "Nhà nguyên căn",
  },
  {
    id: ROOM_TYPE.BOARDING_HOUSE,
    name: "Phòng trọ"
  }
];

const roomPeriod = [
  {
    id: ROOM_TERM.MONTH,
    name: 'Tháng',
  },
  {
    id: ROOM_TERM.QUARTER,
    name: 'Quý',
  },
  {
    id: ROOM_TERM.YEAR,
    name: 'Năm'
  }
];

const termOptions = [
  {
    id: ROOM_TERM.WEEK,
    name: 'Tuần',
  },
  {
    id: ROOM_TERM.MONTH,
    name: 'Tháng',
  },
  {
    id: ROOM_TERM.QUARTER,
    name: 'Quý',
  },
  {
    id: ROOM_TERM.YEAR,
    name: 'Năm',
  }
];

class CreatePost extends React.PureComponent {
  state = {
    initialValues: {
      title: '',
      province_id: '',
      district_id: '',
      ward_id: '',
      address: '',
      description: '',
      attributes: [],
      type: '',
      expires_at: '',
      price: '',
      payment_period: '',
      term: '',
      term_qty: '',
      owner_full_name: '',
      owner_phone: '',
      images_placeholder: '',
      area: ''
    },
    attributes: [],
    isLoaded: false,
    images: [],
    isAdminPage: false,
  };

  setFieldValueRef = React.createRef();

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {match: {path}, user} = this.props;
    const isAdminPage = `${path}`.startsWith('/admin');
    this.setState(prevState => ({
      isAdminPage,
      initialValues: {
        ...prevState.initialValues,
        owner_phone: user?.phone,
        owner_full_name: user?.full_name,
      }
    }));
    getAttributesAPI().then(res => {
      const attributes = (res.data.data || []);
      attributes.forEach(item => {
        if (item.predefined_values) {
          item.predefined_values = item.predefined_values.map(v => ({
            id: v,
            name: v,
          }));
        }
      });
      this.setState(prevState => {
        const initialValues = {...prevState.initialValues};
        if (attributes.length) {
          attributes.forEach(item => {
            initialValues[`attribute_${item.id}`] = '';
          });
        }
        return {
          attributes,
          initialValues,
          isLoaded: true,
        };
      });
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
    });
  };

  onImagesChange = (data) => {
    this.setState(data, () => {
      this.setFieldValueRef.current('images_placeholder', new Date().getTime());
    });
  };

  validate = (values) => {
    const {images} = this.state;
    const errors = {};
    const requireFields = [
      'title',
      'province_id',
      'district_id',
      'ward_id',
      'address',
      'description',
      'type',
      'price',
      'term',
      'term_qty',
      'owner_full_name',
      'owner_phone',
      'area',
      'payment_period',
    ];

    requireFields.forEach(field => {
      if (!values[field] || (typeof values[field] === 'string' && !values[field].trim())) {
        errors[field] = 'Vui lòng điền vào trường  này.';
      }
    });

    if (values?.description?.length && values.description.length < 10) {
      errors.description = 'Vui lòng nhập tối thiểu 10 ký tự.';
    }

    if (!images?.length || images.length < 3) {
      errors['images_placeholder'] = 'Vui lòng chọn ít nhất 3 ảnh';
    }

    return errors;
  };

  onSubmit = (values, {setSubmitting}) => {
    const {isAdminPage} = this.state;
    this.handleSubmitAsync(this.prepareData(values)).then(() => {
      setSubmitting(false);
      if (isAdminPage) {
        toast.success('Đã lưu.');
        history.push('/admin/post/all');
      } else {
        toast.success('Đã lưu, vui lòng chờ phê duyệt.');
        history.push('/user/post/all');
      }
    }).catch(error => {
      setSubmitting(false);
      toast.error(getApiErrorMessage(error));
    });
  };

  prepareData = (values) => {
    const {attributes} = this.state;
    const data = {...values};
    data.attributes = [];
    const attributeMap = {};
    attributes.forEach(item => {
      attributeMap[item.id] = item;
    });
    Object.keys(data).forEach(key => {
      if (key.startsWith('attribute_')) {
        const attribute_id = key.substr(10);
        if (attributeMap[attribute_id]) {
          const attr = {
            attribute_id: attributeMap[attribute_id].id,
          };
          if (attributeMap[attribute_id].value_type === ATTRIBUTE_VALUE_TYPE.TEXT) {
            attr.text_value = data[key];
          }
          if (attributeMap[attribute_id].value_type === ATTRIBUTE_VALUE_TYPE.INTEGER) {
            attr.int_value = data[key];
          }
          data.attributes.push(attr);
        }
        delete data[key];
      }
    });
    return data;
  };

  handleSubmitAsync = async (data) => {
    const {images} = this.state;
    const {data: {data: room}} = await addRoomApi(data);
    if (room && images.length) {
      try {
        for (let i = 0; i < images.length; i++) {
          await uploadImageAPI(images[i], {
            object_type: OBJECT_TYPE.ROOM,
            object_id: room.id,
            used_type: images[i].use_type,
          });
        }
      } catch (error) {
        toast.warning('Không upload được ảnh');
      }
    }
  };

  render() {
    const {initialValues, attributes, isLoaded, images} = this.state;

    if (!isLoaded) {
      return (
        <div className="create-post">
          <h2 className="user-page-main__heading">Thêm tin mới</h2>
          <div className="user-page-main__body">
            <div className="create-post__wrapper">
              Loading...
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="create-post">
        <h2 className="user-page-main__heading">Thêm tin mới</h2>
        <div className="user-page-main__body">
          <div className="create-post__wrapper">
            <Formik
              initialValues={initialValues}
              validate={this.validate}
              onSubmit={this.onSubmit}
            >
              {({
                handleSubmit,
                isSubmitting,
                values,
                setFieldValue
              }) => {
                this.setFieldValueRef.current = setFieldValue;
                return (
                  <Fragment>
                    <form className="ea-form">
                      <div className="row">
                        <div className="col c-12 m-12 l-12">
                          <div className="input-group">
                            <label className="label">Tiêu đề:</label>
                            <Field type="text" className="input" name="title"/>
                            <ErrorMessage name="title"/>
                          </div>
                        </div>
                        <div className="col c-12 m-4 l-4">
                          <div className="input-group">
                            <label className="label">Loại phòng:</label>
                            <Select options={typeOptions} name="type"/>
                            <ErrorMessage name="type"/>
                          </div>
                        </div>

                        <div className="col c-12 m-4 l-4">
                          <div className="input-group">
                            <label className="label">Giá thuê:</label>
                            <Field type="text" className="input" name="price"/>
                            <ErrorMessage name="price"/>
                          </div>
                        </div>

                        <div className="col c-12 m-4 l-4">
                          <div className="input-group">
                            <label className="label">Chu kỳ thanh toán:</label>
                            <Select
                              options={roomPeriod}
                              name="payment_period"
                            />
                            <ErrorMessage name="payment_period"/>
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <SelectLocations values={values}/>
                      </div>

                      <div className="row">
                        <div className="col c-12 m-8 l-8">
                          <div className="input-group">
                            <label className="label">Địa chỉ</label>
                            <Field name="address" className="input" type="text"/>
                            <ErrorMessage name="address"/>
                          </div>
                        </div>
                        <div className="col c-12 m-4 l-4">
                          <div className="input-group">
                            <label className="label">Diện tích (m2):</label>
                            <Field type="text" className="input" name="area"/>
                            <ErrorMessage name="area"/>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <RoomAttributes attributes={attributes}/>
                      </div>

                      <div className="row">
                        <div className="col l-12">
                          <div className="input-group">
                            <label className="label">Hình ảnh:</label>
                            <UploadImages
                              value={images}
                              onChange={this.onImagesChange}
                              fieldName="images"
                              maxFiles={10}
                              multiple={true}
                              useType="avatar"
                            />
                            <div className="d-none">
                              <Field name="images_placeholder" className="input" type="text"/>
                            </div>
                            <ErrorMessage name="images_placeholder"/>
                          </div>
                        </div>

                        <div className="col l-12">
                          <div className="input-group">
                            <label className="label">Mô tả:</label>
                            <Field as="textarea" rows="6" name="description" className="input"/>
                            <ErrorMessage name="description"/>
                          </div>

                        </div>
                      </div>

                      <div className="row">


                        <div className="col l-6">
                          <div className="input-group">
                            <label className="label">Thời gian đăng phòng:</label>
                            <Field type="text" className="input" name="term_qty"/>
                            <ErrorMessage name="term_qty"/>
                          </div>
                        </div>

                        <div className="col l-6">
                          <div className="input-group">
                            <label className="label">Đơn vị:</label>
                            <Select
                              options={termOptions}
                              name="term"
                            />
                            <ErrorMessage name="term"/>
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="col l-6">
                          <div className="input-group">
                            <label className="label">Tên liên hệ:</label>
                            <Field type="text" className="input" name="owner_full_name"/>
                            <ErrorMessage name="owner_full_name"/>
                          </div>
                        </div>
                        <div className="col l-6">
                          <div className="input-group">
                            <label className="label">Số điện thoại liên hệ:</label>
                            <Field type="text" className="input" name="owner_phone"/>
                            <ErrorMessage name="owner_phone"/>
                          </div>
                        </div>
                      </div>

                      <div className="ea-form__btn">
                        <button onClick={handleSubmit} disabled={isSubmitting} type="submit">Tạo mới</button>
                      </div>
                    </form>
                  </Fragment>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.info,
});

export default connect(mapStateToProps)(CreatePost);
