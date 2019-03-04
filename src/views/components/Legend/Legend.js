import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../../utils'
import styles from './Legend.module.scss';

const Legend = ({ title, items }) => (
  <ul className={ styles.container }>
    <p className={ styles.title }>{ title }</p>
    {
      items.map(
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
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  )
};

export default Legend;
