import gql from 'graphql-tag';

import {
    LARGE_COURSE_FRAGMENT,
    SMALL_COURSE_FRAGMENT,
    SMALL_TEACHER_FRAGMENT,
    SMALL_MEMBERSHIP_FRAGMENT,
    MEDIUM_MEMBERSHIP_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
    SMALL_COURSE_INSTANCE_FRAGMENT,
    SMALL_PARTICIPANT_FRAGMENT,
    MEDIUM_ROOM_FRAGMENT,
    MEDIUM_COURSE_INSTANCE_FRAGMENT,
} from 'graphql';

const DETAIL_COURSE_FRAGMENT = gql`
    fragment DetailCourseFragment on Course {
        ...LargeCourseFragment
        teachers {
            ...SmallTeacherFragment
        }
        memberships {
            ...MediumMembershipFragment
            student {
                ...SmallStudentFragment
            }
        }
        instances(orderBy: date_DESC) {
            ...SmallCourseInstanceFragment
            participants {
                ...SmallParticipantFragment
                membership {
                    ...SmallMembershipFragment
                }
            }
        }
        room {
            ...MediumRoomFragment
        }
    }
    ${SMALL_MEMBERSHIP_FRAGMENT}
    ${MEDIUM_ROOM_FRAGMENT}
    ${SMALL_PARTICIPANT_FRAGMENT}
    ${SMALL_COURSE_INSTANCE_FRAGMENT}
    ${SMALL_STUDENT_FRAGMENT}
    ${MEDIUM_MEMBERSHIP_FRAGMENT}
    ${LARGE_COURSE_FRAGMENT}
    ${SMALL_TEACHER_FRAGMENT}
`;

const DETAIL_COURSE_INSTANCE_FRAGMENT = gql`
    fragment CreateCourseInstanceFragment on CourseInstance {
        ...MediumCourseInstanceFragment
        course {
            ...DetailCourseFragment
        }
    }
    ${MEDIUM_COURSE_INSTANCE_FRAGMENT}
    ${DETAIL_COURSE_FRAGMENT}
`;

export const GET_COURSE = gql`
    query CourseDetailGetCourse($id: ID!) {
        course(id: $id) {
            ...DetailCourseFragment
        }
    }
    ${DETAIL_COURSE_FRAGMENT}
`;

export const UPDATE_COURSE = gql`
    mutation CourseDetailUpdateCourse(
        $id: ID!
        $name: String!
        $description: String
        $startDate: DateTime
        $startTime: String
        $duration: Int
        $studentLimit: Int
        $day: CourseDay
    ) {
        updateCourse(
            id: $id
            name: $name
            description: $description
            startDate: $startDate
            startTime: $startTime
            duration: $duration
            studentLimit: $studentLimit
            day: $day
        ) {
            ...LargeCourseFragment
        }
    }
    ${LARGE_COURSE_FRAGMENT}
`;

export const REMOVE_TEACHER_FROM_COURSE = gql`
    mutation CourseDetailAddTeacherToCourse($id: ID!, $teacherId: ID!) {
        removeTeacherFromCourse(id: $id, teacherId: $teacherId) {
            ...SmallCourseFragment
            teachers {
                ...SmallTeacherFragment
            }
        }
    }
    ${SMALL_COURSE_FRAGMENT}
    ${SMALL_STUDENT_FRAGMENT}
`;

export const CREATE_MEMBERSHIP = gql`
    mutation StudentDetailCreateMembership(
        $courseId: ID!
        $studentId: ID!
        $role: DanceRole!
        $status: MembershipStatus
    ) {
        createMembership(
            courseId: $courseId
            studentId: $studentId
            role: $role
            status: $status
        ) {
            ...MediumMembershipFragment
            course {
                ...DetailCourseFragment
            }
        }
    }
    ${MEDIUM_MEMBERSHIP_FRAGMENT}
    ${DETAIL_COURSE_FRAGMENT}
`;

export const DELETE_COURSE_STUDENT = gql`
    mutation StudentDetailDeleteMembership($id: ID!) {
        deleteMembership(id: $id) {
            ...MediumMembershipFragment
        }
    }
    ${MEDIUM_MEMBERSHIP_FRAGMENT}
`;

export const UPDATE_MEMBERSHIP_STATUS = gql`
    mutation StudentDetailUpdateMembershipStatus(
        $id: ID!
        $status: MembershipStatus!
    ) {
        updateMembershipStatus(id: $id, status: $status) {
            ...MediumMembershipFragment
        }
    }
    ${MEDIUM_MEMBERSHIP_FRAGMENT}
`;

export const GET_STUDENT_FRAGMENT = gql`
    fragment CourseDetailStudent on Student {
        id
        memberships {
            id
        }
    }
`;

export const CREATE_COURSE_INSTANCE = gql`
    mutation StudentDetailCreateCourseInstance(
        $date: DateTime!
        $courseId: ID!
        $membershipIds: [ID!]!
    ) {
        createCourseInstance(
            date: $date
            courseId: $courseId
            membershipIds: $membershipIds
        ) {
            ...CreateCourseInstanceFragment
        }
    }
    ${DETAIL_COURSE_INSTANCE_FRAGMENT}
`;

export const DELETE_COURSE_INSTANCE = gql`
    mutation StudentDetailDeleteCourseInstance($id: ID!) {
        deleteCourseInstance(id: $id) {
            id
        }
    }
`;

export const CANCEL_COURSE_INSTANCE = gql`
    mutation StudentDetailCancelCourseInstance($id: ID!) {
        cancelCourseInstance(id: $id) {
            ...CreateCourseInstanceFragment
        }
    }
    ${DETAIL_COURSE_INSTANCE_FRAGMENT}
`;
