import React from 'react';
import {connect} from 'react-redux';
import {Formik} from "formik";
import ErrorMessage from "../Form/ErrorMessage";
import Select from "../Form/Select";
import {ROOM_TYPE} from "../../common/constants";
import SelectLocations from "../Form/SelectLocations";
import "./NewSearch.scss";
import {history} from '../../history';
import {buildQueryString} from '../../common/helpers';

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
const typePrices = [
  {
    id: 1,
    name: "Dưới 1 triệu",
    min: 0,
    max: 1000000,
  },
  {
    id: 2,
    name: "1 triệu - 2 triệu",
    min: 1000000,
    max: 2000000,
  },
  {
    id: 3,
    name: "2 triệu - 3 triệu",
    min: 2000000,
    max: 3000000,
  },
  {
    id: 4,
    name: "3 triệu - 4 triệu",
    min: 3000000,
    max: 4000000,
  },
  {
    id: 5,
    name: "4 triệu - 5 triệu",
    min: 4000000,
    max: 5000000,
  },
  {
    id: 6,
    name: "5 triệu - 6 triệu",
    min: 5000000,
    max: 6000000,
  },
];

class NewSearch extends React.PureComponent {
  state = {
    initialValues: {
      type: '',
    },
    attributes: [],
    isLoaded: false,
    images: [],
    isAdminPage: false,
  };

  setFieldValueRef = React.createRef();

  onSubmit = (values) => {
    const params = {...values};
    if (params.price) {
      const option = typePrices.find(item => item.id === params.price);
      if (option) {
        params.min_price = option.min;
        params.max_price = option.max;
      }
    }
    history.push('/rooms/search?' + buildQueryString(params));
  };

  render() {
    const {initialValues} = this.state;

    return (
      <div className="search-bar">
        <div className="grid wide">
          <Formik
            initialValues={initialValues}
            validate={this.validate}
            onSubmit={this.onSubmit}
          >
            {({
              handleSubmit,
              values,
              setFieldValue
            }) => {
              this.setFieldValueRef.current = setFieldValue;
              return (
                <div className="form-container">
                  <div className="--title">Tìm kiếm</div>
                  <form className="ea-form">
                    <div className="typeRoom">
                      <div className="input-group">
                        <label className="label">Loại phòng:</label>
                        <Select options={typeOptions} name="type"/>
                        <ErrorMessage name="type"/>
                      </div>
                    </div>
                    <SelectLocations
                      colClassName="header-search-col"
                      values={values}
                      hideSelectWards={true}
                    />
                    <div className="typePrice">
                      <div className="input-group">
                        <label className="label">Khoảng giá:</label>
                        <Select options={typePrices} name="price"/>
                        <ErrorMessage name="type"/>
                      </div>
                    </div>
                    <div className="ea-form__btn">
                      <button onClick={handleSubmit} type="submit">Lọc tin</button>
                    </div>
                  </form>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.info,
});

export default connect(mapStateToProps)(NewSearch);
