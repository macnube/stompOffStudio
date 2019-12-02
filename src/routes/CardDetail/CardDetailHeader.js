import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { DatePicker } from 'material-ui-pickers';
import { Calendar } from 'material-ui-pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { DetailHeader } from 'components';
import styles from './styles';

class CardDetailHeader extends Component {
    state = {
        id: '',
        expirationDate: new Date(),
        value: 5,
        canSave: false,
        privateLessonLength: 0,
        privateLessonUseDate: new Date(),
        openCalendar: false,
    };

    componentDidMount() {
        const { card } = this.props;
        if (card) {
            const { id, expirationDate, value, privateLessonLength } = card;
            this.setState({
                id,
                expirationDate,
                value,
                privateLessonLength,
            });
        }
    }

    handleChange = (name, isNumber = false) => event => {
        let value = event.target.value;
        if (isNumber) {
            value = toNumber(value);
        }
        this.setState({ [name]: value, canSave: true });
    };

    handleOpenCalendar = () => {
        this.setState({
            openCalendar: true,
        });
    };

    handleCloseCalendar = () => {
        this.setState({
            openCalendar: false,
        });
    };

    handleSetCalendarDate = date => {
        this.setState({
            privateLessonUseDate: date,
        });
    };

    handleOnMarkPrivateLessonUsed = (id, privateLessonUseDate) => {
        this.props.markPrivateLessonUsed({
            variables: {
                id,
                privateLessonUseDate,
            },
        });
        this.setState({
            openCalendar: false,
        });
    };

    handleSave = () => {
        const { id, expirationDate, value, privateLessonLength } = this.state;
        this.props.handleOnSave({
            id,
            expirationDate,
            value,
            privateLessonLength,
        });
        this.setState({
            canSave: false,
        });
    };

    handleSetExpirationDate = expirationDate => {
        this.setState({
            expirationDate,
            canSave: true,
        });
    };

    renderForm = () => {
        const { classes, card, admin } = this.props;
        const { value, expirationDate, privateLessonLength } = this.state;
        return (
            <form>
                <TextField
                    id="standard-select-studio-native"
                    disabled
                    label="Student"
                    value={card.student.name}
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    id="filled-number"
                    label="Value"
                    value={value}
                    onChange={this.handleChange('value', true)}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    disabled={!admin}
                />
                <TextField
                    id="filled-number"
                    label="Private Lesson Length"
                    value={privateLessonLength}
                    onChange={this.handleChange('privateLessonLength', true)}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    disabled={card.privateLessonUseDate || !admin}
                />
                {card.payment ? (
                    <TextField
                        id="standard-select-studio-native"
                        disabled
                        label="Payment Date"
                        value={card.payment.date}
                        className={classes.textField}
                        margin="normal"
                    />
                ) : null}
                {card.payment ? (
                    <TextField
                        id="standard-select-studio-native"
                        disabled
                        label="Payment Amount"
                        value={card.payment.amount}
                        className={classes.textField}
                        margin="normal"
                    />
                ) : null}
                <DatePicker
                    margin="normal"
                    label="Expiration Date"
                    value={expirationDate}
                    className={classes.textField}
                    onChange={this.handleSetExpirationDate}
                    disabled={!admin}
                />
            </form>
        );
    };

    render() {
        const { handleOnCancel, card, admin, classes } = this.props;

        const {
            canSave,
            privateLessonLength,
            privateLessonUseDate,
            openCalendar,
        } = this.state;

        return (
            <DetailHeader renderForm={this.renderForm} formOnly={!admin}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!canSave}
                    onClick={this.handleSave}
                    className={classes.button}
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    onClick={handleOnCancel}
                    className={classes.button}
                >
                    Cancel
                </Button>
                {admin ? (
                    <Button
                        variant="contained"
                        onClick={this.handleOpenCalendar}
                        className={classes.button}
                        disabled={
                            privateLessonLength === 0 ||
                            card.privateLessonUseDate
                        }
                    >
                        Use Private
                    </Button>
                ) : null}
                <Dialog
                    open={openCalendar}
                    onClose={this.handleCloseCalendar}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Select date private was used
                    </DialogTitle>
                    <DialogContent>
                        <Calendar
                            date={privateLessonUseDate}
                            onChange={this.handleSetCalendarDate}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleCloseCalendar}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() =>
                                this.handleOnMarkPrivateLessonUsed(
                                    card.id,
                                    privateLessonUseDate
                                )
                            }
                            color="primary"
                        >
                            Log Private Lesson Used
                        </Button>
                    </DialogActions>
                </Dialog>
            </DetailHeader>
        );
    }
}

CardDetailHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    handleOnSave: PropTypes.func.isRequired,
    handleOnCancel: PropTypes.func.isRequired,
    markPrivateLessonUsed: PropTypes.func.isRequired,
    admin: PropTypes.bool.isRequired,
};

CardDetailHeader.defaultProps = {
    admin: false,
};

export default withStyles(styles)(CardDetailHeader);
