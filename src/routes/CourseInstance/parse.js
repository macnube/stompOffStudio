import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import find from 'lodash/find';
import map from 'lodash/map';

export const parseInstanceToTableData = instance => {
    const participantsWithRole = map(instance.participants, participant => {
        const role = find(instance.course.courseStudents, {
            student: { id: participant.student.id },
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
