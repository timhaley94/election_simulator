import React from 'react';
import PropTypes from 'prop-types';
import { formatPercent } from '../../../utils';
import styles from './Tooltip.module.scss';

const Tooltip = ({ x, values }) => (
  <div className={ styles.container }>
    <p className={ styles.title }>
      Election #{ x }
    </p>
    <div className={ styles.items }>
      {
        values
          .sort((a, b) => b.value - a.value)
          .map(
            ({ name, value, color }) => (
              <div
                className={ styles.item }
                key={ `tooltip-item--${name}` }
              >
                <div
                  className={ styles.color }
                  style={{ backgroundColor: color }}
                />
                <p className={ styles.percent }>
                  { formatPercent(value) }
                </p>
              </div>
            )
          )
      }
    </div>
  </div>
);

Tooltip.propTypes = {
  x: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Tooltip;
