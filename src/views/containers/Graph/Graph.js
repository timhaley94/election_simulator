import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import { Crosshair, LineSeries } from 'react-vis';
import { listOf } from '../../../utils';
import { Plot } from '../../components';

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
    <Plot
      width={ 650 }
      height={ 300 }
      xAxisTitle="Election Number"
      yAxisTitle="Percentage of Votes"
      xDomain={[1, iterations]}
      yDomain={[0, 1]}
      onMouseLeave={ onMouseLeave }
    >
      <Crosshair values={ crosshairValues } />
      {
        partyIds.map(
          (id, i) => renderSeries(id, i === 0)
        )
      }
    </Plot>
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
