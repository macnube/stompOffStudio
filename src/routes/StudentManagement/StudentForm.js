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

class StudentForm extends React.Component {
    state = {
        name: '',
        mobile: '',
        email: '',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleCreate = () => {
        const { createStudent, handleClose } = this.props;
        const { name, email, mobile } = this.state;
        createStudent({
            variables: {
                name,
                email,
                mobile,
            },
        });
        handleClose(this.clearForm);
        // this.props.navigateToStudio(newStudio);
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
        const { name, mobile, email } = this.state;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Create New Student
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.textField}
                            value={name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        <TextField
                            id="standard-number"
                            label="Mobile Number"
                            value={mobile}
                            onChange={this.handleChange('mobile')}
                            type="number"
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Email Address"
                            value={email}
                            onChange={this.handleChange('email')}
                            className={classes.emailField}
                            type="email"
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
                            Create
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
    handleClose: PropTypes.func.isRequired,
    createStudent: PropTypes.func.isRequired,
    navigateToStudentDetail: PropTypes.func.isRequired,
};

export default withStyles(styles)(StudentForm);
