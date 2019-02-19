import React, { useState } from 'react';
import Controls from '../Controls/Controls';
import Graph from '../Graph/Graph';
import simulate from '../../models';
import { useOnMount, useTicker } from '../hooks';
import styles from './App.module.scss';
import './index.css';

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [simulation, setSimulation] = useState(null);
  const {
    isRunning,
    tick,
    start,
    stop,
    step,
    reset: resetTicker
  } = useTicker(30);

  const results = (
    isInitializing
      ? null
      : (
        simulation
          .get('history')
          .reverse()
          .get(tick)
      )
  );

  const reset = () => {
    setIsInitializing(true);
    resetTicker(30);
    setSimulation(simulate({ iterations: 30 }));
    setIsInitializing(false);
  }

  useOnMount(reset);

  return (
    <div className={ styles.container }>
      <Controls
        isInitializing={ isInitializing }
        isRunning={ isRunning }
        start={ start }
        stop={ stop }
        step={
          simulation && (step + 1 < 30)
          ? step
          : null
        }
        reset={ reset }
      />
      <Graph results={ results } />
    </div>
  );
}

export default App;
