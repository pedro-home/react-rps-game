import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Main';

it('Create Game Page', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
  ReactDOM.unmountComponentAtNode(div);
});