import gql from 'graphql-tag';

import { LARGE_CARD_FRAGMENT } from 'graphql';

export const GET_CARD = gql`
    query CardDetailGetCard($id: ID!) {
        card(id: $id) {
            id
            expirationDate
            active
            value
            participationHistory {
                id
                courseInstance {
                    id
                    date
                    topic
                }
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

export const GET_PARTICIPANT_BY_STUDENT = gql`
    query CardDetailGetParticipantByStudent($id: ID!) {
        getParticipantByStudent(id: $id) {
            id
            status
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
            participationHistory {
                id
            }
        }
    }
`;

export const REMOVE_CARD_PARTICIPATION = gql`
    mutation CardDetailRemoveCardParticipation(
        $id: ID!
        $participantId: ID!
        $value: Int!
    ) {
        removeCardParticipation(
            id: $id
            participantId: $participantId
            value: $value
        ) {
            ...LargeCardFragment
        }
    }
    ${LARGE_CARD_FRAGMENT}
`;
