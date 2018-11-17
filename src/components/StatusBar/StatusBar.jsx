import React, { Component } from 'react';
import { 
  Avatar,
  LinearProgress,
  Typography,
  Grid,
  Icon
} from '@material-ui/core';
import classnames from 'classnames';

import { ComponentUtils, PlayerUtils } from '../../utils';

class StatusBar extends Component {
  static defaultProps = {
    inverted: false,
    life: 100,
    status: {}
  }

  render() {
    const { inverted, life, type, status, name, classes } = this.props;

    return (
      <Grid container direction={ inverted ? 'row-reverse' : 'row' } spacing={24}>
        <Grid item>
          <Avatar>
            <Icon classes={{ root: status.icon || type.icon }}/>
          </Avatar>
        </Grid>
        <Grid item container xs direction="column" justify="center">
          <Grid item>
            <LinearProgress variant="determinate" value={life} classes={{ bar: classnames(classes.progress, {[classes.invertedProgress]: inverted} ) }} />
          </Grid>
          { name &&
            <Grid item container direction={ inverted ? 'row-reverse' : 'row' }>
              <Grid item xs>
                <Typography variant="caption" align={ inverted ? 'right' : 'left' }>{name}</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="caption" align={ inverted ? 'left' : 'right' }>{status.name}</Typography>
              </Grid>
            </Grid>
          }
        </Grid>
      </Grid>
    );
  }
}

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

export default ComponentUtils.create(StatusBar, styles, { stateToProps: mapStateToProps });