import React from 'react';

import { PLAYER_STATUS, PLAYER_TYPE } from '../../globals';
import { ComponentUtils } from '../../utils';
import StatusBar from './StatusBar';

const initialState = {
  players: [
    { name: 'Player 1', type: PLAYER_TYPE.HUMAN, status: PLAYER_STATUS.PLAYING },
    { name: 'Bot 1', type: PLAYER_TYPE.AI, status: PLAYER_STATUS.WAITING },
    { name: 'Player 2', type: PLAYER_TYPE.HUMAN, status: PLAYER_STATUS.DEAD }
  ]
};

const selectorComponent = 'StatusBar';

const requiredProps = {
  playerId: 0
}

describe('Render', () => {
  let component;
  beforeEach(() => {
    component = ComponentUtils.createMockup(<StatusBar {...requiredProps} />, selectorComponent, initialState);
  });

  it('Should render <LinearProgress />', () => {
    expect(component.find('LinearProgress')).toHaveLength(1);
  });

  it('Should render <Avatar />', () => {
    expect(component.find('Avatar')).toHaveLength(1);
  });

  it('Should render <Icon />', () => {
    expect(component.find('Icon')).toHaveLength(1);
  });

  it('Should render main <Grid />', () => {
    const grid = component.findWhere(c => c.name() === 'Grid' && c.prop('name') === 'grid');
    expect(grid).toHaveLength(1);
  });

  it('Should render status <Grid />', () => {
    const grid = component.findWhere(c => c.name() === 'Grid' && c.prop('name') === 'status');
    expect(grid).toHaveLength(1);
  });

  it('Should render player name and player status <Typography />', () => {
    expect(component.find('Typography')).toHaveLength(2);
  });

  describe('Avatar content', () => {
    it('Should render <Icon /> with player type, when not dead', () => {
      const icon = component.find('Icon').prop('classes')['root'];
      expect(icon).toContain(PLAYER_TYPE.HUMAN.icon);
    });

    it('Should render <Icon /> with player status, when dead', () => {
      const { playerId, ...rest } = requiredProps;
      component = ComponentUtils.createMockup(<StatusBar {...rest} playerId={2} />, selectorComponent, initialState);
      const icon = component.find('Icon').prop('classes')['root'];
      expect(icon).toContain(PLAYER_STATUS.DEAD.icon);
    });
  });

  describe('Invert component content', () => {
    beforeEach(() => {
      component = ComponentUtils.createMockup(<StatusBar {...requiredProps} inverted />, selectorComponent, initialState);
    });
  
    it('Should reverse main <Grid /> order', () => {
      const grid = component.findWhere(c => c.name() === 'Grid' && c.prop('name') === 'grid');
      expect(grid.prop('direction')).toEqual('row-reverse');
    });

    it('Should reverse status <Grid /> order', () => {
      const status = component.findWhere(c => c.name() === 'Grid' && c.prop('name') === 'status');
      expect(status.prop('direction')).toEqual('row-reverse');
    });

    it('Should reverse player name <Typography /> alignment', () => {
      expect(component.find('Typography').first().prop('align')).toEqual('right');
    });

    it('Should reverse player status <Typography /> alignment', () => {
      expect(component.find('Typography').last().prop('align')).toEqual('left');
    });

    it('Should reverse <LinearProgress /> order', () => {
      expect(component.find('LinearProgress').prop('classes')['bar']).toContain('invertedProgress');
    });
  });
});
