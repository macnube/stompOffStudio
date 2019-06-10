import gql from 'graphql-tag';

import {
    MEDIUM_COURSE_FRAGMENT,
    MEDIUM_ROOM_FRAGMENT,
    SMALL_TEACHER_FRAGMENT,
} from 'graphql';

const COURSE_MANAGEMENT_COURSE_FRAGMENT = gql`
    fragment CourseManagementCourseFragment on Course {
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

export const GET_COURSES = gql`
    query CourseManagementGetCourses {
        courses {
            ...CourseManagementCourseFragment
        }
    }
    ${COURSE_MANAGEMENT_COURSE_FRAGMENT}
`;

export const CREATE_COURSE = gql`
    mutation CourseManagementCreateCourse(
        $name: String!
        $description: String
        $startDate: DateTime
        $startTime: String
        $duration: Int
        $studentLimit: Int
        $roomId: ID!
        $day: CourseDay
    ) {
        createCourse(
            name: $name
            description: $description
            startDate: $startDate
            startTime: $startTime
            duration: $duration
            studentLimit: $studentLimit
            roomId: $roomId
            day: $day
        ) {
            ...CourseManagementCourseFragment
        }
    }
    ${COURSE_MANAGEMENT_COURSE_FRAGMENT}
`;

export const DELETE_COURSE = gql`
    mutation CourseManagementDeleteCourse($id: ID!) {
        deleteCourse(id: $id) {
            id
            name
        }
    }
`;
