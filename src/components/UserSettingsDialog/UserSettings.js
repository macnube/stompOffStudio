import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { SelectedDeleteToolbar } from 'components';
import styles from './styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
                email: email,
            });
        }
    }

    handleChange = name => event => {
        let value = event.target.value;
        this.setState({ [name]: value, canUpdate: true });
    };

    handleUpdateUser = () => {
        const { updateUserEmailPassword, user } = this.props;
        const { email, password } = this.state;
        updateUserEmailPassword({
            variables: { id: user.id, email, password },
        });
    };

    renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeletePress}
            renderChildren={this.renderAdminToggleButton}
        />
    );

    render() {
        const { user, classes } = this.props;
        const { canUpdate } = this.state;
        return (
            <Dialog
                open={open}
                onClose={handleClose.bind(null, this.clearForm)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Create New Payment
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
                        disabled={!this.state.canUpdate}
                    >
                        Update
                    </Button>
                    <Button onClick={this.handleLogout} color="primary">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

UserSettings.propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired,
    toggleUserAdminStatus: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(UserSettings);
