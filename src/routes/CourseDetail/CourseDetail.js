import 'date-fns';
import React, { Component } from 'react';
import toNumber from 'lodash/toNumber';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker,
} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import styles from './styles';
import {
    ContentToolbar,
    CustomAddToolbar,
    SelectedDeleteToolbar,
} from 'components';
import AddTeacherForm from './AddTeacherForm';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Name',
    },
    {
        name: 'email',
    },
];

const parseCourseStudentsToTableData = courseStudents =>
    reduce(
        courseStudents,
        (acc, student) => {
            const result = [student.id, student.name, student.email];
            acc.push(result);
            return acc;
        },
        []
    );

const parseTeachersToTableData = teachers =>
    reduce(
        teachers,
        (acc, teacher) => {
            const result = [teacher.id, teacher.name, teacher.email];
            acc.push(result);
            return acc;
        },
        []
    );

class CourseDetail extends Component {
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
        openTeacherForm: false,
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

    getMuiTheme = () =>
        createMuiTheme({
            overrides: {
                MuiPaper: {
                    elevation4: {
                        boxShadow: '0 0 0 0',
                    },
                },
            },
        });

    navigateToCourseManagement = () => {
        this.props.history.push({
            pathname: './courseManagement',
        });
    };

    navigateToTeacherDetail = () => {
        this.props.history.push({
            pathname: './teacherManagement',
        });
    };

    renderTeacherSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeleteTeachersPress}
        />
    );

    handleClickAddTeacherOpen = () => {
        this.setState({ openTeacherForm: true });
    };

    handleClose = () => {
        this.setState({ openTeacherForm: false });
    };

    handleOnDeleteTeachersPress = ids => {
        const { removeTeacherFromCourse } = this.props;

        forEach(ids, teacherId => {
            removeTeacherFromCourse({
                variables: { id: this.state.id, teacherId },
            });
        });
    };

    render() {
        const baseOptions = {
            responsive: 'scroll',
        };
        const teacherOptions = {
            ...baseOptions,
            onRowClick: this.navigateToTeacherDetail,
            customToolbar: () => (
                <CustomAddToolbar
                    title={'Add Room'}
                    handleAddPress={this.handleClickAddTeacherOpen}
                />
            ),
            customToolbarSelect: this.renderTeacherSelectedToolbar,
        };
        const { classes, course } = this.props;
        const {
            id,
            name,
            description,
            duration,
            startTime,
            roomName,
            studioName,
            startDate,
            studentLimit,
            canSave,
            openTeacherForm,
        } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ContentToolbar>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={this.navigateToCourseManagement}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={!canSave}
                        onClick={this.handleUpdateStudio}
                    >
                        Save
                    </Button>
                </ContentToolbar>
                <Paper>
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
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Teachers'}
                            data={parseTeachersToTableData(course.teachers)}
                            columns={columns}
                            options={teacherOptions}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Leaders'}
                            data={parseCourseStudentsToTableData(
                                course.courseStudents
                            )}
                            columns={columns}
                            options={baseOptions}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Followers'}
                            data={parseCourseStudentsToTableData(
                                course.courseStudents
                            )}
                            columns={columns}
                            options={baseOptions}
                        />
                    </MuiThemeProvider>
                    <AddTeacherForm
                        open={openTeacherForm}
                        handleClose={this.handleClose}
                        courseId={id}
                    />
                </Paper>
            </MuiPickersUtilsProvider>
        );
    }
}

CourseDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    updateCourse: PropTypes.func.isRequired,
    removeTeacherFromCourse: PropTypes.func.isRequired,
};

export default withStyles(styles)(CourseDetail);
