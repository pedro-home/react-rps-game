import React from 'react';
import { ComponentUtils } from '../../utils';
import App from './App';
import { Main } from '../../pages';

const initialEntries = [
  '/'
];

const initialState = {
  players: []
}

const selectorComponent = 'App';

describe('Render', () => {
  let component;
  beforeEach(() => {
    component = ComponentUtils.createMockup(<App />, selectorComponent, initialState, initialEntries);
  });

  it('Should render <Router />', () => {
    expect(component.find('Router')).toHaveLength(1);
  });

  it('Should render <Route /> for Main', () => {
    const route = component.find('Route');
    expect(route.first().prop('component').WrappedComponent).toBe(Main.WrappedComponent);
  });
});
