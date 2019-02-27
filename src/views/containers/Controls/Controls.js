import React from 'react';
import PropTypes from 'prop-types';
import { Button, Slider } from '../../components';

const Controls = ({ weights, setWeight, reset }) => (
  <div>
    <div>
      {
        weights.map(
          entry => (
            <div key={ `slider--${entry.get('type')}` }>
              <p>{ entry.get('name') } Strategy:</p>
              <Slider
                value={ entry.get('value') }
                onChange={
                  newValue => setWeight(
                    entry.get('type'),
                    newValue
                  )
                }
              />
            </div>
          )
        )
      }
    </div>
    <Button onClick={ reset }>
      Simulate
    </Button>
  </div>
);

Controls.propTypes = {
  weights: PropTypes.object.isRequired,
  setWeight: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default Controls;
