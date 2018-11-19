import React from 'react';

import Menu from './Menu';
import { TextField } from '@material-ui/core';
import { ComponentUtils } from '../../utils';

const selectorComponent = 'Menu';

const requiredProps = {
  children: [(<TextField label="Test"></TextField>)]
}

describe('Render', () => {
  let component;
  beforeEach(() => {
    component = ComponentUtils.createMockup(<Menu {...requiredProps} />, selectorComponent);
  });

  it('Should render <Modal />', () => {
    expect(component.find('Modal')).toHaveLength(1);
  });

  it('Should render children', () => {
    const container = component.findWhere(c => c.name() === 'Grid' && c.prop('name') === 'container');
    expect(container.children()).toHaveLength(component.prop('children').length);
  });

  describe('With title', () => {
    beforeEach(() => {
      component = ComponentUtils.createMockup(<Menu title="Test Title" {...requiredProps}></Menu>, selectorComponent);
    });

    it('Should render title', () => {
      const title = component.findWhere(c => c.name() === 'Typography' && c.prop('name') === 'title');
      expect(title.text()).toEqual('Test Title');
    });
  });
});
