import { composeReducers } from 'redux-toolbelt';

import playerReducer from './player';
import gameReducer from './game';

const rootReducer = composeReducers({
  game: gameReducer,
  players: playerReducer
});

export default rootReducer;