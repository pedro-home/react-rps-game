import React, { Component } from 'react';
import {
  Icon,
  Grid,
  Zoom,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography
} from '@material-ui/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { PLAYER_MOVE, PLAYER_STATUS, PLAYER_TYPE } from '../../globals';
import { endTurnPlayer, startTurnPlayer } from '../../actions';
import { ComponentUtils, PlayerUtils } from '../../utils';

const styles = {
  grid: {
    width: '100%',
    height: '100%'
  },
  card: {
    '& $cardIcon': {
      fontSize: '120px'
    }
  },
  cardIcon: { },
  cardAction: { }
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

class PlayGround extends Component {
  static propTypes = {
    playerId: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    status: PropTypes.oneOf([
      PLAYER_STATUS.PLAYING,
      PLAYER_STATUS.WAITING,
      PLAYER_STATUS.ENDED,
      PLAYER_STATUS.DEAD]).isRequired,
    type: PropTypes.oneOf([
      PLAYER_TYPE.HUMAN,
      PLAYER_TYPE.AI]).isRequired,
    startTurn: PropTypes.func,
    endTurn: PropTypes.func
  }

  static defaultProps = {
    startTurn: () => {},
    endTurn: () => {}
  }

  componentDidMount() {
    const { startTurn } = this.props;

    startTurn();
  }

  componentDidUpdate() {
    const { endTurn, type, status } = this.props;

    if (type === PLAYER_TYPE.AI) {

      // Simulate Bot choosing move
      setTimeout(() => {
        if (status !== PLAYER_STATUS.DEAD) {
          endTurn(PLAYER_MOVE.RANDOM);
        }
      }, Math.floor( 1000 + (Math.random() * 4000)));
    }
  }

  onClickChoose = (newMove) => {
    const { endTurn } = this.props;

    endTurn(newMove);
  }

  render() {
    const { classes, name } = this.props;

    return (
      <Grid name="grid" container classes={{ container: classes.grid }} direction="column" alignItems="center" justify="center" spacing={32}>
        <Grid item>
          <Typography variant="h2">{`${name}'s Turn`}</Typography>
        </Grid>
        <Grid container xs item justify="center" alignItems="center" spacing={32}>
          {this.renderCards()}
        </Grid>
      </Grid>
    );
  }

  renderCards() {
    const { classes, status, type } = this.props;

    const cards = Object.keys(PLAYER_MOVE).map((m) => {
      const playerMove = PLAYER_MOVE[m];
      return (
        <Grid item key={`item-${playerMove.name}`}>
          <Zoom in={true}>
            <Card raised classes={{ root: classes.card }}>
              <CardHeader title={playerMove.name} titleTypographyProps={{ align: 'center', variant: 'body1' }} />
              <CardActionArea
                disabled={status !== PLAYER_STATUS.PLAYING || type === PLAYER_TYPE.AI}
                classes={{ root: classes.cardAction }}
                onClick={() => this.onClickChoose(playerMove)}
              >
                <CardContent>
                  <Icon classes={{ root: classnames(playerMove.icon, classes.cardIcon) }} />
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

export default ComponentUtils.create(PlayGround, styles, { stateToProps: mapStateToProps, dispatchToProps: mapDispatchToProps });
