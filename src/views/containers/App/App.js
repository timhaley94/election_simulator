import React, { useState } from 'react';
import { simulate, setWeight as rawSetWeight } from '../../../models';
import { useOnMount, useTicker } from '../../hooks';
import { ProgressIndicator } from '../../components';
import { Controls, Graph } from '..';
import styles from './App.module.scss';
import './index.css';

const App = () => {
  const iterations = 30;

  const [simulation, setSimulation] = useState(null);
  const { tick, reset: resetTicker } = useTicker(iterations);

  const setWeight = (type, value) => {
    setSimulation(
      s => rawSetWeight(s, type, value)
    );
  };

  const reset = () => {
    setSimulation(
      s => (
        simulate(
          iterations,
          (
            s
              ? s.get('voterTypeDistribution')
              : undefined
          )
        )
      )
    );

    resetTicker(iterations);
  };

  useOnMount(reset);

  if (!simulation) {
    return <ProgressIndicator />;
  }

  return (
    <div className={ styles.container }>
      <Graph
        tick={ tick }
        iterations={ iterations }
        history={ simulation.get('history') }
      />
      <Controls
        weights={ simulation.get('voterTypeDistribution') }
        setWeight={ setWeight }
        reset={ reset }
      />
    </div>
  );
}

export default App;
