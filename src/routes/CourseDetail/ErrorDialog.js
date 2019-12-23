import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const ErrorDialog = ({ open, message, handleOnClose }) => (
    <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">There was an error!</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
            <Button onClick={handleOnClose} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
);

ErrorDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    handleOnClose: PropTypes.func.isRequired,
};

export default ErrorDialog;
