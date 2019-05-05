import 'date-fns';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import NewCardDialog from './NewCardDialog';
import { PARTICIPANT_STATUS } from 'constants/gql';

class CourseAttendance extends Component {
    state = {
        openCardDialog: false,
        studentId: '',
        participantId: '',
        numberOfCourses: 1,
    };

    handleAddCardOpen = ({ id, courseStudent }) => {
        this.setState({
            openCardDialog: true,
            studentId: courseStudent.student.id,
            numberOfCourses: courseStudent.student.courses.length,
            participantId: id,
        });
    };

    handleClose = () => {
        this.setState({
            openCardDialog: false,
            studentId: '',
            studentName: '',
        });
    };

    getColor = participant => {
        if (participant.status === PARTICIPANT_STATUS.PRESENT) {
            return 'primary';
        } else if (participant.status === PARTICIPANT_STATUS.ABSENT) {
            return 'secondary';
        }
        return 'default';
    };

    handleLogParticipationStatus = id => {
        this.props.logParticipantStatus({
            variables: {
                id,
                status: PARTICIPANT_STATUS.PRESENT,
            },
        });
    };

    handleParticipantClick = id => {
        const { logCardUsage, courseInstance } = this.props;
        const participant = find(courseInstance.participants, { id });
        const activeCard = find(participant.courseStudent.student.cards, {
            active: true,
        });

        if (isNil(activeCard)) {
            return this.handleAddCardOpen(participant);
        }
        logCardUsage({
            variables: {
                id: activeCard.id,
                courseInstanceId: courseInstance.id,
                value: activeCard.value - 1,
            },
        });
        this.handleLogParticipationStatus(id);
    };

    handleCreateCard = (value, expirationDate) => {
        const { createCard } = this.props;
        createCard({
            variables: {
                value,
                expirationDate,
                studentId: this.state.studentId,
            },
        });
        this.handleLogParticipationStatus(this.state.participantId);
        this.handleClose();
    };

    render() {
        const { courseInstance } = this.props;
        const { openCardDialog, studentId, numberOfCourses } = this.state;
        return (
            <Fragment>
                <Grid container spacing={24}>
                    {map(courseInstance.participants, participant => (
                        <Grid item xs={12} sm={6} md={3} key={participant.id}>
                            <Button
                                variant="contained"
                                color={this.getColor(participant)}
                                onClick={() =>
                                    this.handleParticipantClick(participant.id)
                                }
                            >
                                {participant.courseStudent.student.name}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
                {studentId ? (
                    <NewCardDialog
                        open={openCardDialog}
                        handleCreate={this.handleCreateCard}
                        handleClose={this.handleClose}
                        numberOfCourses={numberOfCourses}
                        studentId={studentId}
                    />
                ) : null}
            </Fragment>
        );
    }
}

CourseAttendance.propTypes = {
    courseInstance: PropTypes.object.isRequired,
    logParticipantStatus: PropTypes.func.isRequired,
    logCardUsage: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
};

export default withRouter(CourseAttendance);
