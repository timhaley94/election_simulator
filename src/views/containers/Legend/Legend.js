import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../../utils'
import styles from './Legend.module.scss';

const Legend = ({ parties }) => (
  <ul className={ styles.container }>
    <p className={ styles.title }>Parties</p>
    {
      parties.map(
        ({ name, color }) => (
          <li
            key={ `legend--item--${name}` }
            className={ styles.item }
          >
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
  parties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default Legend;
