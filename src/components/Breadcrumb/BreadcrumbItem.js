import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

BreadcrumbItem.propTypes = {
  isActive: PropTypes.bool,
  path: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  className: PropTypes.string,
};

BreadcrumbItem.defaultProps = {
  isActive: false,
  className: ''
};

function BreadcrumbItem(props) {
  const {isActive, path, text, className} = props;
  return (
    <li className={`breadcrumb-item ${isActive ? 'active' : ''} ${className}`}>
      {
        !path ? text : <Link to={path}>{text}</Link>
      }
    </li>
  );
}

export default BreadcrumbItem;