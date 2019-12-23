import 'date-fns';
import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import CourseDetailHeader from './CourseDetailHeader';
import InstancesTable from './InstancesTable';
import TeachersTable from './TeachersTable';
import StudentsTables from './StudentsTables';
import ErrorDialog from './ErrorDialog';
import { parseTeachersToTableData } from './parse';
import styles from './styles';

class CourseDetail extends Component {
    state = {
        openTeacherDialog: false,
        openCourseLeadersForm: false,
        openCourseFollowersForm: false,
        openInstanceDialog: false,
        openCourseWaitlistForm: false,
        openErrorDialog: false,
        errorMessage: '',
    };

    navigateToCourseManagement = () => {
        this.props.history.push({
            pathname: './courseManagement',
        });
    };

    handleOpenDialog = name => {
        this.setState({ [name]: true });
    };

    handleOnError = message => {
        this.setState({
            openErrorDialog: true,
            errorMessage: message,
        });
    };

    handleClose = () => {
        this.setState({
            openTeacherDialog: false,
            openCourseLeadersForm: false,
            openCourseFollowersForm: false,
            openInstanceDialog: false,
            openCourseWaitlistForm: false,
            openErrorDialog: false,
            errorMessage: '',
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
            cancelCourseInstance,
            removeTeacherFromCourse,
            createMembership,
            updateMembershipStatus,
            history,
            classes,
        } = this.props;
        const {
            openTeacherDialog,
            openCourseLeadersForm,
            openInstanceDialog,
            openCourseWaitlistForm,
            openCourseFollowersForm,
            openErrorDialog,
            openCancelInstanceDialog,
            errorMessage,
        } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <CourseDetailHeader
                            course={course}
                            handleOnCancel={this.navigateToCourseManagement}
                            handleOnSave={this.handleUpdateCourse}
                        />
                        <Grid item xs={12}>
                            <InstancesTable
                                open={openInstanceDialog}
                                openCancelInstance={openCancelInstanceDialog}
                                handleOnError={this.handleOnError}
                                course={course}
                                createCourseInstance={createCourseInstance}
                                deleteCourseInstance={deleteCourseInstance}
                                cancelCourseInstance={cancelCourseInstance}
                                handleAdd={() =>
                                    this.handleOpenDialog('openInstanceDialog')
                                }
                                handleClose={this.handleClose}
                            />
                        </Grid>
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
                        <Grid item xs={12}>
                            {course ? (
                                <TeachersTable
                                    open={openTeacherDialog}
                                    data={parseTeachersToTableData(
                                        course.teachers
                                    )}
                                    courseId={course.id}
                                    createCourseInstance={createCourseInstance}
                                    removeTeacherFromCourse={
                                        removeTeacherFromCourse
                                    }
                                    handleAdd={() =>
                                        this.handleOpenDialog(
                                            'openTeacherDialog'
                                        )
                                    }
                                    handleClose={this.handleClose}
                                    history={history}
                                />
                            ) : null}
                        </Grid>
                    </Grid>
                    {errorMessage ? (
                        <ErrorDialog
                            open={openErrorDialog}
                            message={errorMessage}
                            handleOnClose={this.handleClose}
                        />
                    ) : null}
                </Container>
            </MuiPickersUtilsProvider>
        );
    }
}

CourseDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    updateCourse: PropTypes.func.isRequired,
    removeTeacherFromCourse: PropTypes.func.isRequired,
    deleteMembership: PropTypes.func.isRequired,
    createCourseInstance: PropTypes.func.isRequired,
    cancelCourseInstance: PropTypes.func.isRequired,
    deleteCourseInstance: PropTypes.func.isRequired,
    updateMembershipStatus: PropTypes.func.isRequired,
    createMembership: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    withRouter
)(CourseDetail);
