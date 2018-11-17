import React from 'react';
import ReactDOM from 'react-dom';
import Ground from './Ground';

it('Create Ground', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ground />, div);
  ReactDOM.unmountComponentAtNode(div);
});
