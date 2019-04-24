import 'date-fns';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';

import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import { CustomAddToolbar, SelectedDeleteToolbar } from 'components';
import CourseDetailHeader from './CourseDetailHeader';
import AddTeacherForm from './AddTeacherForm';
import AddStudentsToCourseForm from './AddStudentsToCourseForm';

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
        openTeacherForm: false,
        openCourseLeadersForm: false,
        openCourseFollowersForm: false,
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

    handleClickAddCourseLeadersOpen = () => {
        this.setState({ openCourseLeadersForm: true });
    };

    handleClickAddCourseFollowersOpen = () => {
        this.setState({ openCourseFollowersForm: true });
    };

    handleClose = () => {
        this.setState({
            openTeacherForm: false,
            openCourseLeadersForm: false,
            openCourseFollowersForm: false,
        });
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

    handleUpdateCourse = course => {
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
        } = course;

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
                    title={'Add Teacher'}
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
        const leadersOptions = {
            ...studentOptions,
            customToolbar: () => (
                <CustomAddToolbar
                    title={'Add Students'}
                    handleAddPress={this.handleClickAddCourseLeadersOpen}
                />
            ),
        };
        const followersOptions = {
            ...studentOptions,
            customToolbar: () => (
                <CustomAddToolbar
                    title={'Add Students'}
                    handleAddPress={this.handleClickAddCourseFollowersOpen}
                />
            ),
        };
        const { course } = this.props;
        const {
            openTeacherForm,
            openCourseLeadersForm,
            openCourseFollowersForm,
        } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Paper>
                    <CourseDetailHeader
                        course={course}
                        handleOnCancel={this.navigateToCourseManagement}
                        handleOnSave={this.handleUpdateCourse}
                    />

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
                            options={leadersOptions}
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
                            options={followersOptions}
                        />
                    </MuiThemeProvider>
                    {course && course.id ? (
                        <AddTeacherForm
                            open={openTeacherForm}
                            handleClose={this.handleClose}
                            courseId={course.id}
                        />
                    ) : null}
                    {course && course.id ? (
                        <AddStudentsToCourseForm
                            open={openCourseLeadersForm}
                            handleClose={this.handleClose}
                            courseId={course.id}
                            role="Leader"
                        />
                    ) : null}
                    {course && course.id ? (
                        <AddStudentsToCourseForm
                            open={openCourseFollowersForm}
                            handleClose={this.handleClose}
                            courseId={course.id}
                            role="Follower"
                        />
                    ) : null}
                </Paper>
            </MuiPickersUtilsProvider>
        );
    }
}

CourseDetail.propTypes = {
    course: PropTypes.object.isRequired,
    updateCourse: PropTypes.func.isRequired,
    removeTeacherFromCourse: PropTypes.func.isRequired,
    deleteCourseStudent: PropTypes.func.isRequired,
};

export default withRouter(CourseDetail);
