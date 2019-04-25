import { addWeeks } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import styles from './styles';

class CardDialog extends React.Component {
    state = {
        expirationDate: addWeeks(new Date(), 8),
        validCount: 8,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSetExpirationDate = startTime => {
        this.setState({
            startTime,
        });
    };

    handleCreate = () => {
        const { createCard, handleClose, studentId } = this.props;
        const { expirationDate, validCount } = this.state;
        createCard({
            variables: {
                expirationDate,
                validCount,
                studentId,
            },
        });
        handleClose(this.clearForm);
    };

    clearForm = () => {
        this.setState({
            name: '',
            mobile: '',
            email: '',
        });
    };

    render() {
        const { classes, open, handleClose } = this.props;
        const { validCount, expirationDate } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Add New Card to Student
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="filled-number"
                            label="Valid Count"
                            value={validCount}
                            onChange={this.handleChange('validCount', true)}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <DatePicker
                            margin="normal"
                            label="Expiration Date"
                            value={expirationDate}
                            className={classes.textField}
                            onChange={this.handleSetExpirationDate}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose.bind(null, this.clearForm)}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreate} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiPickersUtilsProvider>
        );
    }
}

CardDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    studentId: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardDialog);