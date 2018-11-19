import React, { Component } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  Icon,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import amber from '@material-ui/core/colors/amber';
import classnames from 'classnames';

import { addPlayer, resetPlayers } from '../../actions';
import { ComponentUtils } from '../../utils';
import { PLAYER_TYPE } from '../../globals';
import { Menu } from '../../components';

const styles = {
  root: {
    width: '100vw',
    height: '100vh'
  },
  snackbarContent: {
    backgroundColor: amber[700]
  },
  messageIcon: {
    verticalAlign: 'middle',
    width: 'auto',
    marginRight: '.5rem'
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer: (options) => dispatch(addPlayer(options)),
    resetPlayers: () => dispatch(resetPlayers())
  }
};

class Main extends Component {

  static propTypes = {
    addPlayer: PropTypes.func,
    resetPlayers: PropTypes.func
  }
  
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
      const value = event.target.value;
      let obj = {};
      obj[humans ? 'numberHumans' : 'numberAIs'] = value === '' ? 0 : Math.max(0, parseInt(value, 10));

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
              value={numberHumans}
              type="Number"
              margin="normal"
              fullWidth
              onInput={this.onChange.bind(this, true)}
              classes={{ root: classes.item }}
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
              value={numberAIs}
              type="Number"
              margin="normal"
              fullWidth
              onInput={this.onChange.bind(this, false)}
              classes={{ root: classes.item }}
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
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={true}
        >
          <SnackbarContent
            classes={{ root: classes.snackbarContent }}
            message={<><Icon fontSize="small" classes={{ root: classnames('fas', 'fa-exclamation-triangle', classes.messageIcon) }} />Temporary Warning: Keep total of players = 2</>}
          />
        </Snackbar>
          
      </div>
    );
  }
}

export default ComponentUtils.create(Main, styles, { dispatchToProps: mapDispatchToProps }, true);