import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import noop from 'lodash/noop';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends Component {
    render() {
        const {
            classes,
            title,
            children,
            open,
            handleClose = noop,
        } = this.props;
        return (
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.flex}
                        >
                            Close
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    title: PropTypes.string.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
