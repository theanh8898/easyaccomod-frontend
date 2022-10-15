import React from 'react';
import PropTypes from 'prop-types';

const handleClick = (preventDefault, options) => (event) => {
  if (preventDefault) {
    event.preventDefault();
  }
  if (options?.disabled) {
    return;
  }
  if (options?.onClick) {
    options.onClick(event);
  }
};

const HyperLink = React.memo(function HyperLink({href, children, preventDefault, ...props}) {
  return (
    <a href={href} {...props} onClick={handleClick(preventDefault, props)}>{children}</a>
  );
});

HyperLink.propTypes = {
  href: PropTypes.string,
  preventDefault: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

HyperLink.defaultProps = {
  href: '#',
  className: '',
  preventDefault: true,
  disabled: false,
};

export default HyperLink;
