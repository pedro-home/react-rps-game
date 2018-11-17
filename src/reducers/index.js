import { composeReducers } from 'redux-toolbelt';

import playerReducer from './player';

const rootReducer = composeReducers({
  players: playerReducer
});

export default rootReducer;