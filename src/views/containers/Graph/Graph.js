import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import { Crosshair, LineSeries } from 'react-vis';
import { listOf } from '../../../utils';
import { Plot } from '../../components';

const Simulation = ({
  tick,
  iterations,
  parties: rawParties,
  history: rawHistory
}) => {
  const [crosshairValues, setCrosshairValues] = useState([]);

  if (!rawHistory) {
    return null;
  }

  const parties = (
    rawParties
      .toList()
      .sortBy(party => party.get('id'))
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
        parties
          .map(
            party => (
              entry
                .get(party.get('id'))
                .get('winPercentage')
            )
          )
          .toJS()
      );
    } else {
      setCrosshairValues([]);
    }
  };

  const renderSeries = (party, isFirst) => {
    const id = party.get('id');
    const color = party.get('color');

    const data = (
      history
        .map(
          (value, i) => Map({
            x: i + 1,
            y: (
              value
                .get(id)
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
        key={ `line-series--${id}` }
        curve="curveLinear"
        color={ color }
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
      yAxisTitle="Percent of Votes"
      xDomain={[1, iterations]}
      yDomain={[0, 1]}
      onMouseLeave={ onMouseLeave }
      legend={{
        title: "Parties",
        items: (
          parties
            .map(
              party => ({
                name: party.get('id'),
                color: party.get('color')
              })
            )
            .toJS()
        )
      }}
    >
      <Crosshair values={ crosshairValues } />
      {
        parties.map(
          (party, i) => renderSeries(party, i === 0)
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
