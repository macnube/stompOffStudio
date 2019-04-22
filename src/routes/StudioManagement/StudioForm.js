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

class StudioForm extends React.Component {
    state = {
        name: '',
        address: '',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleCreate = () => {
        const { createStudio, handleClose } = this.props;
        const { name, address } = this.state;
        createStudio({
            variables: {
                name,
                address,
            },
        });
        handleClose(this.clearForm);
        // this.props.navigateToStudio(newStudio);
    };

    clearForm = () => {
        this.setState({
            name: '',
            address: '',
        });
    };

    render() {
        const { classes, open, handleClose } = this.props;
        const { name, address } = this.state;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Create New Studio
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.textField}
                            value={name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            autoFocus={true}
                        />
                        <TextField
                            id="standard-name"
                            label="Address"
                            className={classes.textField}
                            value={address}
                            onChange={this.handleChange('address')}
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
                        <Button onClick={this.handleCreate} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

StudioForm.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    createStudio: PropTypes.func.isRequired,
};

export default withStyles(styles)(StudioForm);
