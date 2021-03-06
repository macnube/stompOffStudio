import 'date-fns';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { PAYMENT_TYPE, PAYMENT_TYPES } from 'constants/gql';
import { getTableDate } from 'utils/date';
import styles from './styles';

class PaymentDialog extends React.Component {
    state = {
        id: '',
        type: PAYMENT_TYPE.CARD,
        amount: 0,
        date: new Date(),
        cardId: '',
        clearBonus: false,
    };

    componentDidMount() {
        const { payment } = this.props;
        if (payment && payment.id !== this.state.id) {
            const { id, type, amount, date } = payment;
            return this.setState({
                id,
                type,
                amount,
                date,
            });
        }
    }

    componentDidUpdate(prevProps) {
        const { payment } = this.props;
        if (payment && isNil(prevProps.payment)) {
            const { id, type, amount, date } = payment;
            return this.setState({
                id,
                type,
                amount,
                date,
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

    handleToggleClearBonus = event => {
        let value = event.target.checked;
        this.setState({ clearBonus: value });
    };

    handleSetDate = date => {
        this.setState({
            date,
        });
    };

    handleCreatePayment = () => {
        const { handleCreate, handleClearBonus, student } = this.props;
        const { clearBonus } = this.state;
        handleCreate({ ...this.state, studentId: student.id });
        if (clearBonus) {
            handleClearBonus(student.id);
        }

        this.clearForm();
    };

    handleUpdatePayment = () => {
        const { handleUpdate, handleClearBonus, student } = this.props;
        const { clearBonus } = this.state;
        handleUpdate({ ...this.state, studentId: student.id });
        if (clearBonus) {
            handleClearBonus(student.id);
        }

        this.clearForm();
    };

    clearForm = () => {
        this.setState({
            id: '',
            type: 'Card',
            amount: 0,
            date: new Date(),
            cardId: '',
        });
    };

    getUnpaidCardItems = () => {
        const { payment } = this.props;
        const student = this.state.id ? payment.student : this.props.student;
        const unpaidCards = filter(student.cards, card => isNil(card.payment));
        return map(unpaidCards, card => (
            <MenuItem key={card.id} value={card.id}>
                {getTableDate(card.expirationDate)}
            </MenuItem>
        ));
    };

    renderForm = () => {
        const { classes, student } = this.props;
        const { type, amount, date, cardId, clearBonus } = this.state;
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
                {type === PAYMENT_TYPE.CARD ? (
                    <TextField
                        id="standard-select-studio-native"
                        select
                        label="Select Card by Date"
                        value={cardId}
                        className={classes.textField}
                        onChange={this.handleChange('cardId')}
                        margin="normal"
                    >
                        {this.getUnpaidCardItems()}
                    </TextField>
                ) : null}
                <DatePicker
                    margin="normal"
                    label="Date"
                    value={date}
                    className={classes.textField}
                    onChange={this.handleSetDate}
                />
                {student.hasReferralBonus ? (
                    <FormControlLabel
                        className={classes.checkbox}
                        control={
                            <Checkbox
                                checked={clearBonus}
                                onChange={this.handleToggleClearBonus}
                                value="clearBonus"
                            />
                        }
                        label="Clear Referral Bonus?"
                    />
                ) : null}
            </React.Fragment>
        );
    };

    render() {
        const { open, handleClose, student } = this.props;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {this.state.id
                            ? `Update payment for ${student.name}`
                            : `Create new payment for ${student.name}`}
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
                            onClick={
                                this.state.id
                                    ? this.handleUpdatePayment
                                    : this.handleCreatePayment
                            }
                            color="primary"
                        >
                            {this.state.id ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiPickersUtilsProvider>
        );
    }
}

PaymentDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleClearBonus: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    payment: PropTypes.object,
};

export default withStyles(styles)(PaymentDialog);
