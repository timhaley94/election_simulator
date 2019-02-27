import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  Crosshair,
  LineSeries
} from 'react-vis';
import { listOf } from '../../../utils';

const Simulation = ({ tick, iterations, history: rawHistory }) => {
  const [crosshairValues, setCrosshairValues] = useState([]);

  if (!rawHistory) {
    return null;
  }

  const partyIds = (
    rawHistory
      .get(0)
      .toList()
      .map(party => party.get('partyId'))
      .sortBy(id => id)
      .toJS()
  );

  const history = (
    rawHistory
      .reverse()
      .slice(0, tick + 1)
  );

  const onMouseLeave = () => {
    setCrosshairValues([]);
  };

  const onNearestX = (value, { index: i }) => {
    const entry = history.get(i - 1);

    if (i >= 1 && i <= tick) {
      setCrosshairValues(
        partyIds.map(
          id => (
            entry
              .get(id)
              .get('winPercentage')
          )
        )
      );
    } else {
      setCrosshairValues([]);
    }
  };

  const renderSeries = (partyId, isFirst) => {
    const data = (
      history
        .map(
          (value, i) => Map({
            x: i + 1,
            y: (
              value
                .get(partyId)
                .get('winPercentage')
            )
          })
        )
        .toJS()
    );

    const nullValues = (
      listOf(
        i => Map({
          x: i + tick + 2,
          y: null
        }),
        iterations - tick - 1
      ).toJS()
    );

    return (
      <LineSeries
        key={ `line-series--${partyId}` }
        curve="curveLinear"
        onNearestX={ isFirst ? onNearestX : null }
        getNull={({ y }) => y !== null}
        data={[ ...data, ...nullValues ]}
      />
    );
  }

  return (
    <XYPlot
      width={ 650 }
      height={ 300 }
      xDomain={[1, iterations]}
      yDomain={[0, 1]}
      onMouseLeave={ onMouseLeave }
    >
      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis />
      <YAxis />
      <Crosshair values={ crosshairValues } />
      {
        partyIds.map(
          (id, i) => renderSeries(id, i === 0)
        )
      }
    </XYPlot>
  );
};

Simulation.propTypes = {
  tick: PropTypes.number.isRequired,
  iterations: PropTypes.number.isRequired,
  history: PropTypes.instanceOf(List)
};

Simulation.defaultProps = {
  history: null
};

export default Simulation;
