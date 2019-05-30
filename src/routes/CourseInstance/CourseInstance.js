import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import isNil from 'lodash/isNil';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import SelectedParticipantToolbar from './SelectedParticipantToolbar';
import CourseInstanceHeader from './CourseInstanceHeader';
import AddCourseStudentsToCourseInstanceDialog from './AddCourseStudentsToCourseInstanceDialog';
import { CardDialog, CustomAddToolbar } from '~/components';
import { parseInstanceToTableData } from './parse';
import { PARTICIPANT_STATUS } from '~/constants/gql';
import { isPastExpiration } from '~/utils/date';

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
        openAddParticipantDialog: false,
        studentId: '',
        studentName: '',
        numberOfCourses: 1,
        title: '',
        participantId: '',
        cardId: '',
    };

    componentDidUpdate() {
        const { card, logCardParticipation } = this.props;

        if (card && card.id !== this.state.cardId) {
            this.handleLogParticipationPresent(this.state.participantId);
            logCardParticipation({
                variables: {
                    id: card.id,
                    participantId: this.state.participantId,
                    value: card.value - 1,
                },
            });
            this.setState({
                cardId: card.id,
            });
        }
    }

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

    handleAddCardOpen = (student, title, participantId) => {
        this.setState({
            openCardDialog: true,
            studentId: student.id,
            studentName: student.name,
            numberOfCourses: student.courses.length,
            participantId,
            title,
        });
    };

    handleAddParticipant = () => {
        this.setState({ openAddParticipantDialog: true });
    };

    handleClose = () => {
        this.setState({
            openCardDialog: false,
            openAddParticipantDialog: false,
            studentId: '',
            studentName: '',
        });
    };

    renderParticipantSelectedToolbar = (selectedRows, displayData) => (
        <SelectedParticipantToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleLogParticipantStatus={this.handleLogParticipantStatus}
            handleDeleteParticipant={this.handleDeleteParticipant}
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

    handleLogParticipationPresent = id => {
        this.props.logParticipantStatus({
            variables: {
                id,
                status: PARTICIPANT_STATUS.PRESENT,
            },
        });
    };

    handleParticipantCardUpdate = id => {
        const {
            logParticipantStatus,
            logCardParticipation,
            courseInstance,
            deactivateCard,
        } = this.props;
        const participant = find(courseInstance.participants, { id });
        const activeCard = find(participant.student.cards, {
            active: true,
        });

        if (isNil(activeCard)) {
            const title = `No active card found - Please add a new card for ${
                participant.student.name
            }`;
            return this.handleAddCardOpen(participant.student, title, id);
        } else if (isPastExpiration(activeCard.expirationDate)) {
            deactivateCard({
                variables: { id: activeCard.id },
            });
            const title = `Card has expired - Please add a new card for ${
                participant.student.name
            }`;
            return this.handleAddCardOpen(participant.student, title, id);
        }
        logCardParticipation({
            variables: {
                id: activeCard.id,
                participantId: id,
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

    handleDeleteParticipant = id => {
        this.props.deleteParticipant({
            variables: {
                id,
            },
        });
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

    renderCustomToolbar = () => (
        <CustomAddToolbar
            title={'Add Participants'}
            handleAddPress={this.handleAddParticipant}
        />
    );

    render() {
        const options = {
            responsive: 'scroll',
            selectableRows: 'single',
            customToolbar: this.renderCustomToolbar,
            customToolbarSelect: this.renderParticipantSelectedToolbar,
            onRowClick: this.handleNavigateToStudentDetail,
        };
        const { courseInstance, createCard } = this.props;
        const {
            openAddParticipantDialog,
            openCardDialog,
            studentId,
            studentName,
            numberOfCourses,
            title,
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
                            data={parseInstanceToTableData(courseInstance)}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                    {studentName ? (
                        <CardDialog
                            title={title}
                            open={openCardDialog}
                            createCard={createCard}
                            handleClose={this.handleClose}
                            studentId={studentId}
                            numberOfCourses={numberOfCourses}
                        />
                    ) : null}
                    {courseInstance ? (
                        <AddCourseStudentsToCourseInstanceDialog
                            open={openAddParticipantDialog}
                            handleClose={this.handleClose}
                            courseInstance={courseInstance}
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
    logCardParticipation: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    deactivateCard: PropTypes.func.isRequired,
    deleteParticipant: PropTypes.func.isRequired,
    card: PropTypes.object,
};

export default withRouter(CourseInstance);
