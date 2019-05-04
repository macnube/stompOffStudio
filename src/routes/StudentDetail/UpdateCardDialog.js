import React from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
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

class UpdateCardDialog extends React.Component {
    state = {
        id: '',
        expirationDate: new Date(),
        value: 8,
    };

    componentDidUpdate() {
        const { card } = this.props;
        if (card && card.id !== this.state.id) {
            const { id, expirationDate, value } = card;
            return this.setState({
                id,
                value,
                expirationDate,
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

    handleUpdate = () => {
        const { updateCard, handleClose, card } = this.props;
        const { expirationDate, value } = this.state;
        updateCard({
            variables: {
                expirationDate,
                value,
                id: card.id,
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
        const { value, expirationDate } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Update Student Card
                    </DialogTitle>
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
                        <Button onClick={this.handleUpdate} color="primary">
                            save
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiPickersUtilsProvider>
        );
    }
}

UpdateCardDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateCardDialog);
