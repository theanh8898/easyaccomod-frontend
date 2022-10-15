import React from 'react';
import {ATTRIBUTE_VALUE_TYPE} from '../../common/constants';

const RoomAttribute = React.memo(function RoomAttribute({attribute}) {
  let value = '';


  switch (attribute.attribute_value_type) {
    case ATTRIBUTE_VALUE_TYPE.INTEGER:
      value = attribute.int_value;
      break;
    default:
      value = attribute.text_value;
      break;
  }
  return (
    <div className="room__service-item">
      <label>{attribute.attribute_name}:</label> <span>{value}</span>
    </div>
  )
});

export default RoomAttribute;
