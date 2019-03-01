import React from 'react';
import PropTypes from 'prop-types';
import { formatPercent } from '../../../utils';
import styles from './Tooltip.module.scss';

const Tooltip = ({ x, values }) => (
  <div className={ styles.container }>
    <h3 className={ styles.title }>
      Election #{ x }
    </h3>
    <div className={ styles.items }>
      {
        values
          .sort((a, b) => b.value - a.value)
          .map(
            ({ name, value }) => (
              <div
                className={ styles.item }
                key={ `tooltip-item--${name}` }
              >
                <div className={ styles.color } />
                <p className={ styles.percent }>
                  { name }: { formatPercent(value) }
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
    })
  ).isRequired
}

export default Tooltip;
