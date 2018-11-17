import { makeReducer } from 'redux-toolbelt';

import { GAME_STATUS } from '../globals';
import { startGame, endGame } from '../actions';

const initState = {

};

// Status : START => END => ...

const gameReducer = makeReducer({
    [startGame.TYPE]: (state, {payload}) => {
      return {...state, status: GAME_STATUS.START, payload};
    },
    [endGame.TYPE]: (state) => {
      return {...state, status: GAME_STATUS.END};
    }
  },
  { defaultState: initState }
);

export default gameReducer;