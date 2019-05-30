import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { DetailHeader } from 'src/components';
import styles from './styles';

class StudioDetailHeader extends Component {
    state = {
        id: '',
        name: '',
        address: '',
        canSave: false,
    };

    componentDidMount() {
        const { studio } = this.props;
        if (studio) {
            const { id, name, address } = studio;
            this.setState({
                id,
                name,
                address,
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
        const { id, name, address } = this.state;
        this.props.handleOnSave({
            id,
            name,
            address,
        });
        this.setState({
            canSave: false,
        });
    };

    renderForm = () => {
        const { classes } = this.props;
        const { name, address } = this.state;
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
                    label="Address"
                    value={address}
                    className={classes.textField}
                    onChange={this.handleChange('address')}
                    margin="normal"
                />
            </form>
        );
    };

    render() {
        const { handleOnCancel } = this.props;

        return (
            <DetailHeader renderForm={this.renderForm}>
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

StudioDetailHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    studio: PropTypes.object.isRequired,
    handleOnSave: PropTypes.func.isRequired,
    handleOnCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(StudioDetailHeader);
