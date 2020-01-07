import { addWeeks, format } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
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

class NewCardDialog extends React.Component {
    state = {
        startDate: new Date(),
        numberOfCourses: 1,
    };

    componentDidMount() {
        const { numberOfCourses } = this.props;
        if (numberOfCourses) {
            this.setState({
                numberOfCourses: numberOfCourses,
            });
        }
    }

    handleChange = (name, isNumber = false) => event => {
        let value = event.target.value;
        if (isNumber) {
            value = toNumber(value);
        }
        this.setState({ [name]: value });
    };

    handleSetExpirationDate = expirationDate => {
        this.setState({
            expirationDate,
        });
    };

    handleOrder = () =>
        this.props.handleCreate(
            this.state.numberOfCourses * 8,
            this.state.startDate
        );

    getUserReadableDate = date => format(date, 'MMM do, yyyy');

    render() {
        const { open, handleClose, handleDropIn } = this.props;
        const { numberOfCourses, expirationDate } = this.state;
        return (
            <Dialog
                open={open}
                onClose={handleClose.bind(null, this.clearForm)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    New Card Required
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`You no longer have an active card, would you like to order a new ${
                            numberToCourseMap[numberOfCourses]
                        } class card that will expire on ${this.getUserReadableDate(
                            expirationDate
                        )}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose.bind(null, this.clearForm)}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleDropIn} color="primary">
                        Student Dropin
                    </Button>
                    <Button onClick={this.handleOrder} color="primary">
                        Order
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

NewCardDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleDropIn: PropTypes.func.isRequired,
    numberOfCourses: PropTypes.number,
};

export default NewCardDialog;
