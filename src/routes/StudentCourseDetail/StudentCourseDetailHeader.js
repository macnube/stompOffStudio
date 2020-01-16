import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { DetailHeader } from 'components';
import { getTableTime } from 'utils/date';
import styles from './styles';

const StudentCourseDetailHeader = ({ course, classes }) => {
    const { name, duration, startTime, room, day } = course;

    const renderForm = () => (
        <form>
            <TextField
                id="standard-name"
                label="Name"
                value={name}
                className={classes.textField}
                margin="normal"
                disabled
            />
            <TextField
                id="standard-select-studio-native"
                disabled
                label="Studio"
                value={room.studio.name}
                className={classes.textField}
                margin="normal"
            />
            <TextField
                id="standard-select-studio-native"
                disabled
                label="Room"
                value={room.name}
                className={classes.textField}
                margin="normal"
            />
            <TextField
                id="standard-select-room-native"
                label="Day"
                value={day}
                className={classes.textField}
                margin="normal"
                disabled
            />
            <TextField
                id="standard-select-room-native"
                label="Start Time"
                value={getTableTime(startTime)}
                className={classes.textField}
                margin="normal"
                disabled
            />
            <TextField
                id="filled-number"
                label="Time Duration (min)"
                value={duration}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
                disabled
            />
        </form>
    );
    return <DetailHeader renderForm={renderForm} formOnly height="Children" />;
};

StudentCourseDetailHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentCourseDetailHeader);
