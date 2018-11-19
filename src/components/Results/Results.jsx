import React, { Component } from 'react';
import { 
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ComponentUtils } from '../../utils';
import { PLAYER_STATUS } from '../../globals';
import { Menu } from '..';


const mapStateToProps = (state) => {
  return {
    winner: state.players.find((player) => player.status !== PLAYER_STATUS.DEAD)
  }
}

class Results extends Component {
  static propTypes = {
    winner: PropTypes.object.isRequired
  }

  render() {
    const { winner } = this.props;

    return (
      <Menu title={`${winner.name} is the WINNER!`}>
        <Link to="/">
          <Button fullWidth color="primary" variant="contained">Back to Main Menu</Button>
        </Link>
      </Menu>
    );
  }
    
}

export default ComponentUtils.create(Results, undefined, { stateToProps: mapStateToProps }, true);