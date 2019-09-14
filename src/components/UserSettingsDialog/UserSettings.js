import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { SelectedDeleteToolbar } from 'components';
import styles from './styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class UserSettings extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        canUpdate: false,
    };

    componentDidMount() {
        const { user } = this.props;
        if (user.email) {
            this.setState({
                email: user.email,
            });
        }
    }

    clearForm = () => {
        this.setState({
            password: '',
            confirmPassword: '',
            canUpdate: false,
        });
    };

    canUserUpdate = () => {
        const { canUpdate, password, confirmPassword } = this.state;
        return canUpdate && password.length > 8 && password === confirmPassword;
    };

    handleChange = name => event => {
        let value = event.target.value;
        this.setState({ [name]: value, canUpdate: true });
    };

    handleUpdateUser = () => {
        const { updateUserEmailPassword, user, handleClose } = this.props;
        const { email, password } = this.state;
        updateUserEmailPassword({
            variables: { id: user.id, email, password },
        });
        handleClose(this.clearForm);
    };

    renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeletePress}
        />
    );

    handleUserLogout = () => {
        const { handleLogout, handleClose } = this.props;
        handleLogout();
        handleClose(this.clearForm);
    };

    render() {
        const { classes, handleClose, open } = this.props;
        const { email, password, confirmPassword } = this.state;
        return (
            <Dialog
                open={open}
                onClose={handleClose.bind(null, this.clearForm)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Update user settings
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="standard-name"
                        label="Email"
                        value={email}
                        className={classes.textField}
                        onChange={this.handleChange('email')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="New Password"
                        type="password"
                        helperText="At least 8 characters"
                        value={password}
                        className={classes.textField}
                        onChange={this.handleChange('password')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Confirm Password"
                        type="password"
                        helperText="At least 8 characters"
                        value={confirmPassword}
                        className={classes.textField}
                        onChange={this.handleChange('confirmPassword')}
                        margin="normal"
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
                        onClick={this.handleUpdateUser}
                        color="primary"
                        disabled={!this.canUserUpdate()}
                    >
                        Update
                    </Button>
                    <Button onClick={this.handleUserLogout} color="primary">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

UserSettings.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    updateUserEmailPassword: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(UserSettings);
