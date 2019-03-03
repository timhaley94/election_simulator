import React, { useState } from 'react';
import Ribbon from "react-github-ribbon";
import { simulate, setWeight as rawSetWeight } from '../../../models';
import { useOnMount, useTicker } from '../../hooks';
import { Footer, Graph, Sidebar } from '..';
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
      <Ribbon
        user="timhaley94"
        repo="election_simulator"
        fill="2d2d2d"
        color="white"
      />
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
      <div className={ styles.simulation }>
        <div className={ styles.simulationInner }>
          <Graph
            reset={ reset }
            weights={ simulation.get('voterTypeDistribution') }
            setWeight={ setWeight }
            tick={ tick }
            iterations={ iterations }
            history={ simulation.get('history') }
            parties={ simulation.get('parties') }
          />
          <Sidebar
            parties={ simulation.get('parties') }
            reset={ reset }
            weights={ simulation.get('voterTypeDistribution') }
            setWeight={ setWeight }
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
