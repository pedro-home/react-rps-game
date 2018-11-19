import React from 'react';
import compose from 'recompose/compose';
import { connect, Provider } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import { createMount } from '@material-ui/core/test-utils';

class ComponentUtils {
  static create(Component, styles, connection, routing) {
    if (!styles && !connection && !routing) {
      return Component;
    }

    let arrFn = [];
    if (styles) {
      arrFn[0] = withStyles(styles);
    }

    if (connection) {
      arrFn[1] = connect(connection.stateToProps, connection.dispatchToProps);
    }

    if (routing) {
      arrFn[2] = withRouter;
    }

    arrFn = arrFn.filter(fn => fn !== undefined);

    return compose(...arrFn)(Component);
  }

  static createMockup(Component, rootSelector, initState, initEntries) {
    if (!initState && !initEntries) {
      return (createMount())(Component);
    }

    let Fragment = Component;
    if (initEntries) {
      Fragment = (
        <MemoryRouter initialEntries={initEntries}>
          {Fragment}
        </MemoryRouter>
      );
    }

    if (initState) {
      const mockStore = configureStore();
      const store = mockStore(initState);

      Fragment = (
        <Provider store={store}>
          {Fragment}
        </Provider>
      );
    }

    const Mockup = (createMount())(Fragment);
    return Mockup.find(rootSelector);
  }
}

export default ComponentUtils;