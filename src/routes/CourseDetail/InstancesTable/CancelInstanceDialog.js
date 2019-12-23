import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getTableDate } from 'utils/date';

const CancelInstanceDialog = ({
    instance,
    open,
    handleClose,
    handleCancel,
}) => (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
    >
        <DialogTitle id="form-dialog-title">Cancel Course Instance</DialogTitle>
        <DialogContent>
            {`Are you sure you want to cancel the course on ${getTableDate(
                instance.date
            )}`}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
            <Button onClick={() => handleCancel(instance.id)} color="primary">
                Cancel Instance
            </Button>
        </DialogActions>
    </Dialog>
);

CancelInstanceDialog.propTypes = {
    instance: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default CancelInstanceDialog;
