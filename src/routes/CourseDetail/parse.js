import filter from 'lodash/filter';
import reduce from 'lodash/reduce';

import { PARTICIPANT_STATUS, COURSE_STUDENT_STATUS } from 'constants/gql';
import { getTableDate } from 'utils/date';

export const parseActiveMembershipsToTableData = (memberships, role) =>
    reduce(
        filter(
            memberships,
            membership =>
                membership.role === role &&
                membership.status === COURSE_STUDENT_STATUS.ACTIVE
        ),
        (acc, membership) => {
            const { name, email, id } = membership.student;
            const result = [membership.id, id, name, email];
            acc.push(result);
            return acc;
        },
        []
    );

export const parseMembershipsByStatusToTableData = (memberships, status) =>
    reduce(
        filter(memberships, membership => membership.status === status),
        (acc, membership) => {
            const { name, email, id } = membership.student;
            const result = [
                membership.id,
                id,
                name,
                email,
                membership.waitlistDate
                    ? getTableDate(membership.waitlistDate)
                    : '',
            ];
            acc.push(result);
            return acc;
        },
        []
    );

export const parseTeachersToTableData = teachers =>
    reduce(
        teachers,
        (acc, teacher) => {
            const result = [teacher.id, teacher.name, teacher.email];
            acc.push(result);
            return acc;
        },
        []
    );

const getNumberOfParticipants = (participants, status) =>
    reduce(
        participants,
        (result, participant) => {
            if (participant.status === status) {
                return ++result;
            }
            return result;
        },
        0
    );

export const parseInstancesToTableData = instances =>
    reduce(
        instances,
        (acc, instance) => {
            const result = [
                instance.id,
                getTableDate(instance.date),
                instance.topic,
                getNumberOfParticipants(
                    instance.participants,
                    PARTICIPANT_STATUS.PRESENT
                ),
                getNumberOfParticipants(
                    instance.participants,
                    PARTICIPANT_STATUS.ABSENT
                ),
            ];
            acc.push(result);
            return acc;
        },
        []
    );
