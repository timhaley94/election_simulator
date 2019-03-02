import React from 'react';
import PropTypes from 'prop-types';
import { Button, Slider } from '../../components';
import styles from './Controls.module.scss';

const Controls = ({ weights, setWeight, reset }) => (
  <div className={ styles.container }>
    <p className={ styles.title }>Voter Strategies</p>
    <div className={ styles.sliders }>
      {
        weights.map(
          entry => (
            <div
              className={ styles.sliderContainer }
              key={ `slider--${entry.get('type')}` }
            >
              <p className={ styles.sliderLabel }>
                { entry.get('name') }
              </p>
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
    <div className={ styles.buttonContainer }>
      <Button onClick={ reset }
      >
        Simulate
      </Button>
    </div>
  </div>
);

Controls.propTypes = {
  weights: PropTypes.object.isRequired,
  setWeight: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default Controls;
