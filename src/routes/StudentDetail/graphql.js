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
                validCount
                useHistory {
                    id
                }
                payment {
                    id
                }
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

export const CREATE_CARD = gql`
    mutation StudentDetailCreateCard(
        $studentId: ID!
        $expirationDate: DateTime!
        $validCount: Int!
    ) {
        createCard(
            studentId: $studentId
            expirationDate: $expirationDate
            validCount: $validCount
        ) {
            id
            validCount
            expirationDate
            active
            payment {
                id
            }
            useHistory {
                id
            }
        }
    }
`;

export const UPDATE_CARD = gql`
    mutation StudentDetailUpdateCard(
        $id: ID!
        $studentId: ID!
        $expirationDate: DateTime!
        $validCount: Int!
    ) {
        updateCard(
            id: $id
            studentId: $studentId
            expirationDate: $expirationDate
            validCount: $validCount
        ) {
            id
            validCount
            expirationDate
            active
            payment {
                id
            }
            useHistory {
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
                }
            }
            card {
                id
                payment {
                    id
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
