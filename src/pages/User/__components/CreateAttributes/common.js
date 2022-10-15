import {ATTRIBUTE_VALUE_TYPE} from "../../../../common/constants";

export function getAttributeType(type) {
  let typeName = '';
  switch (type) {
    case ATTRIBUTE_VALUE_TYPE.INTEGER:
      typeName = 'Kiểu số';
      break;
    case ATTRIBUTE_VALUE_TYPE.TEXT:
      typeName = 'Kiểu chữ';
      break;
    default:
      break;
  }

  return typeName;
}
