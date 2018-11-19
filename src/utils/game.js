import { PLAYER_STATUS } from '../globals';

class GameUtils {
  /**
   * Check if the game has ended
   * @param {*} players 
   */
  static isEndedGame(players) {
    return players.length - players.filter((player) => player.status === PLAYER_STATUS.DEAD).length < 2;
  }
}

export default GameUtils;