import { PLAYER_STATUS } from '../globals';

class GameUtils {
  static isEndedGame(players) {
    return players.length - players.filter((player) => player.status === PLAYER_STATUS.DEAD).length === 1;
  }
}

export default GameUtils;