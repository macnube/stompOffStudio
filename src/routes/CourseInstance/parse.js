import reduce from 'lodash/reduce';
import find from 'lodash/find';
import map from 'lodash/map';

export const parseInstanceToTableData = instance => {
    const participantsWithRole = map(instance.participants, participant => {
        const role = find(participant.student.memberships, {
            course: { id: instance.course.id },
        }).role;
        return { ...participant, role };
    });

    return reduce(
        participantsWithRole,
        (acc, participant) => {
            const result = [
                participant.id,
                participant.student.id,
                participant.student.name,
                participant.student.email,
                participant.role,
                participant.status,
            ];
            acc.push(result);
            return acc;
        },
        []
    );
};
