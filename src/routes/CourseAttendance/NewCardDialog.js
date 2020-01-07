import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const numberToCourseMap = {
    1: 'Single',
    2: 'Double',
    3: 'Triple',
};

const NewCardDialog = ({
    numberOfCourses,
    handleCreate,
    open,
    handleClose,
    handleDropIn,
}) => {
    const startDate = new Date();

    const handleOrder = () => handleCreate(numberOfCourses * 8, startDate);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">New Card Required</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`You no longer have an active card, would you like to order a new ${
                        numberToCourseMap[numberOfCourses]
                    } Card`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDropIn} color="primary">
                    Student Dropin
                </Button>
                <Button onClick={handleOrder} color="primary">
                    Order
                </Button>
            </DialogActions>
        </Dialog>
    );
};

NewCardDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleDropIn: PropTypes.func.isRequired,
    numberOfCourses: PropTypes.number,
};

export default NewCardDialog;
