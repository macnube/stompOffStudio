import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { DatePicker } from 'material-ui-pickers';

import { DetailHeader } from 'components';
import styles from './styles';

class CardDetailHeader extends Component {
    state = {
        id: '',
        expirationDate: new Date(),
        value: 5,
        canSave: false,
    };

    componentDidMount() {
        const { card } = this.props;
        if (card) {
            const { id, expirationDate, value } = card;
            this.setState({
                id,
                expirationDate,
                value,
            });
        }
    }

    componentDidUpdate() {
        if (this.state.value !== this.props.card.value) {
            this.setState({
                value: this.props.card.value,
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

    handleSave = () => {
        const { id, expirationDate, value } = this.state;
        this.props.handleOnSave({
            id,
            expirationDate,
            value,
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
        const { classes, card } = this.props;
        const { value, expirationDate } = this.state;
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
                />
            </form>
        );
    };

    render() {
        const { handleOnCancel } = this.props;

        return (
            <DetailHeader renderForm={this.renderForm}>
                <Button variant="contained" onClick={handleOnCancel}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.canSave}
                    onClick={this.handleSave}
                >
                    Save
                </Button>
            </DetailHeader>
        );
    }
}

CardDetailHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    handleOnSave: PropTypes.func.isRequired,
    handleOnCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(CardDetailHeader);
