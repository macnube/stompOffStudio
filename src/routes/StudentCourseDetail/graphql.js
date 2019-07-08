import gql from 'graphql-tag';

import {
    LARGE_COURSE_FRAGMENT,
    SMALL_COURSE_INSTANCE_FRAGMENT,
    MEDIUM_ROOM_FRAGMENT,
    SMALL_PARTICIPANT_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
    SMALL_MEMBERSHIP_FRAGMENT,
} from 'graphql';

export const STUDENT_DETAIL_COURSE_FRAGMENT = gql`
    fragment StudentDetailCourseFragment on Course {
        ...LargeCourseFragment
        instances(orderBy: date_DESC) {
            ...SmallCourseInstanceFragment
            participants {
                ...SmallParticipantFragment
                membership {
                    ...SmallMembershipFragment
                    student {
                        ...SmallStudentFragment
                    }
                }
            }
        }
        room {
            ...MediumRoomFragment
        }
    }
    ${SMALL_PARTICIPANT_FRAGMENT}
    ${SMALL_MEMBERSHIP_FRAGMENT}
    ${SMALL_STUDENT_FRAGMENT}
    ${MEDIUM_ROOM_FRAGMENT}
    ${SMALL_COURSE_INSTANCE_FRAGMENT}
    ${LARGE_COURSE_FRAGMENT}
`;

export const GET_COURSE = gql`
    query StudentCourseDetailGetCourse(
        $id: ID!
        $studentId: ID!
        $date: DateTime!
    ) {
        course(id: $id) {
            ...StudentDetailCourseFragment
            absences(
                where: {
                    AND: [{ student: { id: $studentId } }, { date_gte: $date }]
                }
            ) {
                id
                date
            }
        }
    }
    ${STUDENT_DETAIL_COURSE_FRAGMENT}
`;

export const LOG_COURSE_ABSENCE = gql`
    mutation StudentCourseDetailLogCourseAbsence(
        $date: DateTime!
        $courseId: ID!
        $studentId: ID!
    ) {
        logCourseAbsence(
            date: $date
            courseId: $courseId
            studentId: $studentId
        ) {
            id
            date
        }
    }
`;

export const CLEAR_COURSE_ABSENCE = gql`
    mutation StudentCourseDetailClearCourseAbsence($id: ID!) {
        clearCourseAbsence(id: $id) {
            id
        }
    }
`;

export const LOG_PARTICIPANT_ABSENCE = gql`
    mutation StudentCourseDetailLogParticipantAbsence($id: ID!) {
        logParticipantAbsence(id: $id) {
            id
            membership {
                id
                course {
                    ...StudentDetailCourseFragment
                }
            }
        }
    }
    ${STUDENT_DETAIL_COURSE_FRAGMENT}
`;

export const CLEAR_PARTICIPANT_ABSENCE = gql`
    mutation StudentCourseDetailClearParticipantAbsence($id: ID!) {
        clearParticipantAbsence(id: $id) {
            id
            membership {
                id
                course {
                    ...StudentDetailCourseFragment
                }
            }
        }
    }
    ${STUDENT_DETAIL_COURSE_FRAGMENT}
`;
