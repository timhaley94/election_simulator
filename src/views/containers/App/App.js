import React, { useState } from 'react';
import { simulate, setWeight as rawSetWeight } from '../../../models';
import { useOnMount, useTicker } from '../../hooks';
import { Controls, Graph } from '..';
import styles from './App.module.scss';
import './index.scss';

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
    return null;
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.intro }>
        <h1 className={ styles.title } >Election Simulator</h1>
        <p className={ styles.description }>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac
          purus pellentesque, placerat massa hendrerit, blandit erat. Nulla
          facilisi. Aliquam fringilla sem nec leo ullamcorper commodo. Donec
          nec lorem tincidunt, vestibulum eros in, rhoncus dui. Sed nisl tellus,
          commodo ut pulvinar id, pulvinar sit amet mi. Nulla fringilla purus
          massa, a rhoncus lorem rutrum interdum. Morbi euismod, lectus in
          pulvinar faucibus, nunc quam varius justo, sed lacinia velit augue
          ut mauris. Aliquam porta mauris velit, sit amet egestas leo interdum
          id. Etiam luctus sollicitudin orci.
        </p>
      </div>
      <Graph
        tick={ tick }
        iterations={ iterations }
        history={ simulation.get('history') }
        parties={ simulation.get('parties') }
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
