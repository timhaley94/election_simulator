import React from 'react';
import PropTypes from 'prop-types';
import styles from './Centered.module.scss';

/*
  In order for flex children to be able to align
  themselves but aligned with the edge of the
  largest child, you need to have to centered
  div's.
*/
const Centered = ({ children }) => (
  <div className={ styles.outer }>
    <div className={ styles.inner}>
      { children }
    </div>
  </div>
);

Centered.propTypes = {
  children: PropTypes.node.isRequired
};

export default Centered;
