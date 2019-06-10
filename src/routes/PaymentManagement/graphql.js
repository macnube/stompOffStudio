import gql from 'graphql-tag';

import {
    SMALL_PAYMENT_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
    MEDIUM_CARD_FRAGMENT,
} from 'graphql';

const PAYMENT_MANAGEMENT_PAYMENT_FRAGMENT = gql`
    fragment PaymentManagementPaymentFragment on Payment {
        ...SmallPaymentFragment
        student {
            ...SmallStudentFragment
            cards {
                ...MediumCardFragment
                payment {
                    ...SmallPaymentFragment
                }
            }
        }
        card {
            ...MediumCardFragment
        }
    }
    ${SMALL_STUDENT_FRAGMENT}
    ${MEDIUM_CARD_FRAGMENT}
    ${SMALL_PAYMENT_FRAGMENT}
`;

export const GET_PAYMENTS = gql`
    query PaymentManagementGetPayments {
        payments {
            ...PaymentManagementPaymentFragment
        }
    }
    ${PAYMENT_MANAGEMENT_PAYMENT_FRAGMENT}
`;

export const CREATE_PAYMENT = gql`
    mutation PaymentManagementCreatePayment(
        $type: PaymentType!
        $date: DateTime!
        $amount: Int!
        $studentId: ID!
        $cardId: ID
    ) {
        createPayment(
            type: $type
            date: $date
            amount: $amount
            studentId: $studentId
            cardId: $cardId
        ) {
            ...PaymentManagementPaymentFragment
        }
    }
    ${PAYMENT_MANAGEMENT_PAYMENT_FRAGMENT}
`;

export const UPDATE_PAYMENT = gql`
    mutation PaymentManagementUpdatePayment(
        $id: ID!
        $type: PaymentType!
        $date: DateTime!
        $amount: Int!
        $studentId: ID!
        $cardId: ID
    ) {
        updatePayment(
            id: $id
            type: $type
            date: $date
            amount: $amount
            studentId: $studentId
            cardId: $cardId
        ) {
            ...PaymentManagementPaymentFragment
        }
    }
    ${PAYMENT_MANAGEMENT_PAYMENT_FRAGMENT}
`;

export const DELETE_PAYMENT = gql`
    mutation PaymentManagementDeletePayment($id: ID!) {
        deletePayment(id: $id) {
            id
        }
    }
`;
