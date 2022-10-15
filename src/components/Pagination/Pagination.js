import React from 'react';
import './Pagination.scss';
import {Link} from "react-router-dom";

function Pagination(props) {
  return (
    <ul className="pagination">
      <li className="pagination-item">
        <Link to="">
          <i className="material-icons">navigate_before</i>
        </Link>
      </li>

      <li className="pagination-item pagination-item--active">
        <Link to="">1</Link>
      </li>

      <li className="pagination-item">
        <Link to="">2</Link>
      </li>

      <li className="pagination-item">
        <Link to="">3</Link>
      </li>

      <li className="pagination-item">
        <Link to="">4</Link>
      </li>

      <li className="pagination-item">
        <Link className="not-active" to="">...</Link>
      </li>

      <li className="pagination-item">
        <Link to="">9</Link>
      </li>

      <li className="pagination-item">
        <Link to="">10</Link>
      </li>

      <li className="pagination-item">
        <Link to="">
          <i className="material-icons">navigate_next</i>
        </Link>
      </li>
    </ul>
  );
}

export default Pagination;