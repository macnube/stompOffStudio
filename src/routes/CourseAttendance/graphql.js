import gql from 'graphql-tag';

import {
    MEDIUM_COURSE_INSTANCE_FRAGMENT,
    SMALL_PARTICIPANT_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
    SMALL_COURSE_FRAGMENT,
    SMALL_MEMBERSHIP_FRAGMENT,
    MEDIUM_MEMBERSHIP_FRAGMENT,
    MEDIUM_CARD_FRAGMENT,
    LARGE_CARD_FRAGMENT,
} from 'graphql';

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

                cards {
                    ...MediumCardFragment
                }
                memberships {
                    ...MediumMembershipFragment
                }
            }
        }
    }
    ${MEDIUM_CARD_FRAGMENT}
    ${SMALL_COURSE_FRAGMENT}
    ${SMALL_MEMBERSHIP_FRAGMENT}
    ${MEDIUM_MEMBERSHIP_FRAGMENT}
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

export const COURSE_ATTENDANCE_GET_COURSE_INSTANCE = gql`
    query CourseAttendanceGetCourseInstance($id: ID!) {
        courseInstance(id: $id) {
            ...CourseAttendanceCourseInstanceFragment
        }
    }
    ${COURSE_ATTENDANCE_COURSE_INSTANCE_FRAGMENT}
`;

export const LOG_CARD_PARTICIPATION = gql`
    mutation CourseAttendanceLogCardParticipation(
        $id: ID!
        $participantId: ID!
    ) {
        logCardParticipation(id: $id, participantId: $participantId) {
            ...LargeCardFragment
        }
    }
    ${LARGE_CARD_FRAGMENT}
`;
