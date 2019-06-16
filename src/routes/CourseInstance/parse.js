import reduce from 'lodash/reduce';

export const parseParticipantsToTableData = participants => {
    return reduce(
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
};
