import React from 'react';
import ReactSelect from 'react-select';
import {useField} from 'formik';

function noOptionsMessage() {
  return 'Không có dữ liệu';
}

function Select({name, options, optionValueKey = 'id', optionLabelKey = 'name'}) {
  // eslint-disable-next-line
  const [field, meta, helpers] = useField(name);
  const {value} = meta;
  const {setValue} = helpers;

  const getOptionValue = React.useCallback((option) => {
    return option ? option[optionValueKey] : '';
  }, [optionValueKey]);

  const getOptionLabel = React.useCallback((option) => {
    return option ? option[optionLabelKey] : '';
  }, [optionLabelKey]);

  const onChange = React.useCallback((selectedOption) => {
    if (!selectedOption) {
      setValue(undefined);
    } else {
      setValue(selectedOption[optionValueKey]);
    }
  }, [setValue, optionValueKey]);

  const selectedValue = (options || []).find(item => item?.[optionValueKey] === value) || null;

  return (
    <ReactSelect
      placeholder="Chọn..."
      noOptionsMessage={noOptionsMessage}
      value={selectedValue}
      options={options}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      classNamePrefix="custom-select"
    />
  );
}

export default Select;

