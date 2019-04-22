import 'date-fns';
import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import toNumber from 'lodash/toNumber';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import filter from 'lodash/filter';
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

const parseCourseStudentsToTableData = (courseStudents, role) =>
    reduce(
        filter(courseStudents, courseStudent => courseStudent.role === role),
        (acc, courseStudent) => {
            const { name, email } = courseStudent.student;
            const result = [courseStudent.id, name, email];
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

    navigateToTeacherManagement = () => {
        this.props.history.push({
            pathname: './teacherManagement',
        });
    };

    navigateToStudentDetail = student => {
        this.props.history.push({
            pathname: './studentDetail',
            search: `id=${student.id}`,
        });
    };

    handleNavigateToStudentDetail = rowData => {
        const { course } = this.props;
        const courseStudent = find(course.courseStudents, {
            id: rowData[0],
        });
        this.navigateToStudentDetail(courseStudent.student);
    };

    renderTeacherSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeleteTeachersPress}
        />
    );

    renderCourseStudentSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeleteCourseStudentsPress}
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

    handleOnDeleteCourseStudentsPress = ids => {
        const { deleteCourseStudent } = this.props;

        forEach(ids, id => {
            deleteCourseStudent({
                variables: { id },
            });
        });
    };

    handleUpdateCourse = () => {
        const { updateCourse } = this.props;
        const {
            id,
            name,
            description,
            duration,
            startTime,
            studioName,
            startDate,
            studentLimit,
        } = this.state;

        updateCourse({
            variables: {
                id,
                name,
                description,
                duration,
                startTime,
                studioName,
                startDate,
                studentLimit,
            },
        });
    };

    render() {
        const baseOptions = {
            responsive: 'scroll',
        };
        const teacherOptions = {
            ...baseOptions,
            onRowClick: this.navigateToTeacherManagement,
            customToolbar: () => (
                <CustomAddToolbar
                    title={'Add Room'}
                    handleAddPress={this.handleClickAddTeacherOpen}
                />
            ),
            customToolbarSelect: this.renderTeacherSelectedToolbar,
        };
        const studentOptions = {
            ...baseOptions,
            onRowClick: this.handleNavigateToStudentDetail,
            customToolbarSelect: this.renderCourseStudentSelectedToolbar,
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
                        onClick={this.handleUpdateCourse}
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
                                course.courseStudents,
                                'Leader'
                            )}
                            columns={columns}
                            options={studentOptions}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Followers'}
                            data={parseCourseStudentsToTableData(
                                course.courseStudents,
                                'Follower'
                            )}
                            columns={columns}
                            options={studentOptions}
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
    deleteCourseStudent: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(CourseDetail);
