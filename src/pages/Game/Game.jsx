import React, { Component } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Icon
} from '@material-ui/core';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';

import { PlayGround, StatusBar, Results } from '../../components';
import { ComponentUtils, GameUtils } from '../../utils';
import { PLAYER_STATUS } from '../../globals';

class Game extends Component {
  static defaultProps = {
    players: [],
    current: 0,
    ended: false
  }

  render() {
    const { classes, numberPlayers, ended, current } = this.props;

    if (numberPlayers < 2) {
      // No Players found!
      return (<Redirect to="/"/>);
    }

    return (
      <>
        <AppBar classes={{ root: classes.header }} color="default">
          <Toolbar>
            <Grid container spacing={16}>
              {
                React.Children.map(Array(numberPlayers), (player, index) => {
                  return (
                    <>
                      <Grid item xs>
                        <StatusBar inverted={index % 2 !== 0} playerId={index} />
                      </Grid>
                      { index % 2 === 0 && index < numberPlayers - 1 &&
                        <Grid item>
                          <Typography align="center" variant="subtitle1">VS</Typography>
                        </Grid>
                      }
                    </>
                  );
                })
              }
            </Grid>
          </Toolbar>
        </AppBar>

        <main className={classes.main}>
          <PlayGround playerId={current} />
          { ended &&
            <Results />
          }
        </main>

        <footer className={classes.footer}>
          <Grid container>
            <Grid item xs>
              <Typography variant="caption" align="left" gutterBottom>@Pedro Gomes 2018</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="caption" align="right" gutterBottom>
                Designed and Developed with <Icon color="primary" fontSize="inherit" classes={{ root: classnames('fas', 'fa-heart') }}/>
              </Typography>
            </Grid>
          </Grid>
        </footer>
      </>
    );
  }
}

const styles = {
  header: {
    boxShadow: 'none'
  },
  main: {
    position: 'absolute',
    top: '64px',
    bottom: '20px',
    left: 0,
    right: 0,
    overflow: 'hidden auto',
    padding: '2rem'
  },
  footer: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    padding: '0 .5rem'
  }
};

const mapStateToProps = (state) => {
  const index = state.players.findIndex((player) => player.status === PLAYER_STATUS.PLAYING);
  const ended = GameUtils.isEndedGame(state.players);
  return {
    numberPlayers: state.players.length,
    ended: ended,
    current: index > -1 ? index : 0,
    ...state.game
  };
}

export default ComponentUtils.create(Game, styles, { stateToProps: mapStateToProps }, true);