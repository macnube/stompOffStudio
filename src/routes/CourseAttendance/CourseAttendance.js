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
import { isBeforeExpiration } from 'utils/date';
import { isCardActive } from 'utils/card';

class CourseAttendance extends Component {
    state = {
        openCardDialog: false,
        studentId: '',
        participantId: '',
        numberOfCourses: 1,
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

    handleAddCardOpen = ({ id, student }) => {
        this.setState({
            openCardDialog: true,
            studentId: student.id,
            numberOfCourses: student.courses.length,
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

    handleLogParticipationPresent = id => {
        this.props.logParticipantStatus({
            variables: {
                id,
                status: PARTICIPANT_STATUS.PRESENT,
            },
        });
    };
    handleResetParticipationStatus = id => {
        this.props.logParticipantStatus({
            variables: {
                id,
                status: PARTICIPANT_STATUS.NOT_LOGGED,
            },
        });
    };

    handleRemoveParticipation = (participant, activeCard) => {
        const { logCardParticipation } = this.props;
        if (activeCard) {
            logCardParticipation({
                variables: {
                    id: activeCard.id,
                    participantId: participant.id,
                    value: activeCard.value + 1,
                },
            });
            this.handleResetParticipationStatus(participant.id);
        }
        const recentCard = find(participant.student.cards, card =>
            isBeforeExpiration(card.expirationDate)
        );
        if (recentCard) {
            logCardParticipation({
                variables: {
                    id: recentCard.id,
                    participantId: participant.id,
                    value: recentCard.value + 1,
                },
            });
            this.handleResetParticipationStatus(participant.id);
        }
    };

    handleParticipantClick = id => {
        const { logCardParticipation, courseInstance } = this.props;
        const participant = find(courseInstance.participants, { id });
        const activeCard = find(participant.student.cards, card =>
            isCardActive(card)
        );

        if (participant.status === PARTICIPANT_STATUS.PRESENT) {
            return this.handleRemoveParticipation(participant, activeCard);
        }
        if (isNil(activeCard)) {
            return this.handleAddCardOpen(participant);
        }

        logCardParticipation({
            variables: {
                id: activeCard.id,
                participantId: id,
                value: activeCard.value - 1,
            },
        });
        this.handleLogParticipationPresent(id);
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
                                {participant.student.name}
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
    logCardParticipation: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    card: PropTypes.object,
};

export default withRouter(CourseAttendance);
