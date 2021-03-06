import { addWeeks } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import styles from './styles';

class CardDialog extends React.Component {
    state = {
        startDate: new Date(),
        value: 8,
        errorMessage: '',
    };

    componentDidMount() {
        const { numberOfCourses } = this.props;
        if (numberOfCourses) {
            this.setState({
                value: numberOfCourses * 8,
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

    handleSetStartDate = startDate => {
        this.setState({
            startDate,
        });
    };

    handleCreate = async () => {
        const { createCard, handleClose, studentId } = this.props;
        const { startDate, value } = this.state;
        try {
            await createCard({
                variables: {
                    startDate,
                    value,
                    studentId,
                },
            });
        } catch (e) {
            return this.setState({
                errorMessage: e.message,
            });
        }

        handleClose(this.clearForm);
    };

    clearForm = () => {
        this.setState({
            name: '',
            mobile: '',
            email: '',
            errorMessage: '',
        });
    };

    render() {
        const { classes, open, handleClose, title } = this.props;
        const { value, startDate, errorMessage } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    {errorMessage ? (
                        <DialogContentText>{errorMessage}</DialogContentText>
                    ) : null}
                    <DialogContent>
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
                        <DatePicker
                            margin="normal"
                            label="Date of First Class"
                            value={startDate}
                            className={classes.textField}
                            onChange={this.handleSetStartDate}
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
    title: PropTypes.string.isRequired,
    numberOfCourses: PropTypes.number,
};

export default withStyles(styles)(CardDialog);
