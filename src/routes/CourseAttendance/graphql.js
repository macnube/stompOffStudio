import gql from 'graphql-tag';

import {
    MEDIUM_COURSE_INSTANCE_FRAGMENT,
    SMALL_PARTICIPANT_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
    SMALL_COURSE_FRAGMENT,
    SMALL_MEMBERSHIP_FRAGMENT,
    MEDIUM_CARD_FRAGMENT,
} from 'graphql';

export const GET_COURSE_INSTANCE_FRAGMENT = gql`
    fragment GetCourseInstanceFragment on CourseInstance {
        id
        participants {
            id
        }
    }
`;

const COURSE_ATTENDANCE_PARTICIPANT_FRAGMENT = gql`
    fragment CourseAttendanceParticipantFragment on Participant {
        ...SmallParticipantFragment
        membership {
            ...SmallMembershipFragment
            course {
                ...SmallCourseFragment
            }
            student {
                ...SmallStudentFragment

                cards(where: { active: true, expirationDate_gte: $date }) {
                    ...MediumCardFragment
                }
                memberships {
                    ...SmallMembershipFragment
                }
            }
        }
    }
    ${MEDIUM_CARD_FRAGMENT}
    ${SMALL_COURSE_FRAGMENT}
    ${SMALL_MEMBERSHIP_FRAGMENT}
    ${SMALL_STUDENT_FRAGMENT}
    ${SMALL_PARTICIPANT_FRAGMENT}
`;

export const COURSE_ATTENDANCE_COURSE_INSTANCE_FRAGMENT = gql`
    fragment CourseAttendanceCourseInstanceFragment on CourseInstance {
        ...MediumCourseInstanceFragment
        participants {
            ...CourseAttendanceParticipantFragment
        }
        course {
            ...SmallCourseFragment
        }
    }
    ${SMALL_COURSE_FRAGMENT}
    ${COURSE_ATTENDANCE_PARTICIPANT_FRAGMENT}
    ${MEDIUM_COURSE_INSTANCE_FRAGMENT}
`;

export const GET_COURSE_INSTANCE = gql`
    query CourseAttendanceGetCourseInstance($id: ID!, $date: DateTime!) {
        courseInstance(id: $id) {
            ...CourseAttendanceCourseInstanceFragment
        }
    }
    ${COURSE_ATTENDANCE_COURSE_INSTANCE_FRAGMENT}
`;
