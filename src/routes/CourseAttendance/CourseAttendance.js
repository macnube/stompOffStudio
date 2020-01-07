import 'date-fns';
import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import map from 'lodash/map';
import filter from 'lodash/filter';
import isNil from 'lodash/isNil';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import NewCardDialog from './NewCardDialog';
import CardWarningDialog from './CardWarningDialog';
import { PARTICIPANT_STATUS, MEMBERSHIP_STATUS } from 'constants/gql';
import { isValidCardDate, expiresNextWeek } from 'utils/date';
import { CARD_WARNING_MESSAGE } from './constants';
import { isCardActive } from 'utils/card';

const CourseAttendance = ({
    card,
    logCardParticipation,
    logParticipantStatus,
    removeCardParticipation,
    createCard,
    courseInstance,
}) => {
    const [openCardDialog, setOpenCardDialog] = useState(false);
    const [openCardWarningDialog, setOpenCardWarningDialog] = useState(false);
    const [warning, setWarning] = useState('');
    const [studentId, setStudentId] = useState('');
    const [participantId, setParticipantId] = useState('');
    const [numberOfCourses, setNumberOfCourses] = useState(1);
    const [cardId, setCardId] = useState('');

    const handleLogParticipationPresent = id =>
        logParticipantStatus({
            variables: {
                id,
                status: PARTICIPANT_STATUS.PRESENT,
            },
        });

    const handleAttendanceOfNewCard = () => {
        if (card && card.id !== cardId) {
            handleLogParticipationPresent(participantId);
            logCardParticipation({
                variables: {
                    id: card.id,
                    participantId: participantId,
                },
            });
            setCardId(card.id);
        }
    };

    useEffect(handleAttendanceOfNewCard, [card]);

    const handleAddCardOpen = ({ id, membership: { student } }) => {
        const numberOfCourses = filter(
            student.memberships,
            membership => membership.status === MEMBERSHIP_STATUS.ACTIVE
        ).length;

        setOpenCardDialog(true);
        setStudentId(student.id);
        setNumberOfCourses(numberOfCourses);
        setParticipantId(id);
    };

    const handleClose = () => {
        setOpenCardDialog(false);
        setOpenCardWarningDialog(false);
        setWarning('');
        setStudentId('');
    };

    const getColor = participant => {
        if (participant.status === PARTICIPANT_STATUS.PRESENT) {
            return 'primary';
        } else if (participant.status === PARTICIPANT_STATUS.ABSENT) {
            return 'secondary';
        }
        return 'default';
    };

    const handleResetParticipationStatus = id => {
        logParticipantStatus({
            variables: {
                id,
                status: PARTICIPANT_STATUS.NOT_LOGGED,
            },
        });
    };

    const handleRemoveParticipation = async (participant, activeCard) => {
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

                handleResetParticipationStatus(participant.id);
            }
        } catch (error) {
            console.log('error is: ', error);
        }

        handleResetParticipationStatus(participant.id);
    };

    const handleParticipantClick = id => {
        const participant = find(courseInstance.participants, { id });
        const cards = participant.membership.student.cards;
        const activeCard = find(cards, card => isCardActive(card));
        if (participant.status === PARTICIPANT_STATUS.PRESENT) {
            return handleRemoveParticipation(participant, activeCard);
        }
        if (isNil(activeCard)) {
            return handleAddCardOpen(participant);
        }

        if (activeCard.value === 1) {
            setWarning(CARD_WARNING_MESSAGE.LAST_CLASS);
            setOpenCardWarningDialog(true);
        } else if (expiresNextWeek(activeCard.expirationDate)) {
            setWarning(CARD_WARNING_MESSAGE.EXPIRES_SOON);
            setOpenCardWarningDialog(true);
        }
        logCardParticipation({
            variables: {
                id: activeCard.id,
                participantId: id,
            },
        });
        handleLogParticipationPresent(id);
    };

    const handleCreateCard = (value, startDate) => {
        createCard({
            variables: {
                value,
                startDate,
                studentId,
            },
        });
        handleClose();
    };

    const handleDropIn = () => {
        handleLogParticipationPresent(participantId);
        handleClose();
    };

    return (
        <Fragment>
            <Grid container spacing={24}>
                {map(courseInstance.participants, participant => (
                    <Grid item xs={12} sm={6} md={3} key={participant.id}>
                        <Button
                            variant="contained"
                            color={getColor(participant)}
                            onClick={() =>
                                handleParticipantClick(participant.id)
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
                    handleCreate={handleCreateCard}
                    handleDropIn={handleDropIn}
                    handleClose={handleClose}
                    numberOfCourses={numberOfCourses}
                    studentId={studentId}
                />
            ) : null}
            {warning ? (
                <CardWarningDialog
                    open={openCardWarningDialog}
                    message={warning}
                    handleClose={handleClose}
                />
            ) : null}
        </Fragment>
    );
};

CourseAttendance.propTypes = {
    courseInstance: PropTypes.object.isRequired,
    logParticipantStatus: PropTypes.func.isRequired,
    logCardParticipation: PropTypes.func.isRequired,
    removeCardParticipation: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    card: PropTypes.object,
};

export default withRouter(CourseAttendance);
