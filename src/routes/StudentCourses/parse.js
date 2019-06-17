import reduce from 'lodash/reduce';
import map from 'lodash/map';

export const parseCoursesToTableData = courses =>
    reduce(
        courses,
        (acc, course) => {
            const teacherNames = map(
                course.teachers,
                teacher => teacher.name
            ).join(', ');
            const result = [
                course.id,
                course.name,
                course.room.studio.name,
                course.room.name,
                teacherNames,
                course.day ? course.day : '',
            ];
            acc.push(result);
            return acc;
        },
        []
    );
