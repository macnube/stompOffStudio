import 'date-fns';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import SelectedAddParticipantToolbar from './SelectedAddParticipantToolbar';
import CourseInstanceHeader from './CourseInstanceHeader';
import { CardDialog } from 'components';
import { parseParticipantsToTableData } from './parse';
import { PARTICIPANT_STATUS } from 'constants/gql';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Student ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Name',
    },
    {
        name: 'Email',
    },
    {
        name: 'Role',
    },
    {
        name: 'Status',
    },
];

class CourseInstance extends Component {
    state = {
        openCardDialog: false,
        studentId: '',
        studentName: '',
        numberOfCourses: 1,
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

    handleAddCardOpen = student => {
        this.setState({
            openCardDialog: true,
            studentId: student.id,
            studentName: student.name,
            numberOfCourses: student.courses.length,
        });
    };

    handleClose = () => {
        this.setState({
            openCardDialog: false,
            studentId: '',
            studentName: '',
        });
    };

    renderParticipantSelectedToolbar = (selectedRows, displayData) => (
        <SelectedAddParticipantToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleLogParticipantStatus={this.handleLogParticipantStatus}
        />
    );

    navigateToCourseDetail = () => {
        this.props.history.push({
            pathname: './courseDetail',
            search: `id=${this.props.courseInstance.course.id}`,
        });
    };

    navigateToStudentDetail = id => {
        this.props.history.push({
            pathname: './studentDetail',
            search: `id=${id}`,
        });
    };

    navigateToCourseAttendance = id => {
        this.props.history.push({
            pathname: './courseAttendance',
            search: `id=${id}`,
        });
    };

    handleNavigateToCourseAttendance = () =>
        this.navigateToCourseAttendance(this.props.courseInstance.id);

    handleParticipantCardUpdate = id => {
        const {
            logParticipantStatus,
            logCardUsage,
            courseInstance,
        } = this.props;
        const participant = find(courseInstance.participants, { id });
        const activeCard = find(participant.courseStudent.student.cards, {
            active: true,
        });

        if (isNil(activeCard)) {
            return this.handleAddCardOpen(participant.courseStudent.student);
        }
        logCardUsage({
            variables: {
                id: activeCard.id,
                courseInstanceId: courseInstance.id,
                value: activeCard.value - 1,
            },
        });
        logParticipantStatus({
            variables: {
                id,
                status: PARTICIPANT_STATUS.PRESENT,
            },
        });
    };

    handleLogParticipantStatus = status => id => {
        const { logParticipantStatus } = this.props;

        if (status === PARTICIPANT_STATUS.PRESENT) {
            this.handleParticipantCardUpdate(id);
        } else {
            logParticipantStatus({
                variables: {
                    id,
                    status,
                },
            });
        }
    };

    handleNavigateToStudentDetail = rowData =>
        this.navigateToStudentDetail(rowData[1]);

    handleUpdateCourseInstance = courseInstance => {
        const { updateCourseInstance } = this.props;
        const { id, topic, notes, recapUrl, date } = courseInstance;

        updateCourseInstance({
            variables: {
                id,
                topic,
                notes,
                recapUrl,
                date,
            },
        });
    };

    render() {
        const options = {
            responsive: 'scroll',
            selectableRows: 'single',
            customToolbarSelect: this.renderParticipantSelectedToolbar,
            onRowClick: this.handleNavigateToStudentDetail,
        };
        const { courseInstance, createCard } = this.props;
        const {
            openCardDialog,
            studentId,
            studentName,
            numberOfCourses,
        } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Paper>
                    <CourseInstanceHeader
                        courseInstance={courseInstance}
                        handleOnCancel={this.navigateToCourseDetail}
                        handleOnSave={this.handleUpdateCourseInstance}
                        handleNavigateToCourseAttendance={
                            this.handleNavigateToCourseAttendance
                        }
                    />
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Participants'}
                            data={parseParticipantsToTableData(
                                courseInstance.participants
                            )}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                    {studentName ? (
                        <CardDialog
                            title={`No active card found - Please add a new card for ${studentName}`}
                            open={openCardDialog}
                            createCard={createCard}
                            handleClose={this.handleClose}
                            studentId={studentId}
                            numberOfCourses={numberOfCourses}
                        />
                    ) : null}
                </Paper>
            </MuiPickersUtilsProvider>
        );
    }
}

CourseInstance.propTypes = {
    courseInstance: PropTypes.object.isRequired,
    updateCourseInstance: PropTypes.func.isRequired,
    logParticipantStatus: PropTypes.func.isRequired,
    logCardUsage: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
};

export default withRouter(CourseInstance);
