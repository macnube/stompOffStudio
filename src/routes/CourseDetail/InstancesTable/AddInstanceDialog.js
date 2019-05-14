import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
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

import styles from 'routes/CourseManagement/styles';

class AddInstanceDialog extends React.Component {
    state = {
        topic: '',
        notes: '',
        date: new Date(),
        recapUrl: '',
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

    handleCreateInstance = () => {
        const { handleCreate } = this.props;
        handleCreate(this.state);
        this.clearForm();
        // this.props.navigateToStudio(newStudio);
    };

    clearForm = () => {
        this.setState({
            topic: '',
            notes: '',
            date: new Date(),
            recapUrl: '',
        });
    };

    render() {
        const { classes, open, handleClose } = this.props;
        const { topic, notes, date, recapUrl } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    open={open}
                    fullWidth
                    maxWidth="md"
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Create New Instance
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="standard-name"
                            label="Topic"
                            value={topic}
                            className={classes.textField}
                            onChange={this.handleChange('topic')}
                            margin="normal"
                            autoFocus
                        />
                        <DatePicker
                            margin="normal"
                            label="Date"
                            value={date}
                            className={classes.textField}
                            onChange={this.handleSetDate}
                        />
                        <TextField
                            id="standard-name"
                            label="Recap URL"
                            value={recapUrl}
                            className={classes.textField}
                            onChange={this.handleChange('recapUrl')}
                            margin="normal"
                        />
                        <TextField
                            id="standard-name"
                            label="Notes"
                            variant="outlined"
                            value={notes}
                            onChange={this.handleChange('notes')}
                            margin="normal"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose.bind(null, this.clearForm)}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleCreateInstance}
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

AddInstanceDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddInstanceDialog);
