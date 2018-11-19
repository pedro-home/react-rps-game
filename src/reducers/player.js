import { makeReducer } from 'redux-toolbelt';

import { PLAYER_STATUS, PLAYER_TYPE, PLAYER_MOVE } from '../globals';
import { endTurnPlayer, addPlayer, startTurnPlayer, continueTurnPlayer, resetPlayers } from '../actions';
import { PlayerUtils } from '../utils';

const initState = [];

const initPlayerState = {
  type: PLAYER_TYPE.HUMAN,

  // WAITING => PLAYING => ENDED => WAITING => ... => DEAD
  status: PLAYER_STATUS.WAITING,
  life: 100
}

const playerReducer = makeReducer({
    [resetPlayers.TYPE]: () => {
      return [...initState];
    },
    [addPlayer.TYPE]: (state, { payload={} }) => {
      payload = { ...initPlayerState,  ...payload };

      let { name, type, status, ...rest } = payload;
      const id = state.filter((player) => player.type === type).length + 1;
      name = name || `${(type === PLAYER_TYPE.HUMAN ? 'Player' : 'Bot')} ${id}`;

      return [...state, { type: type, name: name, status: PLAYER_STATUS.WAITING, ...rest }];
    },
    [startTurnPlayer.TYPE]: (state, { payload }) => {
      const { id } = payload;
      const { life } = initPlayerState;

      const player = PlayerUtils.getPlayerById(state, id);
      state[id] = { ...player, life: life, status: PLAYER_STATUS.PLAYING };

      return [...state];
    },
    [endTurnPlayer.TYPE]: (state, { payload }) => {
      const { move, id } = payload;

      const player = PlayerUtils.getPlayerById(state, id);

      // Update Player
      state[id] = { ...player, move: move === PLAYER_MOVE.RANDOM ? PlayerUtils.getRandomMove() : move, status: PLAYER_STATUS.ENDED };

      if (!PlayerUtils.isEndedTurn(state)) {
        const nextId = state.findIndex((player, index) => index > id && player.status !== PLAYER_STATUS.DEAD);
        const nextPlayer = PlayerUtils.getPlayerById(state, nextId);

        state[nextId] = { ...nextPlayer, status: PLAYER_STATUS.PLAYING };

        return [...state];
      }

      // Every player ended their turn => Let the blood bash begin!
      const results = PlayerUtils.getTurnResults(state);

      return state.map((player, index) => {
        let { life, ...rest } = player;
        life += results[index] * 100;

        return { ...rest, life: life, status: life > 0 ? (index === 0 ? PLAYER_STATUS.PLAYING : PLAYER_STATUS.WAITING) : PLAYER_STATUS.DEAD };
      });
    },
    [continueTurnPlayer.TYPE]: (state, { payload={} }) => {
      const { id } = payload;

      const player = PlayerUtils.getPlayerById(state, id);
      state[id] = { ...player, status: PLAYER_STATUS.PLAYING };
      return [...state];
    }
  },
  { defaultState: initState }
);

export default playerReducer;