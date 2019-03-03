import React from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import { listOf, multiples } from '../../../utils';
import { Plot } from '../../components';

const Graph = ({
  reset,
  weights,
  setWeight,
  tick,
  iterations,
  parties: rawParties,
  history: rawHistory
}) => {
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

  const getSeries = party => {
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

    return Map({
      id,
      color,
      name: id,
      data: List([
        ...data,
        ...nullValues
      ])
    });
  }

  return (
    <Plot
      width={ 650 }
      height={ 300 }
      xAxisTitle="Election Number"
      yAxisTitle="Percent of Votes"
      xDomain={[1, iterations]}
      yDomain={[0, 1]}
      yTickFormat={ n => Math.floor(n * 100) }
      xTickValues={ multiples(1, iterations, 3) }
      legendTitle="Parties"
      series={
        parties
          .map(getSeries)
          .toJS()
      }
    />
  );
};

Graph.propTypes = {
  tick: PropTypes.number.isRequired,
  iterations: PropTypes.number.isRequired,
  parties: PropTypes.instanceOf(Map),
  history: PropTypes.instanceOf(List)
};

Graph.defaultProps = {
  history: null
};

export default Graph;
