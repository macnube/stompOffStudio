import 'date-fns';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';
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
import AddInstanceDialog from './AddInstanceDialog';
import { DANCE_ROLE } from 'constants/gql';
import {
    parseTeachersToTableData,
    parseCourseStudentsToTableData,
    parseInstancesToTableData,
} from './parse';

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

const instanceColumns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Date',
    },
    {
        name: 'Topic',
    },
    {
        name: '# of Attendees',
    },
    {
        name: '# of Absentees',
    },
];

class CourseDetail extends Component {
    state = {
        openTeacherForm: false,
        openCourseLeadersForm: false,
        openCourseFollowersForm: false,
        openInstanceForm: false,
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

    renderCourseInstanceSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeleteCourseInstancesPress}
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

    handleClickAddInstanceOpen = () => {
        this.setState({ openInstanceForm: true });
    };

    handleClose = () => {
        this.setState({
            openTeacherForm: false,
            openCourseLeadersForm: false,
            openCourseFollowersForm: false,
            openInstanceForm: false,
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

    handleOnDeleteCourseInstancesPress = ids => {
        const { deleteCourseInstance } = this.props;

        forEach(ids, id => {
            deleteCourseInstance({
                variables: { id },
            });
        });
    };

    handleCreateCourseInstance = instance => {
        const { createCourseInstance, course } = this.props;
        const { topic, notes, recapUrl, date } = instance;
        createCourseInstance({
            variables: {
                topic,
                notes,
                recapUrl,
                date,
                courseId: course.id,
            },
        });
        this.handleClose();
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
        const instanceOptions = {
            ...baseOptions,
            customToolbar: () => (
                <CustomAddToolbar
                    title={'Add a Course Instance'}
                    handleAddPress={this.handleClickAddInstanceOpen}
                />
            ),
            customToolbarSelect: this.renderCourseInstanceSelectedToolbar,
        };
        const { course } = this.props;
        const {
            openTeacherForm,
            openCourseLeadersForm,
            openCourseFollowersForm,
            openInstanceForm,
        } = this.state;
        console.log('course is: ', course);
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
                            title={'Course Instances'}
                            data={parseInstancesToTableData(course.instances)}
                            columns={instanceColumns}
                            options={instanceOptions}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Leaders'}
                            data={parseCourseStudentsToTableData(
                                course.courseStudents,
                                DANCE_ROLE.LEADER
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
                                DANCE_ROLE.FOLLOWER
                            )}
                            columns={columns}
                            options={followersOptions}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Teachers'}
                            data={parseTeachersToTableData(course.teachers)}
                            columns={columns}
                            options={teacherOptions}
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
                            role={DANCE_ROLE.LEADER}
                            title="Add Students as Leader"
                        />
                    ) : null}
                    {course && course.id ? (
                        <AddStudentsToCourseForm
                            open={openCourseFollowersForm}
                            handleClose={this.handleClose}
                            courseId={course.id}
                            role={DANCE_ROLE.FOLLOWER}
                            title="Add Students as Follower"
                        />
                    ) : null}
                    {course ? (
                        <AddInstanceDialog
                            open={openInstanceForm}
                            handleClose={this.handleClose}
                            course={course}
                            handleCreate={this.handleCreateCourseInstance}
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
    createCourseInstance: PropTypes.func.isRequired,
    deleteCourseInstance: PropTypes.func.isRequired,
};

export default withRouter(CourseDetail);
