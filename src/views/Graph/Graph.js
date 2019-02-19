import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import {
  XYPlot,
  // XAxis,
  // YAxis,
  // HorizontalGridLines,
  HorizontalBarSeries
} from 'react-vis';

const Simulation = ({ results }) => {
  if (!results) {
    return null;
  }

  const data = (
    results
      .toList()
      .map(
        value => Map({
          y: value.get('partyId'),
          x: value.get('winPercentage')
        })
      )
      .sortBy(({ y }) => y)
      .toJS()
  );

  return (
    <XYPlot
      yType="ordinal"
      width={ 300 }
      height={ 300 }
    >
      <HorizontalBarSeries
        color="lightcoral"
        data={ data }
      />
    </XYPlot>
  );
};

Simulation.propTypes = {
  results: PropTypes.instanceOf(Map)
};

Simulation.defaultProps = {
  results: null
};

export default Simulation;
