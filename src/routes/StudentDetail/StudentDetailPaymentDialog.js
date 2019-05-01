import 'date-fns';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import filter from 'lodash/filter';
import isNil from 'lodash/isNil';
import toNumber from 'lodash/toNumber';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

import { PAYMENT_TYPE, PAYMENT_TYPES } from 'constants/gql';
import styles from './styles';

class StudentDetailPaymentDialog extends React.Component {
    state = {
        type: PAYMENT_TYPE.CARD,
        amount: 0,
        date: new Date(),
        cardId: '',
    };

    handleChange = (name, isNumber = false) => event => {
        let value = event.target.value;
        if (isNumber) {
            value = toNumber(value);
        }
        this.setState({ [name]: value });
    };

    handleSetDate = date => {
        this.setState({
            date,
        });
    };

    handleCreatePayment = () => {
        const { handleCreate, student } = this.props;
        handleCreate({ ...this.state, studentId: student.id });
        this.clearForm();
        // this.props.navigateToStudio(newStudio);
    };

    clearForm = () => {
        this.setState({
            type: 'Card',
            amount: 0,
            date: new Date(),
            cardId: '',
        });
    };

    getUnpaidCards = () => {
        const { student } = this.props;
        return filter(student.cards, card => isNil(card.payment));
    };

    renderForm = () => {
        const { classes } = this.props;
        const { type, amount, date, cardId } = this.state;
        return (
            <React.Fragment>
                <TextField
                    select
                    label="Select Type"
                    value={type}
                    className={classes.textField}
                    onChange={this.handleChange('type')}
                    margin="normal"
                >
                    {map(PAYMENT_TYPES, (type, i) => (
                        <MenuItem key={i} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="filled-number"
                    label="Payment Amount"
                    value={amount}
                    onChange={this.handleChange('amount', true)}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <TextField
                    id="standard-select-studio-native"
                    select
                    label="Select Card by Date"
                    value={cardId}
                    className={classes.textField}
                    onChange={this.handleChange('cardId')}
                    margin="normal"
                >
                    {map(this.getUnpaidCards(), card => (
                        <MenuItem key={card.id} value={card.id}>
                            {format(
                                parseISO(card.expirationDate),
                                'MMM do, yyyy'
                            )}
                        </MenuItem>
                    ))}
                </TextField>
                <DatePicker
                    margin="normal"
                    label="Date"
                    value={date}
                    className={classes.textField}
                    onChange={this.handleSetDate}
                />
            </React.Fragment>
        );
    };

    render() {
        const { open, handleClose } = this.props;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Create New Payment
                    </DialogTitle>
                    <DialogContent>{this.renderForm()}</DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose.bind(null, this.clearForm)}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleCreatePayment}
                            color="primary"
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiPickersUtilsProvider>
        );
    }
}

StudentDetailPaymentDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentDetailPaymentDialog);
