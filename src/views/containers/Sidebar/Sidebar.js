import React from 'react';
import PropTypes from 'prop-types';
import { Legend, Controls } from '..';
import styles from './Sidebar.module.scss';

const Sidebar = ({
  parties,
  reset,
  weights,
  setWeight
}) => (
  <div className={ styles.container }>
    <Legend
      parties={
        parties
          .toList()
          .sortBy(party => party.get('id'))
          .toJS()
          .map(
            party => ({
              ...party,
              name: party.id
            })
          )
      }
    />
    <Controls
      reset={ reset }
      weights={ weights }
      setWeight={ setWeight }
    />
  </div>
);

Sidebar.propTypes = {
  reset: PropTypes.func.isRequired,
  weights: PropTypes.object.isRequired,
  setWeight: PropTypes.func.isRequired,
};

export default Sidebar;
