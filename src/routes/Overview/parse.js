import reduce from 'lodash/reduce';
import map from 'lodash/map';
import includes from 'lodash/includes';
import filter from 'lodash/filter';

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
    const nonAbsentCourseStudents = filter(
        instance.course.courseStudents,
        courseStudent => !includes(absentCourseStudentIds, courseStudent.id)
    );
    console.log('nonAbsentCourseStudents are: ', nonAbsentCourseStudents);
    return reduce(
        nonAbsentCourseStudents,
        (result, courseStudent) => {
            if (courseStudent.role === role) {
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
            const uses =
                card.useHistory && card.useHistory.length
                    ? card.useHistory.length
                    : 0;
            const result = [
                card.id,
                card.validCount,
                getTableDate(card.expirationDate),
                card.validCount - uses,
                toString(card.active),
                toString(!!card.payment),
            ];
            acc.push(result);
            return acc;
        },
        []
    );
