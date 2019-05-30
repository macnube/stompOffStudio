import reduce from 'lodash/reduce';
import includes from 'lodash/includes';

import { PARTICIPANT_STATUS, DANCE_ROLE } from 'src/constants/gql';
import { getTableDate } from 'src/utils/date';

const getAbsentParticipantStudentIds = participants =>
    reduce(
        participants,
        (result, participant) => {
            if (participant.status === PARTICIPANT_STATUS.ABSENT) {
                result.push(participant.student.id);
                return result;
            }
            return result;
        },
        []
    );

const getRoleCount = (instance, role) => {
    const absentStudentIds = getAbsentParticipantStudentIds(
        instance.participants
    );
    return reduce(
        instance.course.courseStudents,
        (result, courseStudent) => {
            if (
                courseStudent.role === role &&
                !includes(absentStudentIds, courseStudent.student.id)
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
            const result = [
                card.student.id,
                card.student.name,
                card.originalValue,
                getTableDate(card.expirationDate),
                card.value,
            ];
            acc.push(result);
            return acc;
        },
        []
    );
