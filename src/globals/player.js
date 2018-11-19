/**
 * Player status
 * - PLAYING - It's player's turn
 * - WAITING - Player is waiting for his turn
 * - ENDED - Player finished his turn
 * - DEAD - Player is dead
 */
export const PLAYER_STATUS = {
  PLAYING: {
    name: 'PLAYING'
  },
  WAITING: {
    name: 'WAITING'
  },
  ENDED: {
    name: 'ENDED'
  },
  DEAD: {
    name: 'DEAD',
    icon: 'fas fa-skull'
  }
}

/**
 * Player type
 * - HUMAN - User (hint: you and me!)
 * - AI - Computer (hint: not you and me!)
 */
export const PLAYER_TYPE = {
  HUMAN: {
    name: 'HUMAN',
    icon: 'fas fa-user-alt'
  },
  AI: {
    name: 'AI',
    icon: 'fas fa-angry'
  }
}

/**
 * Player move
 * - ROCK - Use the power of Rock to defeat the mighty Scissors
 * - PAPER - Use the power of Paper to defeat the mighty Rock
 * - SCISSORS - Use the power of Scissors to defeat the mighty Paper
 * - RANDOM - " I'm feeling lucky! " - Google Search
 */
export const PLAYER_MOVE = {
  ROCK: {
    name: 'ROCK',
    icon: 'fas fa-hand-rock',
    results: {
      ROCK: 0,
      PAPER: -1,
      SCISSORS: 1
    }
  },
  PAPER: {
    name: 'PAPER',
    icon: 'fas fa-hand-paper',
    results: {
      ROCK: 1,
      PAPER: 0,
      SCISSORS: -1
    }
  },
  SCISSORS: {
    name: 'SCISSORS',
    icon: 'fas fa-hand-scissors',
    results: {
      ROCK: -1,
      PAPER: 1,
      SCISSORS: 0
    }
  },
  RANDOM: {
    name: 'RANDOM',
    icon: 'fas fa-hand-spock'
  }
}