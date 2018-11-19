import { PLAYER_STATUS, PLAYER_MOVE } from '../globals';

class PlayerUtils {
  /**
   * Get player object by its id
   * @param {*} players 
   * @param {*} id 
   */
  static getPlayerById(players, id) {
    return players[id];
  }

  /**
   * Check if turn has ended
   * @param {*} players 
   */
  static isEndedTurn(players) {
    const numberPlayersAlive = players.filter((player) => player.status !== PLAYER_STATUS.DEAD).length;
    const numberPlayersEnded = players.filter((player) => player.status === PLAYER_STATUS.ENDED).length
    return numberPlayersAlive === numberPlayersEnded;
  }

  /**
   * Get a random move
   */
  static getRandomMove() {
    const arr = Object.keys(PLAYER_MOVE);

    // Remove RANDOM move
    arr.splice(arr.findIndex((val) => val === 'RANDOM'), 1);
    const name = arr[Math.floor(Math.random() * arr.length)];
    return PLAYER_MOVE[name];
  }

  /**
   * Check if move1 wins, looses or draws against move2
   * @param {*} move1 
   * @param {*} move2 
   */
  static compareMoves(move1, move2) {
    return move1.results[move2.name];
  }

  /**
   * Get results from all matched moves in that turn
   * TODO: Searching pattern needs to be improved (low performance)
   * @param {*} players 
   */
  static getTurnResults(players) {
    const results = players.slice();

    // Compare each player's move
    return results.map((player1, index) => {

      // Remove the player1 from the comparison moves
      let others = results.slice();
      others.splice(index, 1);

      let result = 0;
      others.forEach((player2) => {
        result += this.compareMoves(player1.move, player2.move);
      });

      return Math.min(result, 0);
    });
  }
}

export default PlayerUtils;