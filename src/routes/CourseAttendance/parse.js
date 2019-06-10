import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';

import { PARTICIPANT_STATUS } from 'contants/gql';

export const parseMembershipsToTableData = (
    memberships,
    participantMembershipIds
) =>
    reduce(
        filter(
            memberships,
            membership => !includes(participantMembershipIds, membership.id)
        ),
        (acc, membership) => {
            const result = [
                membership.id,
                membership.student.name,
                membership.student.email,
                membership.role,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

export const parseParticipantsToTableData = participants =>
    reduce(
        participants,
        (acc, participant) => {
            const result = [
                participant.id,
                participant.membership.student.id,
                participant.membership.student.name,
                participant.membership.student.email,
                participant.membership.role,
                participant.status,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

export const getCourseInstanceStudents = courseInstance => {
    const absentMembershipIds = [];
    const presentMembershipIds = [];
    forEach(courseInstance.participants, participant => {
        if (participant.status === PARTICIPANT_STATUS.ABSENT) {
            absentMembershipIds.push(participant.membership.id);
        } else if (participant.status === PARTICIPANT_STATUS.PRESENT) {
            presentMembershipIds.push(participant.membership.id);
        }
    });
    return reduce(
        courseInstance.course.memberships,
        (result, membership) => {},
        []
    );
};
