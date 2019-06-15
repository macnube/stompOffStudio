import reduce from 'lodash/reduce';
import includes from 'lodash/includes';
import map from 'lodash/map';

export const parseMembershipsToTableData = (memberships, courseInstance) => {
    const currentParticipantStudentIds = map(
        courseInstance.participants,
        participant => participant.student.id
    );
    return reduce(
        memberships,
        (acc, membership) => {
            if (includes(currentParticipantStudentIds, membership.student.id)) {
                return acc;
            }
            const { id, name, email } = membership.student;
            const result = [id, name, email];
            acc.push(result);
            return acc;
        },
        []
    );
};
