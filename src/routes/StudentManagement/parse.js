import map from 'lodash/map';
import reduce from 'lodash/reduce';
import find from 'lodash/find';

const getActiveCard = cards => find(cards, card => card.active);

export const parseStudentsToTableData = students =>
    reduce(
        students,
        (acc, student) => {
            const courseNames = map(
                student.memberships,
                membership => membership.course.name
            ).join(', ');
            const activeCard = getActiveCard(student.cards);
            const result = [
                student.id,
                student.name,
                student.email,
                student.mobile,
                activeCard ? 'Active' : 'Inactive',
                courseNames,
            ];
            acc.push(result);
            return acc;
        },
        []
    );
