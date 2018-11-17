import React, { Component } from 'react';
import {
  Icon,
  Grid,
  Zoom,
  Card,
  CardActionArea,
  CardContent,
  CardHeader
} from '@material-ui/core';
import classnames from 'classnames';

import { PLAYER_MOVE, PLAYER_STATUS, PLAYER_TYPE } from '../../globals';
import { endTurnPlayer, startTurnPlayer } from '../../actions';
import { ComponentUtils, PlayerUtils } from '../../utils';

class PlayGround extends Component {
  static defaultProps = {
    startTurn: () => {},
    endTurn: () => {}
  }

  componentDidMount() {
    const { startTurn } = this.props;

    startTurn();
  }

  componentDidUpdate() {
    const { endTurn, type } = this.props;

    if (type === PLAYER_TYPE.AI) {
      endTurn(PLAYER_MOVE.RANDOM);
    }
  }

  onClickChoose = (newMove) => {
    const { endTurn } = this.props;

    endTurn(newMove);
  }

  render() {
    return (
      <Grid container direction="column" alignItems="center" justify="center" spacing={32}>
        <Grid container item justify="center" spacing={32}>
          {this.renderCards()}
        </Grid>
      </Grid>
    );
  }

  renderCards() {
    const { classes, status } = this.props;

    const cards = Object.keys(PLAYER_MOVE).map((m) => {
      const playerMove = PLAYER_MOVE[m];
      return (
        <Grid item key={`item-${playerMove.name}`}>
          <Zoom in={true}>
            <Card
              raised
              classes={{
                root: classnames(
                  classes.card,
                  { [classes.cardWaiting]: status !== PLAYER_STATUS.PLAYING }
                ) 
              }}
            >
              <CardHeader title={playerMove.name} titleTypographyProps={{ align: 'center', variant: 'body1' }} />
              <CardActionArea disabled={status !== PLAYER_STATUS.PLAYING} classes={{ root: classes.cardAction }} onClick={() => this.onClickChoose(playerMove) }>
                <CardContent>
                  <Icon classes={{ root: classnames(playerMove.icon, classes.cardIcon) }}></Icon>
                </CardContent>
              </CardActionArea>
            </Card>
          </Zoom>
        </Grid>
      );
    });

    return cards;
  }
}

const styles = {
  card: {
    '& $cardIcon': {
      fontSize: '120px'
    },

    '&$cardWaiting': {
      opacity: 0.5,
      pointerEvents: 'none'
    }
  },
  cardIcon: { },
  cardAction: { },
  cardWaiting: { }
};

const mapStateToProps = (state, ownProps) => {
  const { playerId } = ownProps;
  const player = PlayerUtils.getPlayerById(state.players, playerId);

  if (player) {
    return {
      ...player 
    };
  }

  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    endTurn: (move) => dispatch(endTurnPlayer({ id: ownProps.playerId, move: move })),
    startTurn: () => dispatch(startTurnPlayer({ id: ownProps.playerId }))
  }
};

export default ComponentUtils.create(PlayGround, styles, { stateToProps: mapStateToProps, dispatchToProps: mapDispatchToProps });
