import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../../utils'
import styles from './Legend.module.scss';

const Legend = ({ items }) => (
  <ul className={ styles.container }>
    {
      items.map(
        ({ name, color }) => (
          <li className={ styles.item }>
            <div
              className={ styles.color }
              style={{ backgroundColor: color }}
            />
            <p className={ styles.name }>
              { capitalizeFirstLetter(name) }
            </p>
          </li>
        )
      )
    }
  </ul>
);

Legend.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  )
};

export default Legend;
