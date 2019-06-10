import 'date-fns';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import CourseDetailHeader from './CourseDetailHeader';
import InstancesTable from './InstancesTable';
import TeachersTable from './TeachersTable';
import StudentsTables from './StudentsTables';
import { parseTeachersToTableData } from './parse';
class CourseDetail extends Component {
    state = {
        openTeacherDialog: false,
        openCourseLeadersForm: false,
        openCourseFollowersForm: false,
        openInstanceDialog: false,
        openCourseWaitlistForm: false,
    };

    navigateToCourseManagement = () => {
        this.props.history.push({
            pathname: './courseManagement',
        });
    };

    handleOpenDialog = name => {
        this.setState({ [name]: true });
    };

    handleClose = () => {
        this.setState({
            openTeacherDialog: false,
            openCourseLeadersForm: false,
            openCourseFollowersForm: false,
            openInstanceDialog: false,
            openCourseWaitlistForm: false,
        });
    };

    handleUpdateCourse = course => {
        const { updateCourse } = this.props;

        updateCourse({
            variables: {
                ...course,
            },
        });
    };

    render() {
        const {
            course,
            createCourseInstance,
            deleteCourseInstance,
            removeTeacherFromCourse,
            createMembership,
            updateMembershipStatus,
            history,
        } = this.props;
        const {
            openTeacherDialog,
            openCourseLeadersForm,
            openInstanceDialog,
            openCourseWaitlistForm,
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
                    <InstancesTable
                        open={openInstanceDialog}
                        course={course}
                        createCourseInstance={createCourseInstance}
                        deleteCourseInstance={deleteCourseInstance}
                        handleAdd={() =>
                            this.handleOpenDialog('openInstanceDialog')
                        }
                        handleClose={this.handleClose}
                    />
                    <StudentsTables
                        openLeaders={openCourseLeadersForm}
                        openFollowers={openCourseFollowersForm}
                        openWaitlist={openCourseWaitlistForm}
                        course={course}
                        createMembership={createMembership}
                        updateMembershipStatus={updateMembershipStatus}
                        handleOpenDialog={this.handleOpenDialog}
                        handleClose={this.handleClose}
                    />
                    {course ? (
                        <TeachersTable
                            open={openTeacherDialog}
                            data={parseTeachersToTableData(course.teachers)}
                            courseId={course.id}
                            createCourseInstance={createCourseInstance}
                            removeTeacherFromCourse={removeTeacherFromCourse}
                            handleAdd={() =>
                                this.handleOpenDialog('openTeacherDialog')
                            }
                            handleClose={this.handleClose}
                            history={history}
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
    deleteMembership: PropTypes.func.isRequired,
    createCourseInstance: PropTypes.func.isRequired,
    deleteCourseInstance: PropTypes.func.isRequired,
    updateMembershipStatus: PropTypes.func.isRequired,
    createMembership: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(CourseDetail);
