import React from 'react';
import {ROOM_TERM} from "../../common/constants";
import PropTypes from 'prop-types';

SwitchTerm.propTypes = {
  term: PropTypes.number.isRequired
};



function SwitchTerm(props) {
  const {term} = props;

  if(term === ROOM_TERM.WEEK) {
    return 'tuần';
  }

  if(term === ROOM_TERM.MONTH) {
    return 'tháng';
  }

  if(term === ROOM_TERM.QUARTER) {
    return 'quý';
  }

  if(term === ROOM_TERM.YEAR) {
    return 'năm';
  }

  return (
      <div>N/A</div>
  );
}

export default SwitchTerm;