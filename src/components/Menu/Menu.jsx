import React, { Component } from 'react';
import {
  Modal,
  Grid,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { ComponentUtils } from '../../utils';

const styles = theme => ({
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '1rem',

    '&:focus': {
      outline: 'none'
    }
  },
  box: {
    width: '400px',

    '& a': {
      textDecoration: 'none'
    }
  }
});

class Menu extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
    title: PropTypes.string
  }

  render() {
    const { children, title, classes, ...rest } = this.props;

    return (
      <Modal disableAutoFocus open disableEnforceFocus {...rest}>
        <div className={classes.modalContent}>
          <Grid container classes={{ container: classes.box }} direction="column" spacing={32} alignItems="center">
            { title &&
              <Grid item>
                <Typography name="title" variant="h5" align="center">{title}</Typography>
              </Grid>
            }
            {children &&
              <Grid container item name="container" direction="column" spacing={32}>
                {
                  React.Children.map(children, (child) => {
                    return (
                      <Grid item>
                        {child}
                      </Grid>
                    );
                  })
                }
              </Grid>
            }
          </Grid>
        </div>
      </Modal>
    );
  }
}

export default ComponentUtils.create(Menu, styles);
