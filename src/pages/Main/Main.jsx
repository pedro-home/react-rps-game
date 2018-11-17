import React, { Component } from 'react';
import {
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { addPlayer, startGame, resetPlayers } from '../../actions';
import { ComponentUtils } from '../../utils';
import { PLAYER_TYPE } from '../../globals';
import { Menu } from '../../components';


class Main extends Component {
  
  static defaultProps = {
    addPlayer: () => {},
    startGame: () => {},
    resetPlayers: () => {}
  }

  play = (isHuman) => {
    const { addPlayer, startGame, resetPlayers } = this.props;

    startGame();
    resetPlayers();

    addPlayer();
    addPlayer({ type: isHuman ? PLAYER_TYPE.HUMAN : PLAYER_TYPE.AI });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Menu title="Rock, Paper, Scissors">
          <Link to="/game">
            <Button classes={{ root: classes.button }} color="primary" variant="contained" onClick={this.play.bind(this, true)}>Human VS Human</Button>
          </Link>
          <Link to="/game">
            <Button classes={{ root: classes.button }} color="primary" variant="contained" onClick={this.play.bind(this, false)}>Human VS AI</Button>
          </Link>
        </Menu>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100vw',
    height: '100vh'
  },
  button: {
    width: '100%'
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer: (options) => dispatch(addPlayer(options)),
    startGame: () => dispatch(startGame()),
    resetPlayers: () => dispatch(resetPlayers())
  }
};

export default ComponentUtils.create(Main, styles, { dispatchToProps: mapDispatchToProps }, true);