import React, { useState, useEffect } from 'react';
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

const CardDetailHeader = ({
    handleOnCancel,
    card,
    admin,
    classes,
    markPrivateLessonUsed,
    handleOnSave,
}) => {
    const [id, setId] = useState('');
    const [expirationDate, setExpirationDate] = useState(new Date());
    const [value, setValue] = useState(5);
    const [canSave, setCanSave] = useState(false);
    const [privateLessonLength, setPrivateLessonLength] = useState(false);
    const [privateLessonUseDate, setPrivateLessonUseDate] = useState(
        new Date()
    );
    const [openCalendar, setOpenCalendar] = useState(false);

    const populateHeaderWithCardData = () => {
        if (card) {
            const { id, expirationDate, value, privateLessonLength } = card;
            setId(id);
            setExpirationDate(expirationDate);
            setValue(value);
            setPrivateLessonLength(privateLessonLength);
        }
    };

    useEffect(populateHeaderWithCardData, []);

    const handleOnMarkPrivateLessonUsed = (id, privateLessonUseDate) => {
        markPrivateLessonUsed({
            variables: {
                id,
                privateLessonUseDate,
            },
        });
        setOpenCalendar(false);
    };

    const handleSave = () => {
        handleOnSave({
            id,
            expirationDate,
            value,
            privateLessonLength,
        });
        setCanSave(false);
    };

    const renderForm = () => (
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
                onChange={event => {
                    setValue(toNumber(event.target.value));
                    setCanSave(true);
                }}
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
                onChange={event => {
                    setValue(toNumber(event.target.value));
                    setCanSave(true);
                }}
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
                onChange={expirationDate => {
                    setExpirationDate(expirationDate);
                    setCanSave(true);
                }}
                disabled={!admin}
            />
        </form>
    );

    const renderPrivateCalendarDialog = () => (
        <Dialog
            open={openCalendar}
            onClose={() => setOpenCalendar(false)}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                Select date private was used
            </DialogTitle>
            <DialogContent>
                <Calendar
                    date={privateLessonUseDate}
                    onChange={date => {
                        setPrivateLessonUseDate(date);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenCalendar(false)} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() =>
                        handleOnMarkPrivateLessonUsed(
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
    );

    return (
        <DetailHeader renderForm={renderForm} formOnly={!admin}>
            <Button
                variant="contained"
                color="primary"
                disabled={!canSave}
                onClick={handleSave}
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
                    onClick={() => setOpenCalendar(true)}
                    className={classes.button}
                    disabled={
                        privateLessonLength === 0 || card.privateLessonUseDate
                    }
                >
                    Use Private
                </Button>
            ) : null}
            {renderPrivateCalendarDialog()}
        </DetailHeader>
    );
};

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
