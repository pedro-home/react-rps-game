import React, { Component } from 'react';
import { 
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { ComponentUtils } from '../../utils';
import { PLAYER_STATUS } from '../../globals';
import { Menu } from '..';

class Results extends Component {
  render() {
    const { winner, classes } = this.props;

    return (
      <Menu title={`${winner.name} is the WINNER!`}>
        <Link to="/">
          <Button classes={{ root: classes.button }} color="primary" variant="contained">Back to Main Menu</Button>
        </Link>
      </Menu>
    );
  }
    
}

const styles = {
  button: {
    width: '100%'
  }
};

const mapStateToProps = (state) => {
  return {
    winner: state.players.find((player) => player.status !== PLAYER_STATUS.DEAD)
  }
}

export default ComponentUtils.create(Results, styles, { stateToProps: mapStateToProps });