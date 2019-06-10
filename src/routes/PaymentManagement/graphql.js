import gql from 'graphql-tag';

export const GET_PAYMENTS = gql`
    query PaymentManagementGetPayments {
        payments {
            id
            type
            date
            amount
            student {
                id
                name
                cards {
                    id
                    expirationDate
                    value
                    payment {
                        id
                        date
                    }
                    active
                }
            }
            card {
                id
                expirationDate
                payment {
                    id
                    date
                }
            }
        }
    }
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
    mutation PaymentManagementDeletePayment($id: ID!) {
        deletePayment(id: $id) {
            id
        }
    }
`;
