import React, { useState } from 'react';
import Ribbon from "react-github-ribbon";
import { simulate, setWeight as rawSetWeight } from '../../../models';
import { Link, Modal } from '../../components';
import { useOnMount, useTicker } from '../../hooks';
import { Footer, Graph, Sidebar } from '..';
import styles from './App.module.scss';
import './index.scss';

const demHref = 'https://democrats.org/';
const gopHref = 'https://www.gop.com/';
const duvergerHref = 'https://en.wikipedia.org/wiki/Duverger%27s_law';
const fptpHref = 'https://en.wikipedia.org/wiki/First-past-the-post_voting';

const App = () => {
  const iterations = 31;

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
      <Modal />
      <Ribbon
        user="timhaley94"
        repo="election_simulator"
        fill="2d2d2d"
        color="white"
      />
      <div className={ styles.intro }>
        <h1 className={ styles.title } >Election Simulator</h1>
        <p className={ styles.description }>
          A common source of political frustration for Americans is the existence{ ' ' }
          of a two party system. Many voters don't cleanly fit with{ ' ' }
          <Link href={ demHref }>the Dems</Link> or <Link href={ gopHref }>the GOP</Link>,{ ' ' }
          but, regardless, are forced to choose one or risk "wasting their vote".{ ' ' }
          Despite the existence of alternatives, third parties rarely{ ' ' }
          gain significant traction. Thus, the entrenched powers are all but guaranteed to stay in place.{ ' ' }
          As frustrating as this reality is, it's actually not surprising.{ ' ' }
          In fact, according to <Link href={ duvergerHref }>Duverger's law</Link>{ ' ' }
          it's an inherent feature of the system we use for elections:{ ' ' }
          <Link href={ fptpHref }>First Passed the Post (FPTP)</Link>.
        </p>
        <p className={ styles.description }>
          This simulator seeks to explore political parties, Duverger's law, and FPTP.{ ' ' }
          We've provided a few naive models of voter behavior and controls that allow you{ ' ' }
          to tweak how many voters will exhibit a given behavior.{ ' ' }
          Each election in the simulation, voters use their personal preferences, their voting{ ' ' }
          strategy, and the results from previous iterations to cast their vote, giving us{ ' ' }
          a glimpse into how party prominence can evolve over time.
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
