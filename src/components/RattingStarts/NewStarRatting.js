import React, {useState} from 'react';
import {FaStar} from "react-icons/all";
import './RatingStars.scss'
import {useField} from "formik";


function NewStarRating({name}) {
  const [field, meta, helpers] = useField(name);
  const {value} = meta;
  const {setValue} = helpers;
  const [hover, setHover] = useState(null);
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => (setValue(ratingValue))}
            />
            <FaStar
              className="start"
              color={ratingValue <= (hover || value) ? "#ffc107" : "#e4e5e9"}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}

    </div>
  );
}

export default NewStarRating;