import reduce from 'lodash/reduce';
import includes from 'lodash/includes';

import { PARTICIPANT_STATUS, DANCE_ROLE } from 'constants/gql';
import { getTableDate } from 'utils/date';

const getAbsentParticipantCourseIds = participants =>
    reduce(
        participants,
        (result, participant) => {
            if (participant.status === PARTICIPANT_STATUS.ABSENT) {
                result.push(participant.courseStudent.id);
                return result;
            }
            return result;
        },
        []
    );

const getRoleCount = (instance, role) => {
    const absentCourseStudentIds = getAbsentParticipantCourseIds(
        instance.participants
    );
    return reduce(
        instance.course.courseStudents,
        (result, courseStudent) => {
            if (
                courseStudent.role === role &&
                !includes(absentCourseStudentIds, courseStudent.id)
            ) {
                return ++result;
            }
            return result;
        },
        0
    );
};

export const parseInstancesToTableData = instances =>
    reduce(
        instances,
        (acc, instance) => {
            const result = [
                instance.id,
                getTableDate(instance.date),
                instance.course.name,
                instance.topic,
                getRoleCount(instance, DANCE_ROLE.LEADER),
                getRoleCount(instance, DANCE_ROLE.FOLLOWER),
            ];
            acc.push(result);
            return acc;
        },
        []
    );

export const parseCardsToTableData = cards =>
    reduce(
        cards,
        (acc, card) => {
            if (card.paid) {
                return acc;
            }
            const uses =
                card.useHistory && card.useHistory.length
                    ? card.useHistory.length
                    : 0;
            const result = [
                card.student.id,
                card.student.name,
                card.value,
                getTableDate(card.expirationDate),
                card.value - uses,
            ];
            acc.push(result);
            return acc;
        },
        []
    );
