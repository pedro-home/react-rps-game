import { makeActionCreator } from 'redux-toolbelt';

const makePlayerAction = makeActionCreator.withDefaults({
  prefix: 'players/'
});

const PLAYERS_RESET = 'PLAYERS_RESET';
const PLAYER_START_TURN = 'PLAYER_START_TURN';
const PLAYER_CONTINUE_TURN = 'PLAYER_CONTINUE_TURN';
const PLAYER_END_TURN = 'PLAYER_END_TURN';
const PLAYER_ADD = 'PLAYER_ADD';

export const resetPlayers = makePlayerAction(PLAYERS_RESET);
export const startTurnPlayer = makePlayerAction(PLAYER_START_TURN);
export const continueTurnPlayer = makePlayerAction(PLAYER_CONTINUE_TURN);
export const endTurnPlayer = makePlayerAction(PLAYER_END_TURN);
export const addPlayer = makePlayerAction(PLAYER_ADD);
