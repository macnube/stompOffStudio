import gql from 'graphql-tag';

import { SMALL_TEACHER_FRAGMENT, SMALL_COURSE_FRAGMENT } from 'graphql';

export const GET_TEACHERS = gql`
    query CourseDetailGetTeachers {
        teachers {
            ...SmallTeacherFragment
        }
    }
    ${SMALL_TEACHER_FRAGMENT}
`;

export const ADD_TEACHER_TO_COURSE = gql`
    mutation CourseDetailAddTeacherToCourse($id: ID!, $teacherId: ID!) {
        addTeacherToCourse(id: $id, teacherId: $teacherId) {
            ...SmallCourseFragment
            teachers {
                ...SmallTeacherFragment
            }
        }
    }
    ${SMALL_TEACHER_FRAGMENT}
    ${SMALL_COURSE_FRAGMENT}
`;
