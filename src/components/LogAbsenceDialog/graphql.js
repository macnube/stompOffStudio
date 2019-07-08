import gql from 'graphql-tag';

import { MEDIUM_COURSE_FRAGMENT } from 'graphql';

export const GET_COURSES_BY_STUDENT = gql`
    query LogAbsenceGetCourses($id: ID!, $date: DateTime!) {
        coursesByStudent(id: $id) {
            ...MediumCourseFragment
            absences(
                where: { AND: [{ student: { id: $id } }, { date_gte: $date }] }
            ) {
                id
                date
            }
        }
    }
    ${MEDIUM_COURSE_FRAGMENT}
`;
