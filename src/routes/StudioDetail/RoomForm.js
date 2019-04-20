import React from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './styles';

class RoomForm extends React.Component {
    state = {
        id: '',
        name: '',
        capacity: 0,
    };

    componentDidUpdate() {
        const { room } = this.props;
        if (room && room.id !== this.state.id) {
            const { id, name, capacity } = room;
            return this.setState({
                id,
                name,
                capacity,
            });
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSetCapacity = event => {
        this.setState({
            capacity: toNumber(event.target.value),
        });
    };

    clearForm = () => {
        this.setState({
            id: '',
            name: '',
            capacity: 0,
        });
    };

    render() {
        const {
            classes,
            open,
            handleClose,
            handleCreate,
            handleUpdate,
            room,
        } = this.props;
        const { id, name, capacity } = this.state;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {room ? 'Edit Room' : 'Create New Room'}
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
                            id="standard-number"
                            label="Room Capacity"
                            value={capacity}
                            onChange={this.handleSetCapacity}
                            type="number"
                            className={classes.textField}
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
                            onClick={
                                room
                                    ? () => handleUpdate(id, name, capacity)
                                    : () => handleCreate(name, capacity)
                            }
                            color="primary"
                        >
                            {room ? 'Save' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

RoomForm.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    room: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
};

export default withStyles(styles)(RoomForm);
