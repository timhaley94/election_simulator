import React from 'react';
import PropTypes from 'prop-types';
import {
  XYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis';
import { Centered } from '..';
import styles from './Plot.module.scss';

const Plot = ({
  xAxisTitle,
  yAxisTitle,
  children,
  ...rest
}) => (
  <Centered>
    <p className={ styles.yAxisLabel }>{ yAxisTitle }</p>
    <div className={ styles.plotContainer }>
      <XYPlot { ...rest }>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        { children }
      </XYPlot>
    </div>
    <p className={ styles.xAxisLabel }>{ xAxisTitle }</p>
  </Centered>
);

Plot.propTypes = {
  xAxisTitle: PropTypes.string.isRequired,
  yAxisTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Plot;
