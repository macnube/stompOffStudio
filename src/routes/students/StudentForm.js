import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './styles';

const cardTypes = ['None', 'Single', 'Double', 'Triple', 'All'];

class StudentForm extends React.Component {
    state = {
        id: '',
        name: '',
        mobile: '',
        email: '',
        cardType: 'Single',
        cardStart: '',
        selectedClasses: [],
    };

    componentDidUpdate() {
        const { student } = this.props;
        if (student && student.id !== this.state.id) {
            this.setState({
                id: student.id,
                name: student.name,
                mobile: student.mobile,
                email: student.email,
                selectedClasses: student.classes,
            });
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    clearForm = () => {
        this.setState({
            id: '',
            name: '',
            mobile: '',
            email: '',
            cardType: 'Single',
            cardStart: '',
        });
    };

    render() {
        const { classes, open, handleClose, student } = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {student ? 'Edit Student' : 'Create New Student'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        <TextField
                            id="standard-number"
                            label="Mobile Number"
                            value={this.state.mobile}
                            onChange={this.handleChange('mobile')}
                            type="number"
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Email Address"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            className={classes.emailField}
                            type="email"
                        />
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Select Card Type"
                            className={classes.textField}
                            value={this.state.cardType}
                            onChange={this.handleChange('cardType')}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                        >
                            {cardTypes.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="date"
                            label="Card Start Date"
                            type="date"
                            onChange={this.handleChange('cardStart')}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            disabled={this.state.cardType === 'None'}
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
                            onClick={handleClose.bind(null, this.clearForm)}
                            color="primary"
                        >
                            {student ? 'Save' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

StudentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    student: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(StudentForm);
