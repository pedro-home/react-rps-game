import { makeActionCreator } from 'redux-toolbelt';

const makeGameAction = makeActionCreator.withDefaults({
  prefix: 'game/'
});

const GAME_START = 'GAME_START';
const GAME_END = 'GAME_END';

export const startGame = makeGameAction(GAME_START);
export const endGame = makeGameAction(GAME_END);