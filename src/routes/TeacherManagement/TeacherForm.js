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

class TeacherForm extends React.Component {
    state = {
        id: '',
        name: '',
        mobile: '',
        email: '',
    };

    componentDidUpdate() {
        const { teacher } = this.props;
        if (teacher && teacher.id !== this.state.id) {
            const { id, name, mobile, email } = teacher;
            return this.setState({
                id: id,
                name: name,
                mobile: mobile,
                email: email,
            });
        } else if (this.state.id && !teacher) {
            this.clearForm();
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
        });
    };

    render() {
        const {
            classes,
            open,
            handleClose,
            handleCreate,
            handleUpdate,
            teacher,
        } = this.props;
        const { id, name, email, mobile } = this.state;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {teacher ? 'Edit Teacher' : 'Create New Teacher'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            autoFocus={true}
                        />
                        <TextField
                            id="standard-number"
                            label="Mobile Number"
                            value={this.state.mobile}
                            onChange={this.handleChange('mobile')}
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
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose.bind(null, this.clearForm)}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={
                                teacher
                                    ? () =>
                                          handleUpdate(
                                              id,
                                              name,
                                              email,
                                              mobile,
                                              []
                                          )
                                    : () => handleCreate(name, email, mobile)
                            }
                            color="primary"
                        >
                            {teacher ? 'Save' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

TeacherForm.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    teacher: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
};

export default withStyles(styles)(TeacherForm);
