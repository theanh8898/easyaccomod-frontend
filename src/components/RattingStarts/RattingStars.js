import React from 'react';
import PropTypes from 'prop-types';
import './RatingStars.scss'

RattingStars.propTypes = {
  score: PropTypes.number.isRequired
};

RattingStars.defaultProps = {
  score: 0
}

function RattingStars({score}) {
  const stars = [];

  let starFull = Math.floor(score);
  let starHalf = 0;


  let i = 0, index = 0;

  for (i; i < starFull; i++) {
    stars.push(
      <div className="rating__start" key={index}>
        <i className="material-icons">star</i>
      </div>
    );
    index++;
  }


  let decimal = score - starFull;

  if (decimal !== 0) {
    stars.push(
      <div className="rating__start" key={index}>
        <i className="material-icons">star_half</i>
      </div>
    );
    index++;

    starHalf = 1;
  }


  let starBorder = 5 - starHalf - starFull;

  for (i = 0; i < starBorder; i++) {
    stars.push(
      <div className="rating__start" key={index}>
        <i className="material-icons">star_border</i>
      </div>
    );
    index++;
  }


  return (
    <div className="rating__starts">
      {stars}
    </div>
  );
}

export default RattingStars;