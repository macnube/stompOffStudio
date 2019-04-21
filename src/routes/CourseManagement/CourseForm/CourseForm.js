import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import find from 'lodash/find';
import toNumber from 'lodash/toNumber';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker,
} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import styles from 'routes/CourseManagement/styles';

class CourseForm extends React.Component {
    state = {
        name: '',
        description: '',
        duration: 0,
        startTime: new Date(),
        studioId: '',
        roomId: '',
        startDate: new Date(),
        studentLimit: 0,
    };

    handleChange = (name, isNumber = false) => event => {
        let value = event.target.value;
        if (isNumber) {
            value = toNumber(value);
        }
        this.setState({ [name]: value });
    };

    handleSetStartTime = startTime => {
        this.setState({
            startTime,
        });
    };

    handleSetStartDate = startDate => {
        this.setState({
            startDate,
        });
    };

    handleCreateCourse = () => {
        const { handleCreate } = this.props;
        const { studioId, ...course } = this.state;
        handleCreate(course);
        // this.props.navigateToStudio(newStudio);
    };

    handleCreateClass = () => {};

    clearForm = () => {
        this.setState({
            id: '',
            name: '',
            description: '',
            duration: 0,
            startTime: new Date(),
            studioId: '',
            roomId: '',
            startDate: new Date(),
            studentLimit: 0,
        });
    };

    render() {
        const { classes, studios, open, handleClose } = this.props;
        const {
            name,
            description,
            duration,
            studioId,
            roomId,
            startDate,
            startTime,
            studentLimit,
        } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Create New Course
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="standard-name"
                            label="Name"
                            value={name}
                            className={classes.textField}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            autoFocus
                        />
                        <TextField
                            id="standard-name"
                            label="description"
                            value={description}
                            className={classes.textField}
                            onChange={this.handleChange('description')}
                            margin="normal"
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
                            {map(studios, s => (
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
                                    find(studios, { id: studioId }).rooms,
                                    r => (
                                        <MenuItem key={r.id} value={r.id}>
                                            {r.name}
                                        </MenuItem>
                                    )
                                )}
                        </TextField>
                        <DatePicker
                            margin="normal"
                            label="Start Date"
                            value={startDate}
                            className={classes.textField}
                            onChange={this.handleSetStartDate}
                        />
                        <TimePicker
                            margin="normal"
                            label="Start Time"
                            value={startTime}
                            className={classes.textField}
                            onChange={this.handleSetStartTime}
                        />
                        <TextField
                            id="filled-number"
                            label="Time Duration (min)"
                            value={duration}
                            onChange={this.handleChange('duration', true)}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            id="filled-number"
                            label="Student Limit"
                            value={studentLimit}
                            onChange={this.handleChange('studentLimit', true)}
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
                            onClick={this.handleCreateCourse}
                            color="primary"
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiPickersUtilsProvider>
        );
    }
}

CourseForm.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    studios: PropTypes.array.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(CourseForm);
