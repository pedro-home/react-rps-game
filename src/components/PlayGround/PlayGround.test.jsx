import React from 'react';

import { PLAYER_STATUS, PLAYER_TYPE, PLAYER_MOVE } from '../../globals';
import { ComponentUtils } from '../../utils';
import PlayGround from './PlayGround';

const initialState = {
  players: [
    { name: 'Player 1', type: PLAYER_TYPE.HUMAN, status: PLAYER_STATUS.PLAYING },
    { name: 'Bot 1', type: PLAYER_TYPE.AI, status: PLAYER_STATUS.WAITING },
    { name: 'Player 2', type: PLAYER_TYPE.HUMAN, status: PLAYER_STATUS.DEAD }
  ]
};

const selectorComponent = 'PlayGround';

const requiredProps = {
  playerId: 0
}

describe('Render', () => {
  let component;
  beforeEach(() => {
    component = ComponentUtils.createMockup(<PlayGround {...requiredProps} />, selectorComponent, initialState);
  });

  it('Should render <Grid />', () => {
    const grid = component.findWhere(c => c.name() === 'Grid' && c.prop('name') === 'grid');
    expect(grid).toHaveLength(1);
  });

  it('Should render <Card /> for each move', () => {
    const numberMoves = Object.keys(PLAYER_MOVE).length;
    expect(component.find('Card')).toHaveLength(numberMoves);
  });

  it('Should render <Icon /> for each move', () => {
    const numberMoves = Object.keys(PLAYER_MOVE).length;
    expect(component.find('Icon')).toHaveLength(numberMoves);
  });

  it('Should render <Zoom /> for each <Card />', () => {
    const numberCards = component.find('Card').length;
    expect(component.find('Zoom')).toHaveLength(numberCards);
  });

  it('Should render the specified move <Icon /> to each <Card />', () => {
    Object.keys(PLAYER_MOVE).forEach((name, index) => {
      expect(component.find('Icon').at(index).prop('classes')['root']).toContain(PLAYER_MOVE[name].icon);
    });
  });
});

describe('Interaction', () => {
  let component;
  let props;
  beforeEach(() => {
    props = { ...requiredProps, playerId: 1, startTurn: jest.fn(), endTurn: jest.fn() };
    component = ComponentUtils.createMockup(<PlayGround {...props} />, selectorComponent, initialState);
  });

  it('Should get Player', () => {
    expect(component.prop('name')).toEqual('Bot 1');
  });

  /* TODO: Incorrect call of startTurn
  it('Should start turn during build', () => {
    expect(props.startTurn.mock.calls.length).toBe(1);
  });
  */
  /* TODO: Incorrect call of endTurn
  it('Should end turn when <Card /> clicked', () => {
    Object.keys(PLAYER_MOVE).forEach((name, index) => {
      const action = component.find('CardActionArea').at(index);
      action.simulate('click');

      expect(props.endTurn.mock.calls.length).toBe(index+1);
    });
  });
  */
});
