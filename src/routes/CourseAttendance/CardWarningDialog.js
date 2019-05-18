import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { CARD_WARNING_MESSAGES } from './constants';

const CardWarningDialog = ({ open, handleClose, message }) => (
    <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="form-dialog-title"
    >
        <DialogTitle id="form-dialog-title">Card Warning</DialogTitle>
        <DialogContent>
            <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
                Ok
            </Button>
        </DialogActions>
    </Dialog>
);

CardWarningDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    message: PropTypes.oneOf(CARD_WARNING_MESSAGES),
};

export default CardWarningDialog;
