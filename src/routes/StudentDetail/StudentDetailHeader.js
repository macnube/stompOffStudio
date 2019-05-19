import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { DetailHeader } from 'components';
import styles from './styles';

class StudentDetailHeader extends Component {
    state = {
        id: '',
        name: '',
        email: '',
        mobile: '',
        canSave: false,
    };

    componentDidMount() {
        const { student } = this.props;
        if (student) {
            const { id, name, email, mobile } = student;
            this.setState({
                id,
                name,
                email,
                mobile,
            });
        }
    }

    handleChange = (name, isNumber = false) => event => {
        let value = event.target.value;
        if (isNumber) {
            value = toNumber(value);
        }
        this.setState({ [name]: value, canSave: true });
    };

    handleSave = () => {
        const { id, name, email, mobile } = this.state;
        this.props.handleOnSave({
            id,
            name,
            email,
            mobile,
        });
        this.setState({
            canSave: false,
        });
    };

    renderForm = () => {
        const { classes } = this.props;
        const { name, email, mobile } = this.state;
        return (
            <form>
                <TextField
                    id="standard-name"
                    label="Name"
                    value={name}
                    className={classes.textField}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Email"
                    value={email}
                    className={classes.textField}
                    onChange={this.handleChange('email')}
                    margin="normal"
                />
                <TextField
                    id="standard-select-studio-native"
                    label="Mobile"
                    value={mobile}
                    className={classes.textField}
                    onChange={this.handleChange('mobile')}
                    margin="normal"
                />
            </form>
        );
    };

    render() {
        const {
            handleOnCancel,
            handleOnCreateUser,
            canCreateUser,
        } = this.props;

        return (
            <DetailHeader renderForm={this.renderForm}>
                {canCreateUser ? (
                    <Button variant="contained" onClick={handleOnCreateUser}>
                        Create User
                    </Button>
                ) : null}
                <Button variant="contained" onClick={handleOnCancel}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.canSave}
                    onClick={this.handleSave}
                >
                    Save
                </Button>
            </DetailHeader>
        );
    }
}

StudentDetailHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    student: PropTypes.object.isRequired,
    handleOnSave: PropTypes.func.isRequired,
    handleOnCancel: PropTypes.func.isRequired,
    handleOnCreateUser: PropTypes.func.isRequired,
    canCreateUser: PropTypes.bool.isRequired,
};

export default withStyles(styles)(StudentDetailHeader);
