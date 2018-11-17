import React, { Component } from 'react';
import {
  Modal,
  Grid,
  Typography
} from '@material-ui/core';

import { ComponentUtils } from '../../utils';

class Menu extends Component {
  render() {
    const { children, title, classes, ...rest } = this.props;

    return (
      <Modal disableAutoFocus open disableEnforceFocus {...rest}>
        <div className={classes.modalContent}>
          <Grid container classes={{ container: classes.box }} direction="column" spacing={32} alignItems="center">
            { title &&
              <Grid item>
                <Typography variant="h5" align="center">{title}</Typography>
              </Grid>
            }
            {children &&
              <Grid container item direction="column" spacing={32}>
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

const styles = theme => ({
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '1rem'
  },
  box: {
    width: '400px',

    '& a': {
      textDecoration: 'none'
    }
  }
});

export default ComponentUtils.create(Menu, styles);
