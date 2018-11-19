import React, { Component } from 'react';
import { 
  Avatar,
  LinearProgress,
  Typography,
  Grid,
  Icon
} from '@material-ui/core';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ComponentUtils, PlayerUtils } from '../../utils';
import { PLAYER_STATUS, PLAYER_TYPE } from '../../globals';


const styles = {
  progress: {
    transformOrigin: 'left',

    '&$invertedProgress': {
      transformOrigin: 'right'
    }
  },
  invertedProgress: { }
};

const mapStateToProps = (state, ownProps) => {
  const player = PlayerUtils.getPlayerById(state.players, ownProps.playerId);

  if (player) {
    return {
      ...player
    };
  }

  return {};
}

class StatusBar extends Component {
  static propTypes = {
    playerId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    life: PropTypes.number.isRequired,
    status: PropTypes.oneOf([
      PLAYER_STATUS.PLAYING,
      PLAYER_STATUS.WAITING,
      PLAYER_STATUS.ENDED,
      PLAYER_STATUS.DEAD]).isRequired,
    type: PropTypes.oneOf([
      PLAYER_TYPE.HUMAN,
      PLAYER_TYPE.AI]).isRequired,
    inverted: PropTypes.bool
  }

  static defaultProps = {
    inverted: false,
    life: 0,
    status: {},
    type: {}
  }

  render() {
    const { inverted, life, type, status, name, classes } = this.props;

    return (
      <Grid name="grid" container direction={ inverted ? 'row-reverse' : 'row' } spacing={24}>
        <Grid item>
          <Avatar>
            <Icon classes={{ root: status.icon || type.icon }}/>
          </Avatar>
        </Grid>
        <Grid item container xs direction="column" justify="center">
          <Grid item>
            <LinearProgress variant="determinate" value={life} classes={{ bar: classnames(classes.progress, {[classes.invertedProgress]: inverted} ) }} />
          </Grid>
          <Grid name="status" item container direction={ inverted ? 'row-reverse' : 'row' }>
            <Grid item xs>
              <Typography variant="caption" align={ inverted ? 'right' : 'left' }>{name}</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="caption" align={ inverted ? 'left' : 'right' }>{status.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default ComponentUtils.create(StatusBar, styles, { stateToProps: mapStateToProps });