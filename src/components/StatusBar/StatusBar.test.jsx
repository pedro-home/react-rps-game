import React from 'react';
import ReactDOM from 'react-dom';
import StatusBar from './StatusBar';

it('Create Status Bar', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StatusBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
