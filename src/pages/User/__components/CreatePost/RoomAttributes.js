import React from 'react';
import Select from '../../../../components/Form/Select';
import {ATTRIBUTE_VALUE_TYPE} from '../../../../common/constants';
import {Field} from 'formik';

const RoomAttributes = React.memo(function RoomAttributes({attributes}) {
  return attributes.map((item) => (
    <div className="col c-12 m-6 l-4" key={item.id}>
      <div className="input-group">
        <label className="label">{item.name}:</label>
        {
          item.predefined_values?.length &&
          <Select
            options={item.predefined_values}
            name={`attribute_${item.id}`}
          />
        }
        {
          !item.predefined_values?.length && item.value_type === ATTRIBUTE_VALUE_TYPE.INTEGER &&
          <>
            <Field className="input" type="number" name={`attribute_${item.id}`}/>
          </>
        }
        {
          !item.predefined_values?.length && item.value_type === ATTRIBUTE_VALUE_TYPE.TEXT &&
          <>
            <Field className="input" type="text" name={`attribute_${item.id}`}/>
          </>
        }
      </div>
    </div>
  ));
});

export default RoomAttributes;
