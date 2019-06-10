import gql from 'graphql-tag';

import {
    MEDIUM_CARD_FRAGMENT,
    MEDIUM_STUDENT_FRAGMENT,
    SMALL_PAYMENT_FRAGMENT,
} from 'graphql';

export const GET_STUDENTS = gql`
    query PaymentManagementGetStudents {
        students {
            ...MediumStudentFragment
            cards {
                ...MediumCardFragment
                payment {
                    ...SmallPaymentFragment
                }
            }
        }
    }
    ${SMALL_PAYMENT_FRAGMENT}
    ${MEDIUM_STUDENT_FRAGMENT}
    ${MEDIUM_CARD_FRAGMENT}
`;
