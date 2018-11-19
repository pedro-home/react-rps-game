import React, { Component } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  Icon
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { addPlayer, resetPlayers } from '../../actions';
import { ComponentUtils } from '../../utils';
import { PLAYER_TYPE } from '../../globals';
import { Menu } from '../../components';


class Main extends Component {
  
  static defaultProps = {
    addPlayer: () => {},
    resetPlayers: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      numberAIs: 1,
      numberHumans: 1
    }
  }

  play = (e) => {
    const { addPlayer, resetPlayers } = this.props;
    const { numberHumans, numberAIs } = this.state || {};

    resetPlayers();

    if (numberAIs < 0 || numberHumans < 0) {
      return;
    }

    const numberPlayers = numberHumans + numberAIs;
    if(numberPlayers < 2) {
      return;
    }

    for (let i = 0; i < numberHumans; i++) {
      addPlayer();
    }

    for (let i = 0; i < numberAIs; i++) {
      addPlayer({ type: PLAYER_TYPE.AI });
    }
  }

  onChange = (humans) => {
    const event = window.event;
    if (event && event.target) {
      let obj = {};
      obj[humans ? 'numberHumans' : 'numberAIs'] = parseInt(event.target.value, 10);

      this.setState(obj);
    }
  }

  render() {
    const { classes } = this.props;
    const { numberAIs, numberHumans } = this.state || {};

    return (
      <div className={classes.root}>
        <Menu title="Rock, Paper, Scissors">
          <form>
            <TextField 
              label="Number of Humans"
              required
              defaultValue={numberHumans}
              type="Number"
              margin="normal"
              fullWidth
              onInput={this.onChange.bind(this, true)}
              classes={{ root: classes.item }}
              helperText="Keep total of players = 2"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon classes={{ root: PLAYER_TYPE.HUMAN.icon }} />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Number of AIs"
              required
              defaultValue={numberAIs}
              type="Number"
              margin="normal"
              fullWidth
              onInput={this.onChange.bind(this, false)}
              classes={{ root: classes.item }}
              helperText="Keep total of players = 2"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon classes={{ root: PLAYER_TYPE.AI.icon }} />
                  </InputAdornment>
                )
              }}
            />
            <Link to="/game">
              <Button fullWidth type="Submit" color="primary" variant="contained" onClick={this.play}>Play</Button>
            </Link>
          </form>
        </Menu>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100vw',
    height: '100vh'
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer: (options) => dispatch(addPlayer(options)),
    resetPlayers: () => dispatch(resetPlayers())
  }
};

export default ComponentUtils.create(Main, styles, { dispatchToProps: mapDispatchToProps }, true);