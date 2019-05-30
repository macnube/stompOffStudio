import gql from 'graphql-tag';

export const GET_STUDENTS = gql`
    query PaymentManagementGetStudents {
        students {
            id
            name
            hasReferralBonus
            cards {
                id
                expirationDate
                value
                payment {
                    id
                }
                active
            }
        }
    }
`;
