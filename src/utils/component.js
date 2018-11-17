import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

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
}

export default ComponentUtils;