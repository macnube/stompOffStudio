import gql from 'graphql-tag';

export const GET_STUDENT = gql`
    query StudentDetailGetStudent($id: ID!) {
        student(id: $id) {
            id
            name
            email
            mobile
            courses {
                id
                course {
                    id
                    name
                }
                student {
                    id
                    name
                }
                role
            }
            cards {
                id
                expirationDate
                active
                value
                originalValue
                participationHistory {
                    id
                }
                payment {
                    id
                    date
                }
                paid
            }
            payments {
                id
                amount
                date
                type
                card {
                    id
                }
            }
            user {
                id
            }
        }
    }
`;

export const UPDATE_STUDENT = gql`
    mutation StudentDetailUpdateStudent(
        $id: ID!
        $name: String!
        $email: String!
        $mobile: String
    ) {
        updateStudent(id: $id, name: $name, email: $email, mobile: $mobile) {
            id
            name
            email
            mobile
        }
    }
`;

export const DELETE_COURSE_STUDENT = gql`
    mutation StudentDetailDeleteCourseStudent($id: ID!) {
        deleteCourseStudent(id: $id) {
            id
        }
    }
`;

export const GET_CARD_FRAGMENT = gql`
    fragment StudentDetailCard on Card {
        id
        value
        expirationDate
        active
        payment {
            id
        }
        participationHistory {
            id
        }
        paid
    }
`;

export const CREATE_USER = gql`
    mutation StudentDetailCreateUser(
        $email: String!
        $password: String!
        $studentId: ID!
    ) {
        createUser(email: $email, password: $password, studentId: $studentId) {
            email
            password
            student {
                id
                user {
                    id
                    email
                }
            }
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
            id
            value
            expirationDate
            active
            payment {
                id
            }
            participationHistory {
                id
            }
            paid
        }
    }
`;

export const UPDATE_CARD = gql`
    mutation StudentDetailUpdateCard(
        $id: ID!
        $expirationDate: DateTime!
        $value: Int!
    ) {
        updateCard(id: $id, expirationDate: $expirationDate, value: $value) {
            id
            value
            expirationDate
            active
            payment {
                id
                date
            }
            participationHistory {
                id
            }
        }
    }
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
            id
            paid
        }
    }
`;

export const UNPAY_CARD = gql`
    mutation StudentDetailUnpayCard($id: ID!) {
        unpayCard(id: $id) {
            id
            paid
        }
    }
`;

export const CREATE_PAYMENT = gql`
    mutation StudentDetailCreatePayment(
        $type: PaymentType!
        $date: DateTime!
        $amount: Int!
        $studentId: ID!
        $cardId: ID!
    ) {
        createPayment(
            type: $type
            date: $date
            amount: $amount
            studentId: $studentId
            cardId: $cardId
        ) {
            id
            type
            date
            amount
            student {
                id
                name
                payments {
                    id
                    card {
                        id
                    }
                    date
                }
            }
            card {
                id
                payment {
                    id
                    date
                }
            }
        }
    }
`;

export const DELETE_PAYMENT = gql`
    mutation StudentDetailDeletePayment($id: ID!) {
        deletePayment(id: $id) {
            id
        }
    }
`;
