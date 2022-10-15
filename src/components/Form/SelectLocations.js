import React from 'react';
import {getDistrictsByProvinceAPI, getProvincesAPI, getWardsByDistrictAPI} from '../../api';
import Select from './Select';
import ErrorMessage from './ErrorMessage';

class SelectLocations extends React.PureComponent {
  state = {
    provinces: [],
    districts: [],
    wards: [],
  };

  componentDidMount() {
    this.getProvinces();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.values?.province_id !== this.props.values?.province_id) {
      this.getDistricts();
    }
    if (prevProps.values?.district_id !== this.props.values?.district_id) {
      this.getWards();
    }
  }

  getProvinces = () => {
    getProvincesAPI().then(res => {
      this.setState({
        provinces: res.data.data,
      });
    }).catch(error => {
      console.error(error);
    });
  };

  getDistricts = () => {
    const {values} = this.props;
    if (!values?.province_id) {
      this.setState({
        districts: [],
      });
      return;
    }
    getDistrictsByProvinceAPI(values.province_id).then(res => {
      this.setState({
        districts: res.data.data,
      });
    }).catch(error => {
      console.error(error);
    });
  };

  getWards = () => {
    const {values} = this.props;
    if (!values?.district_id) {
      this.setState({
        wards: [],
      });
      return;
    }
    getWardsByDistrictAPI(values.district_id).then(res => {
      this.setState({
        wards: res.data.data,
      });
    }).catch(error => {
      console.error(error);
    });
  };

  render() {
    const {hideSelectWards, colClassName} = this.props;
    const {provinces, districts, wards} = this.state;
    return (
      <>
        <div className={colClassName}>
          <div className="input-group">
            <label className="input__label label">Tỉnh / Thành phố</label>
            <Select
              options={provinces}
              name="province_id"
            />
            <ErrorMessage name="province_id"/>
          </div>
        </div>

        <div className={colClassName}>
          <div className="input-group">
            <label className="input__label label">Quận / Huyện</label>
            <Select
              options={districts}
              name="district_id"
            />
            <ErrorMessage name="district_id"/>
          </div>
        </div>

        {
          !hideSelectWards &&
          <div className={colClassName}>
            <div className="input-group">
              <label className="input__label label">Phường / Xã</label>
              <Select
                options={wards}
                name="ward_id"
              />
              <ErrorMessage name="ward_id"/>
            </div>
          </div>
        }
      </>
    );
  }
}

SelectLocations.defaultProps = {
  hideSelectWards: false,
  colClassName: 'col c-12 m-6 l-4',
};

export default SelectLocations;
