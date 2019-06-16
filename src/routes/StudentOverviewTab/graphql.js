import gql from 'graphql-tag';

import {
    SMALL_COURSE_INSTANCE_FRAGMENT,
    SMALL_MEMBERSHIP_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
    SMALL_PARTICIPANT_FRAGMENT,
    SMALL_COURSE_FRAGMENT,
} from 'graphql';

export const GET_INSTANCES_BY_STUDENT = gql`
    query OverviewOverviewInstances($id: ID!) {
        instancesByStudent(id: $id) {
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
            course {
                ...SmallCourseFragment
            }
        }
    }
    ${SMALL_PARTICIPANT_FRAGMENT}
    ${SMALL_COURSE_FRAGMENT}
    ${SMALL_STUDENT_FRAGMENT}
    ${SMALL_MEMBERSHIP_FRAGMENT}
    ${SMALL_COURSE_INSTANCE_FRAGMENT}
`;

export const GET_UNPAID_CARDS_BY_STUDENT = gql`
    query OverviewGetUnpaidCardsByStudent($id: ID!) {
        unpaidCardsByStudent(id: $id) {
            id
            payment {
                id
            }
            participationHistory {
                id
            }
            paid
            expirationDate
            value
            originalValue
        }
    }
`;
