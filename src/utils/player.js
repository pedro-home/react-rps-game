import { PLAYER_STATUS, PLAYER_MOVE } from '../globals';

class PlayerUtils {
  static getPlayerById(players, id) {
    return players[id];
  }

  static isEndedTurn(players) {
    return players.length === players.filter((player) => player.status === PLAYER_STATUS.ENDED).length;
  }

  static getRandomMove() {
    const arr = Object.keys(PLAYER_MOVE);

    // Remove RANDOM move
    const name = arr[Math.floor(Math.random() * (arr.length - 1))];
    return PLAYER_MOVE[name];
  }

  static compareMoves(move1, move2) {
    return move1.results[move2.name];
  }

  /**
   * TODO: Searching pattern needs to be improved (low performance)
   */
  static getMoveResults(players) {
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