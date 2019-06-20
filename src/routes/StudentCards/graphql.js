import gql from 'graphql-tag';
import { LARGE_CARD_FRAGMENT } from 'graphql';

export const GET_STUDENT_CARDS = gql`
    query StudentCardsGetCardsCards($id: ID!) {
        studentCards(id: $id) {
            ...LargeCardFragment
        }
    }
    ${LARGE_CARD_FRAGMENT}
`;
