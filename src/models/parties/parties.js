import { List, Map, Set } from 'immutable';
import { listOf } from '../../utils';

export const MIN_PARTY_COUNT = 2;
export const DEFAULT_PARTY_COUNT = 5;
export const MAX_PARTY_COUNT = 10;

export function makeParties() {
  let names = [
    {'asparagus': 'rgb(151, 190,17)',
      id: 1
    },
    {'corn': 'rgb(255,255,51)',
      id: 2
    },
    {'cabbage': 'rgb(204,255,153)',
      id: 3
    },
    {'turnip': 'rgb(204,0,204)',
      id: 4
    },
    {'radish': 'rgb(255,0,127)',
      id: 5
    },
    {'carrot':'rgb(255,108,0)',
      id: 6
    },
    {'onion': 'rgb(223,223,172)',
      id: 7
    },
    {'spinach': 'rgb(40,89,12)',
      id: 8
    },
    {'mushroom': 'rgb(255,204,153)',
      id: 9
    },
    {'eggplant':'rgb(102,0,102)',
      id: 10
    }
  ];
  let randomIdNumber = Math.floor((Math.random() * 10) + 1)
  let render = names.map(veggie => {
    
  }

  )
}
