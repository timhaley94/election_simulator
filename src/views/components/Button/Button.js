import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ disabled, onClick, children, ...rest }) => (
  <button
    { ...rest }
    disabled={ disabled || !onClick }
    onClick={ disabled || !onClick ? null : onClick }
  >
    { children }
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
};

Button.defaultProps = {
  disabled: false,
  onClick: null,
  children: null
};

export default Button;
