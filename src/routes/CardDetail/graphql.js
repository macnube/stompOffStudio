import gql from 'graphql-tag';

export const GET_CARD = gql`
    query CardDetailGetCard($id: ID!) {
        card(id: $id) {
            id
            expirationDate
            active
            value
            useHistory {
                id
                date
                topic
            }
            student {
                id
                name
            }
            payment {
                id
                date
                amount
            }
        }
    }
`;

export const UPDATE_CARD = gql`
    mutation CardDetailUpdateCard(
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
            useHistory {
                id
            }
        }
    }
`;

