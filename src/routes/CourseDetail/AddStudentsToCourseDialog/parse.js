import reduce from 'lodash/reduce';
import some from 'lodash/some';

export const parseStudentsToTableData = (students, courseId) =>
    reduce(
        students,
        (acc, student) => {
            if (some(student.memberships, { course: { id: courseId } })) {
                return acc;
            }
            const { id, name, email } = student;
            const result = [id, name, email];
            acc.push(result);
            return acc;
        },
        []
    );
