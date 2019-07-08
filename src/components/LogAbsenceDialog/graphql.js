import gql from 'graphql-tag';

import {
    SMALL_COURSE_FRAGMENT,
    LARGE_COURSE_FRAGMENT,
    SMALL_COURSE_INSTANCE_FRAGMENT,
    MEDIUM_ROOM_FRAGMENT,
    SMALL_PARTICIPANT_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
    SMALL_MEMBERSHIP_FRAGMENT,
} from 'graphql';

export const LOG_ABSENCE_COURSE_FRAGMENT = gql`
    fragment LogAbsenceCourseFragment on Course {
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

export const LOG_ABSENCE_COURSE_WITH_ABSENCES_FRAGMENT = gql`
    fragment LogAbsenceCourseWithAbsencesFragment on Course {
        ...LogAbsenceCourseFragment
        absences(
            where: { AND: [{ student: { id: $id } }, { date_gte: $date }] }
        ) {
            id
            date
            course {
                ...SmallCourseFragment
            }
        }
    }
    ${SMALL_COURSE_FRAGMENT}
    ${LOG_ABSENCE_COURSE_FRAGMENT}
`;

export const LOG_ABSENCE_GET_COURSES_BY_STUDENT = gql`
    query LogAbsenceGetCourses($id: ID!, $date: DateTime!) {
        coursesByStudent(id: $id) {
            ...LogAbsenceCourseWithAbsencesFragment
        }
    }
    ${LOG_ABSENCE_COURSE_WITH_ABSENCES_FRAGMENT}
`;

export const LOG_ABSENCE_LOG_COURSE_ABSENCE = gql`
    mutation LogAbsenceLogCourseAbsence(
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
            course {
                ...SmallCourseFragment
            }
        }
    }
    ${SMALL_COURSE_FRAGMENT}
`;
