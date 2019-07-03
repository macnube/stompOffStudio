import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

import { DetailHeader } from 'components';
import styles from './styles';

class StudentDetailHeader extends Component {
    state = {
        id: '',
        name: '',
        email: '',
        mobile: '',
        hasReferralBonus: false,
        canSave: false,
    };

    componentDidMount() {
        const { student } = this.props;
        if (student) {
            const { id, name, email, mobile, hasReferralBonus } = student;
            this.setState({
                id,
                name,
                email,
                mobile,
                hasReferralBonus,
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
        const { id, name, email, mobile, hasReferralBonus } = this.state;
        this.props.handleOnSave({
            id,
            name,
            email,
            mobile,
            hasReferralBonus,
        });
        this.setState({
            canSave: false,
        });
    };

    renderForm = () => {
        const { classes } = this.props;
        const { name, email, mobile, hasReferralBonus } = this.state;
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
                <FormControl className={classes.textField} margin="normal">
                    <InputLabel>Has Referral Bonus?</InputLabel>
                    <Select
                        value={hasReferralBonus}
                        onChange={this.handleChange('hasReferralBonus')}
                        name="referralBonus"
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
            </form>
        );
    };

    render() {
        const {
            handleOnCancel,
            handleOnCreateUser,
            canCreateUser,
            classes,
        } = this.props;
        return (
            <DetailHeader renderForm={this.renderForm} height="Sm">
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.canSave}
                    onClick={this.handleSave}
                    className={classes.button}
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    onClick={handleOnCancel}
                    className={classes.button}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleOnCreateUser}
                    disabled={!canCreateUser}
                >
                    Create User
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
