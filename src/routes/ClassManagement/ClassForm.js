import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import filter from 'lodash/filter';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './styles';

const availableStudios = {
    AKA: {
        name: 'Akazienstrasse',
        id: 'AKA',
        rooms: [
            { id: 'AKA_SR1', name: 'Big Room' },
            { id: 'AKA_SR2', name: 'Small Room' },
        ],
    },
    SOS: {
        name: 'Stomp Off Studio',
        id: 'SOS',
        rooms: [
            { id: 'SOS_SR1', name: 'Main Room' },
            { id: 'SOS_SR2', name: 'Side Room' },
            { id: 'SOS_SR3', name: 'Upstairs Room' },
            { id: 'SOS_SR4', name: 'Downstairs Room' },
        ],
    },
};
const availableTeachers = {
    LanaS: {
        name: 'Lana Sedlmayr',
        email: 'miss.lana.sedlmayr@gmail.com',
    },
    PaulM: {
        name: 'Paul McCloud',
        email: 'paul.mccloud@gmail.com',
    },
};

class ClassForm extends React.Component {
    availableStudios = null;
    availableTeachers = null;
    state = {
        id: '',
        name: '',
        studioId: '',
        roomId: '',
        startDate: '',
        teachers: [],
        maxStudents: null,
    };

    componentDidMount = () => {
        this.availableStudios = availableStudios;
        this.availableTeachers = availableTeachers;
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSelectClass = selectedId => {
        const { selectedClasses } = this.state;
        if (selectedClasses.includes(selectedId)) {
            return this.setState({
                selectedClasses: filter(
                    selectedClasses,
                    id => id !== selectedId
                ),
            });
        }
        this.setState({
            selectedClasses: selectedClasses.concat(selectedId),
        });
    };

    handleCreateClass = () => {};

    clearForm = () => {
        this.setState({
            id: '',
            name: '',
            studioId: '',
            roomId: '',
            startDate: '',
            teachers: [],
            maxStudents: null,
        });
    };

    render() {
        const { classes, open, handleClose } = this.props;
        const { studioId, roomId } = this.state;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Create New Class
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="standard-name"
                            label="Name"
                            value={this.state.name}
                            className={classes.textField}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="standard-select-studio-native"
                            select
                            label="Select Studio"
                            value={studioId}
                            className={classes.textField}
                            onChange={this.handleChange('studioId')}
                            margin="normal"
                        >
                            {map(this.availableStudios, s => (
                                <MenuItem key={s.id} value={s.id}>
                                    {s.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="standard-select-room-native"
                            select
                            label="Select Room"
                            value={roomId}
                            className={classes.textField}
                            onChange={this.handleChange('roomId')}
                            margin="normal"
                            disabled={!studioId}
                        >
                            {studioId &&
                                map(
                                    this.availableStudios[studioId].rooms,
                                    r => (
                                        <MenuItem key={r.id} value={r.id}>
                                            {r.name}
                                        </MenuItem>
                                    )
                                )}
                        </TextField>
                        <TextField
                            id="date"
                            label="Start Date"
                            type="date"
                            onChange={this.handleChange('startDate')}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            id="filled-number"
                            label="Max Students"
                            value={this.state.maxStudents}
                            onChange={this.handleChange('maxStudents')}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                            onClick={handleClose.bind(null, this.clearForm)}
                            color="primary"
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ClassForm.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    student: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(ClassForm);
