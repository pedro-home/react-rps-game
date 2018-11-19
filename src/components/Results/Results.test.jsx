import React from 'react';

import Results from './Results';
import { PLAYER_STATUS } from '../../globals';
import { ComponentUtils } from '../../utils';

const initialEntries = [
  '/'
];

const initialState = {
  players: [
    { name: 'Player 1', status: PLAYER_STATUS.PLAYING },
    { name: 'Player 2', status: PLAYER_STATUS.DEAD },
    { name: 'Player 3', status: PLAYER_STATUS.DEAD }  
  ]
};

const selectorComponent = 'Results';

describe('Render', () => {
  let component;
  beforeEach(() => {
    component = ComponentUtils.createMockup(<Results />, selectorComponent, initialState, initialEntries);
  });

  it('Should render <Menu />', () => {
    expect(component.find('Menu')).toHaveLength(1);
  });

  it('Should render a Main Menu <Button />', () => {
    expect(component.find('Button')).toHaveLength(1);
  });

  it('Should render the correct winner', () => {
    const title = component.find('Menu').prop('title');
    expect(title).toEqual('Player 1 is the WINNER!');
  });
});
