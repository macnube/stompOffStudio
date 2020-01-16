import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { DatePicker } from 'material-ui-pickers';

import { DetailHeader } from 'components';
import styles from './styles';

const StudentCardDetailHeader = ({ card, classes }) => {
    const [expirationDate, setExpirationDate] = useState(new Date());
    const [value, setValue] = useState(5);
    const [privateLessonLength, setPrivateLessonLength] = useState(false);

    const populateHeaderWithCardData = () => {
        if (card) {
            const { id, expirationDate, value, privateLessonLength } = card;
            setExpirationDate(expirationDate);
            setValue(value);
            setPrivateLessonLength(privateLessonLength);
        }
    };

    useEffect(populateHeaderWithCardData, []);

    const renderForm = () => (
        <form>
            <TextField
                id="filled-number"
                label="Classes Left"
                value={value}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
                disabled={true}
            />
            <DatePicker
                margin="normal"
                label="Expiration Date"
                value={expirationDate}
                className={classes.textField}
                disabled={true}
            />
            <TextField
                id="filled-number"
                label="Private Lesson Length"
                value={privateLessonLength}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
                disabled={true}
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
        </form>
    );

    return (
        <DetailHeader
            renderForm={renderForm}
            formOnly={true}
            height="Chilren"
        />
    );
};

StudentCardDetailHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentCardDetailHeader);
