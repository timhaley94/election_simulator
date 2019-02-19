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

const Controls = ({
  isInitializing,
  isRunning,
  start,
  stop,
  step,
  reset
}) => (
  <div>
    <Button
      disabled={ isInitializing }
      onClick={ isRunning ? stop : start }
    >
      { isRunning ? 'Stop' : 'Start'}
    </Button>
    <Button
      disabled={ isInitializing || isRunning || !step }
      onClick={ step }
    >
      Step
    </Button>
    <Button
      disabled={ isInitializing }
      onClick={ reset }
    >
      Reset
    </Button>
  </div>
);

Controls.propTypes = {
  isInitializing: PropTypes.bool.isRequired,
  isRunning: PropTypes.bool.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  step: PropTypes.func,
  reset: PropTypes.func.isRequired
};

Controls.defaultProps = {
  step: null
};

export default Controls;
