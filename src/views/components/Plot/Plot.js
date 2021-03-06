import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  XYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
  Crosshair,
  LineSeries
} from 'react-vis';
import { Tooltip } from '..';
import styles from './Plot.module.scss';

const Plot = ({
  xAxisTitle,
  yAxisTitle,
  yTickFormat,
  xTickValues,
  legendTitle,
  series,
  ...rest
}) => {
  const [crosshair, setCrosshair] = useState(null);

  const onMouseLeave = () => {
    setCrosshair(null);
  };

  const onNearestX = ({ x }) => {
    setCrosshair(x);
  };

  const renderSeries = ({ id, color, isFirst, data }) => (
    <LineSeries
      key={ `line-series--${id}` }
      curve="curveLinear"
      color={ color }
      onNearestX={ isFirst ? onNearestX : null }
      getNull={({ y }) => y !== null}
      data={ data }
    />
  );

  const renderCrosshair = () => {
    if (!crosshair) {
      return null;
    }

    const values = (
      series.map(
        ({ name, color, data }) => ({
          name,
          color,
          value: data.find(point => point.x === crosshair).y
        })
      )
    );

    if (values.some(({ value }) => value === null)) {
      return null;
    }

    return (
      <Crosshair
        values={
          values
            .map(({ value }) => ({
              x: crosshair,
              y: value
            }))
        }
      >
        <Tooltip
          x={ crosshair }
          values={ values }
        />
      </Crosshair>
    );
  };

  return (
    <div className={ styles.container }>
      <p className={ styles.yAxisLabel }>{ yAxisTitle }</p>
      <XYPlot { ...rest } onMouseLeave={ onMouseLeave }>
        <HorizontalGridLines />
        <VerticalGridLines tickValues={ xTickValues } />
        <XAxis tickValues={ xTickValues } />
        <YAxis tickFormat={ yTickFormat } />
        { renderCrosshair() }
        {
          series.map(
            (s, i) => renderSeries({
              ...s,
              isFirst: i === 0
            })
          )
        }
      </XYPlot>
      <p className={ styles.xAxisLabel }>{ xAxisTitle }</p>
    </div>
  );
};

Plot.propTypes = {
  xAxisTitle: PropTypes.string.isRequired,
  yAxisTitle: PropTypes.string.isRequired,
  yTickFormat: PropTypes.func.isRequired,
  xTickValues: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired,
  legendTitle: PropTypes.string.isRequired,
  series: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      data: PropTypes.array.isRequired
    })
  ).isRequired
};

export default Plot;
