import React from 'react';
import {imageUrl} from '../../common/helpers';
import './PreviewImages.scss';

const PreviewImages = ({images, useType}) => {
  const realImages = !useType ? (images || []) : (images || []).filter(item => item.use_type === useType);

  return (
    <div className="preview-images">
      {
        realImages.map((item, index) => (
          <ImageItem image={item} key={index}/>
        ))
      }
    </div>
  );
};

const ImageItem = ({image}) => {
  const url = image?.preview_url ? image.preview_url : (image?.url ? imageUrl(image.url) : null);
  if (!url) {
    return null;
  }
  return (
    <div className="image-card">
      <a href={url} target="_blank" rel="noopener noreferrer" className="image-card-content">
        <img src={url} alt={``}/>
      </a>
    </div>
  );
};

export default PreviewImages;
