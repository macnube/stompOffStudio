import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import isNil from 'lodash/isNil';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MUIDataTable from 'mui-datatables';
import DateFnsUtils from '@date-io/date-fns';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import SelectedParticipantToolbar from './SelectedParticipantToolbar';
import CourseInstanceHeader from './CourseInstanceHeader';
import AddMembershipsToCourseInstanceDialog from './AddMembershipsToCourseInstanceDialog';
import { CardDialog, CustomAddToolbar } from 'components';
import { parseParticipantsToTableData } from './parse';
import { PARTICIPANT_STATUS } from 'constants/gql';
import { isPastExpiration } from 'utils/date';
import styles from './styles';

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

    handleAddCardOpen = (student, title, participantId) => {
        this.setState({
            openCardDialog: true,
            studentId: student.id,
            studentName: student.name,
            numberOfCourses: student.memberships.length,
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
        const student = find(courseInstance.participants, { id }).membership
            .student;
        const activeCard = find(student.cards, {
            active: true,
        });

        if (isNil(activeCard)) {
            const title = `No active card found - Please add a new card for ${
                student.name
            }`;
            return this.handleAddCardOpen(student, title, id);
        } else if (isPastExpiration(activeCard.expirationDate)) {
            deactivateCard({
                variables: { id: activeCard.id },
            });
            const title = `Card has expired - Please add a new card for ${
                student.name
            }`;
            return this.handleAddCardOpen(student, title, id);
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
        const { courseInstance, createCard, classes } = this.props;
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
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <CourseInstanceHeader
                            courseInstance={courseInstance}
                            handleOnCancel={this.navigateToCourseDetail}
                            handleOnSave={this.handleUpdateCourseInstance}
                            handleNavigateToCourseAttendance={
                                this.handleNavigateToCourseAttendance
                            }
                        />
                        <Grid item xs={12}>
                            <MUIDataTable
                                title={'Participants'}
                                data={parseParticipantsToTableData(
                                    courseInstance.participants
                                )}
                                columns={columns}
                                options={options}
                            />
                        </Grid>
                    </Grid>
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
                        <AddMembershipsToCourseInstanceDialog
                            open={openAddParticipantDialog}
                            handleClose={this.handleClose}
                            courseInstance={courseInstance}
                        />
                    ) : null}
                </Container>
            </MuiPickersUtilsProvider>
        );
    }
}

CourseInstance.propTypes = {
    classes: PropTypes.object.isRequired,
    courseInstance: PropTypes.object.isRequired,
    updateCourseInstance: PropTypes.func.isRequired,
    logParticipantStatus: PropTypes.func.isRequired,
    logCardParticipation: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    deactivateCard: PropTypes.func.isRequired,
    deleteParticipant: PropTypes.func.isRequired,
    card: PropTypes.object,
};

export default compose(
    withStyles(styles),
    withRouter
)(CourseInstance);
