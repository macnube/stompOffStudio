import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import map from 'lodash/map';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { TimePicker, DatePicker } from 'material-ui-pickers';
import { withStyles } from '@material-ui/core/styles';

import { COURSE_DAY, COURSE_DAYS } from 'constants/gql';
import { DetailHeader } from 'components';
import styles from './styles';

class CourseDetailHeader extends Component {
    state = {
        id: '',
        name: '',
        description: '',
        duration: 0,
        startTime: new Date(),
        studioName: '',
        roomName: '',
        startDate: new Date(),
        studentLimit: 0,
        canSave: false,
        day: COURSE_DAY.MON,
    };

    componentDidMount() {
        const { course } = this.props;
        if (course) {
            const {
                id,
                name,
                description,
                duration,
                startTime,
                room,
                startDate,
                studentLimit,
                day,
            } = course;
            this.setState({
                id,
                name,
                description,
                duration,
                startTime,
                roomName: room.name,
                studioName: room.studio.name,
                startDate,
                studentLimit,
                day,
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

    handleSave = () => {
        const {
            id,
            name,
            description,
            duration,
            startTime,
            room,
            startDate,
            studentLimit,
            day,
        } = this.state;
        this.props.handleOnSave({
            id,
            name,
            description,
            duration,
            startTime,
            room,
            startDate,
            studentLimit,
            day,
        });
        this.setState({
            canSave: false,
        });
    };

    renderForm = () => {
        const { classes } = this.props;
        const {
            name,
            description,
            duration,
            startTime,
            studioName,
            startDate,
            studentLimit,
            roomName,
            day,
        } = this.state;
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
                    label="Description"
                    value={description}
                    className={classes.textField}
                    onChange={this.handleChange('description')}
                    margin="normal"
                />
                <TextField
                    id="standard-select-studio-native"
                    disabled
                    label="Studio"
                    value={studioName}
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    id="standard-select-studio-native"
                    disabled
                    label="Room"
                    value={roomName}
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    id="standard-select-room-native"
                    select
                    label="Select Day of Week"
                    value={day}
                    className={classes.textField}
                    onChange={this.handleChange('day')}
                    margin="normal"
                >
                    {map(COURSE_DAYS, day => (
                        <MenuItem key={day} value={day}>
                            {day}
                        </MenuItem>
                    ))}
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

CourseDetailHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    handleOnSave: PropTypes.func.isRequired,
    handleOnCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(CourseDetailHeader);
