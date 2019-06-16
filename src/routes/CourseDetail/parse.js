import filter from 'lodash/filter';
import reduce from 'lodash/reduce';
import includes from 'lodash/includes';

import {
    PARTICIPANT_STATUS,
    MEMBERSHIP_STATUS,
    DANCE_ROLE,
} from 'constants/gql';
import { getTableDate } from 'utils/date';

export const parseActiveMembershipsToTableData = (memberships, role) =>
    reduce(
        filter(
            memberships,
            membership =>
                membership.role === role &&
                membership.status === MEMBERSHIP_STATUS.ACTIVE
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

export const getNumberByRole = (participants, role) =>
    reduce(
        participants,
        (result, participant) => {
            if (
                includes(
                    [PARTICIPANT_STATUS.PRESENT, PARTICIPANT_STATUS.NOT_LOGGED],
                    participant.status
                ) &&
                participant.membership.role === role
            ) {
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
                getNumberByRole(instance.participants, DANCE_ROLE.LEADER),
                getNumberByRole(instance.participants, DANCE_ROLE.FOLLOWER),
            ];
            acc.push(result);
            return acc;
        },
        []
    );
