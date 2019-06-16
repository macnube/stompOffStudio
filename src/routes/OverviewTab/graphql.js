import gql from 'graphql-tag';

import {
    SMALL_COURSE_INSTANCE_FRAGMENT,
    SMALL_MEMBERSHIP_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
    SMALL_PARTICIPANT_FRAGMENT,
    SMALL_COURSE_FRAGMENT,
} from 'graphql';

export const GET_OVERVIEW_INSTANCES = gql`
    query OverviewGetOverviewInstances {
        overviewInstances {
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

export const GET_UNPAID_CARDS = gql`
    query OverviewGetUnpaidCards {
        unpaidCards {
            id
            payment {
                id
            }
            student {
                id
                name
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

export const GET_UNLINKED_PAYMENTS = gql`
    query OverviewGetUnpaidCards {
        unlinkedCardPayments {
            id
            date
            amount
            student {
                id
                name
            }
        }
    }
`;
