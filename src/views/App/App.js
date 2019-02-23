import React, { useState } from 'react';
import Controls from '../Controls/Controls';
import Graph from '../Graph/Graph';
import simulate from '../../models';
import { useOnMount, useTicker } from '../hooks';
import styles from './App.module.scss';
import './index.css';

const App = () => {
  const iterations = 30;

  const [simulation, setSimulation] = useState(null);
  const { tick, reset: resetTicker } = useTicker(iterations);

  const reset = () => {
    setSimulation(simulate(iterations));
    resetTicker(iterations);
  }

  useOnMount(reset);

  return (
    <div className={ styles.container }>
      <Graph
        tick={ tick }
        iterations={ iterations }
        history={ simulation ? simulation.get('history') : null }
      />
      <Controls
        isInitializing={ !simulation }
        reset={ reset }
      />
    </div>
  );
}

export default App;
