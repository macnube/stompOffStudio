import gql from 'graphql-tag';

import {
    SMALL_USER_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
    MEDIUM_CARD_FRAGMENT,
    SMALL_COURSE_FRAGMENT,
    MEDIUM_STUDENT_FRAGMENT,
    MEDIUM_MEMBERSHIP_FRAGMENT,
    SMALL_PAYMENT_FRAGMENT,
    SMALL_CARD_FRAGMENT,
} from 'graphql';

export const STUDENT_DETAIL_CARD_FRAGMENT = gql`
    fragment StudentDetailCardFragment on Card {
        ...MediumCardFragment
        payment {
            ...SmallPaymentFragment
        }
    }
    ${MEDIUM_CARD_FRAGMENT}
    ${SMALL_PAYMENT_FRAGMENT}
`;

const STUDENT_DETAIL_STUDENT_FRAGMENT = gql`
    fragment StudentDetailStudentFragment on Student {
        ...MediumStudentFragment
        memberships {
            ...MediumMembershipFragment
            course {
                ...SmallCourseFragment
            }
        }
        cards(orderBy: expirationDate_DESC) {
            ...StudentDetailCardFragment
        }
        payments(orderBy: date_DESC) {
            ...SmallPaymentFragment
            card {
                ...SmallCardFragment
            }
        }
        user {
            ...SmallUserFragment
        }
    }
    ${SMALL_USER_FRAGMENT}
    ${SMALL_CARD_FRAGMENT}
    ${STUDENT_DETAIL_CARD_FRAGMENT}
    ${SMALL_COURSE_FRAGMENT}
    ${MEDIUM_MEMBERSHIP_FRAGMENT}
    ${MEDIUM_STUDENT_FRAGMENT}
`;

export const GET_STUDENT = gql`
    query StudentDetailGetStudent($id: ID!) {
        student(id: $id) {
            ...StudentDetailStudentFragment
        }
    }
    ${STUDENT_DETAIL_STUDENT_FRAGMENT}
`;

export const UPDATE_STUDENT = gql`
    mutation StudentDetailUpdateStudent(
        $id: ID!
        $name: String!
        $email: String!
        $mobile: String
        $hasReferralBonus: Boolean!
    ) {
        updateStudent(
            id: $id
            name: $name
            email: $email
            mobile: $mobile
            hasReferralBonus: $hasReferralBonus
        ) {
            ...MediumStudentFragment
        }
    }
    ${MEDIUM_STUDENT_FRAGMENT}
`;

export const DELETE_COURSE_STUDENT = gql`
    mutation StudentDetailDeleteMembership($id: ID!) {
        deleteMembership(id: $id) {
            id
        }
    }
`;

export const CREATE_CARD = gql`
    mutation StudentDetailCreateCard(
        $studentId: ID!
        $expirationDate: DateTime!
        $value: Int!
    ) {
        createCard(
            studentId: $studentId
            expirationDate: $expirationDate
            value: $value
        ) {
            ...StudentDetailCardFragment
        }
    }
    ${STUDENT_DETAIL_CARD_FRAGMENT}
`;

export const UPDATE_CARD = gql`
    mutation StudentDetailUpdateCard(
        $id: ID!
        $expirationDate: DateTime!
        $value: Int!
    ) {
        updateCard(id: $id, expirationDate: $expirationDate, value: $value) {
            ...StudentDetailCardFragment
        }
    }
    ${STUDENT_DETAIL_CARD_FRAGMENT}
`;

export const DELETE_CARD = gql`
    mutation StudentDetailDeleteCard($id: ID!) {
        deleteCard(id: $id) {
            id
        }
    }
`;

export const PAY_CARD = gql`
    mutation StudentDetailPayCard($id: ID!) {
        payCard(id: $id) {
            ...SmallCardFragment
        }
    }
    ${SMALL_CARD_FRAGMENT}
`;

export const UNPAY_CARD = gql`
    mutation StudentDetailUnpayCard($id: ID!) {
        unpayCard(id: $id) {
            ...SmallCardFragment
        }
    }
    ${SMALL_CARD_FRAGMENT}
`;

export const CLEAR_REFERRAL_BONUS = gql`
    mutation StudentDetailClearReferralBonus($id: ID!) {
        clearReferralBonus(id: $id) {
            ...MediumStudentFragment
        }
    }
    ${MEDIUM_STUDENT_FRAGMENT}
`;

export const CREATE_USER = gql`
    mutation UserManagementCreateUser(
        $email: String!
        $password: String!
        $studentId: ID!
    ) {
        createUser(email: $email, password: $password, studentId: $studentId) {
            ...SmallUserFragment
            student {
                ...SmallStudentFragment
                user {
                    ...SmallUserFragment
                }
            }
        }
    }
    ${SMALL_STUDENT_FRAGMENT}
    ${SMALL_USER_FRAGMENT}
`;
