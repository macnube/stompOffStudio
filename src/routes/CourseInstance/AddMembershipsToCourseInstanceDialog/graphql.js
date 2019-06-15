import gql from 'graphql-tag';

import { SMALL_STUDENT_FRAGMENT, SMALL_MEMBERSHIP_FRAGMENT } from 'graphql';
import { COURSE_INSTANCE_FRAGMENT } from 'routes/CourseInstance/graphql';

export const GET_MEMBERSHIPS_BY_COURSE_INSTANCE = gql`
    query CourseDetailGetMemberships($courseInstanceId: ID!) {
        membershipsByCourseInstance(courseInstanceId: $courseInstanceId) {
            ...SmallMembershipFragment
            student {
                ...SmallStudentFragment
            }
        }
    }
    ${SMALL_MEMBERSHIP_FRAGMENT}
    ${SMALL_STUDENT_FRAGMENT}
`;

// Probably need to start using fragments
// This mutation needs to update the necessary UI for Course Detail
// And for student detail
export const ADD_PARTICIPANT_TO_INSTANCE = gql`
    mutation CourseInstanceAddParticipantToCourseInstance(
        $id: ID!
        $studentId: ID!
    ) {
        addParticipantToCourseInstance(id: $id, studentId: $studentId) {
            ...CourseInstanceFragment
        }
    }
    ${COURSE_INSTANCE_FRAGMENT}
`;
