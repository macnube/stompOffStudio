import reduce from 'lodash/reduce';

export const parseCoursesToTableData = courses =>
    reduce(
        courses,
        (acc, course) => {
            const result = [course.id, course.name];
            acc.push(result);
            return acc;
        },
        []
    );
