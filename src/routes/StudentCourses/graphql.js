import gql from 'graphql-tag';

import {
    MEDIUM_COURSE_FRAGMENT,
    MEDIUM_ROOM_FRAGMENT,
    SMALL_TEACHER_FRAGMENT,
} from 'graphql';

const STUDENT_COURSES_COURSE_FRAGMENT = gql`
    fragment StudentCoursesCourseFragment on Course {
        ...MediumCourseFragment
        teachers {
            ...SmallTeacherFragment
        }
        room {
            ...MediumRoomFragment
        }
    }
    ${MEDIUM_COURSE_FRAGMENT}
    ${MEDIUM_ROOM_FRAGMENT}
    ${SMALL_TEACHER_FRAGMENT}
`;

export const GET_COURSES_BY_STUDENT = gql`
    query CourseManagementGetCourses($id: ID!) {
        coursesByStudent(id: $id) {
            ...StudentCoursesCourseFragment
        }
    }
    ${STUDENT_COURSES_COURSE_FRAGMENT}
`;
