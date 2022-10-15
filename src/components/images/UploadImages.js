import React from 'react';
import './UploadImages.scss';
import {getFileExt} from '../../common/helpers';
import {IMAGE_EXTENSIONS} from '../../common/constants';

const UploadImages = ({value, onChange, fieldName = null, multiple = false, maxFiles = 1, useType = 'avatar'}) => {
  const inputRef = React.useRef();

  const onInputChange = (event) => {
    const newValues = value ? [...value] : [];
    const files = Array.from(event.target.files);
    files.forEach(item => {
      if (IMAGE_EXTENSIONS.includes(getFileExt(item.name))) {
        item.preview_url = window.URL.createObjectURL(item);
      }
      if (useType) {
        item.use_type = useType;
      }
      newValues.push(item);
    });
    if (onChange && fieldName) {
      onChange({
        [fieldName]: newValues,
      });
    } else {
      onChange(newValues);
    }
  };

  const removeItem = (index) => () => {
    if (value?.[index]) {
      const newValues = [...value];
      if (newValues[index]?.preview_url) {
        window.URL.revokeObjectURL(newValues[index].preview_url);
      }
      newValues.splice(index, 1);
      if (onChange && fieldName) {
        onChange({
          [fieldName]: newValues,
        });
      } else {
        onChange(newValues);
      }
    }
  };

  const realValues = !useType ? (value || []) : (value || []).filter(item => item.use_type === useType);
  const showSelectFileButton = realValues.length < maxFiles;

  return (
    <div className="upload-images">
      <input
        type="file"
        multiple={multiple}
        ref={inputRef}
        className="d-none"
        onChange={onInputChange}
        accept={IMAGE_EXTENSIONS.map(item => `.${item}`).join(',')}
      />
      {
        !!value?.length &&
        value.map((item, index) => {
          if (useType && item.use_type !== useType) {
            return null;
          }
          return (
            <div className="picture-card has-image" key={index}>
              <div className="picture-card-content">
                {
                  item.preview_url &&
                  <img src={item.preview_url} alt={``}/>
                }
                <div className="tool-box">
                <span className="icon icon-delete" onClick={removeItem(index)}>
                  X
                </span>
                </div>
              </div>
            </div>
          );
        })
      }
      {
        showSelectFileButton &&
        <div
          className="picture-card clickable"
          onClick={() => {
            inputRef.current.click();
          }}
        >
          <div className="picture-card-content">
            <div className="add-button">
              +
              <div>Upload</div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default UploadImages;
