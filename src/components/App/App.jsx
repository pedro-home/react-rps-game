import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Game, Main } from '../../pages';
import { ComponentUtils } from '../../utils';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/game" component={Game} />
        </Switch>
      </Router>
    );
  }
}

export default ComponentUtils.create(App);