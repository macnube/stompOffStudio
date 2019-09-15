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
import CardWarningDialog from './CardWarningDialog';
import { PARTICIPANT_STATUS } from 'constants/gql';
import { isValidCardDate, expiresNextWeek } from 'utils/date';
import { CARD_WARNING_MESSAGE } from './constants';
import { isCardActive } from 'utils/card';

class CourseAttendance extends Component {
    state = {
        openCardDialog: false,
        openCardWarningDialog: false,
        warning: '',
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
                },
            });
            this.setState({
                cardId: card.id,
            });
        }
    }

    handleAddCardOpen = ({ id, membership: { student } }) => {
        this.setState({
            openCardDialog: true,
            studentId: student.id,
            numberOfCourses: student.memberships.length,
            participantId: id,
        });
    };

    handleClose = () => {
        this.setState({
            openCardDialog: false,
            openCardWarningDialog: false,
            warning: '',
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

    handleRemoveParticipation = async (participant, activeCard) => {
        const { removeCardParticipation } = this.props;
        try {
            if (activeCard) {
                await removeCardParticipation({
                    variables: {
                        id: activeCard.id,
                        participantId: participant.id,
                    },
                });
            }
            const recentCard = find(
                participant.membership.student.cards,
                card => isValidCardDate(card.expirationDate)
            );
            if (recentCard) {
                await removeCardParticipation({
                    variables: {
                        id: recentCard.id,
                        participantId: participant.id,
                    },
                });

                this.handleResetParticipationStatus(participant.id);
            }
        } catch (error) {
            console.log('error is: ', error);
        }

        this.handleResetParticipationStatus(participant.id);
    };

    handleParticipantClick = id => {
        const { logCardParticipation, courseInstance } = this.props;
        const participant = find(courseInstance.participants, { id });
        const cards = participant.membership.student.cards;
        const activeCard = find(cards, card => isCardActive(card));

        if (participant.status === PARTICIPANT_STATUS.PRESENT) {
            return this.handleRemoveParticipation(participant, activeCard);
        }
        if (isNil(activeCard)) {
            return this.handleAddCardOpen(participant);
        }

        if (activeCard.value === 1) {
            this.setState({
                warning: CARD_WARNING_MESSAGE.LAST_CLASS,
                openCardWarningDialog: true,
            });
        } else if (expiresNextWeek(activeCard.expirationDate)) {
            this.setState({
                warning: CARD_WARNING_MESSAGE.EXPIRES_SOON,
                openCardWarningDialog: true,
            });
        }

        logCardParticipation({
            variables: {
                id: activeCard.id,
                participantId: id,
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
        const {
            openCardDialog,
            studentId,
            numberOfCourses,
            openCardWarningDialog,
            warning,
        } = this.state;
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
                                {participant.membership.student.name}
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
                <CardWarningDialog
                    open={openCardWarningDialog}
                    message={warning}
                    handleClose={this.handleClose}
                />
            </Fragment>
        );
    }
}

CourseAttendance.propTypes = {
    courseInstance: PropTypes.object.isRequired,
    logParticipantStatus: PropTypes.func.isRequired,
    logCardParticipation: PropTypes.func.isRequired,
    removeCardParticipation: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    card: PropTypes.object,
};

export default withRouter(CourseAttendance);
