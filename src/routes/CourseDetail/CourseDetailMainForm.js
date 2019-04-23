import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TimePicker, DatePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class CourseDetailMainForm extends Component {
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
        });
        this.setState({
            canSave: false,
        });
    };

    render() {
        const { classes, handleOnCancel } = this.props;
        const {
            name,
            description,
            duration,
            startTime,
            studioName,
            startDate,
            studentLimit,
            roomName,
            canSave,
        } = this.state;
        return (
            <Grid
                container
                direction="row"
                justify="space-between"
                className={classes.formContainer}
            >
                <Grid item xs={10}>
                    <form className={classes.topForm}>
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
                </Grid>
                <Grid item xs={2}>
                    <Grid
                        container
                        spacing={16}
                        justify="flex-end"
                        className={classes.buttonContainer}
                    >
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={handleOnCancel}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!canSave}
                                onClick={this.handleSave}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

CourseDetailMainForm.propTypes = {
    classes: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    handleOnSave: PropTypes.func.isRequired,
    handleOnCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(CourseDetailMainForm);
