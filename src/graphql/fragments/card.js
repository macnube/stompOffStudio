import gql from 'graphql-tag';

export const SMALL_CARD_FRAGMENT = gql`
    fragment SmallCardFragment on Card {
        id
        active
    }
`;

export const MEDIUM_CARD_FRAGMENT = gql`
    fragment MediumCardFragment on Card {
        ...SmallCardFragment
        expirationDate
        paid
        value
        originalValue
        privateLessonLength
        privateLessonUseDate
    }
    ${SMALL_CARD_FRAGMENT}
`;

export const LARGE_CARD_FRAGMENT = gql`
    fragment LargeCardFragment on Card {
        ...MediumCardFragment
        participationHistory {
            id
        }
        payment {
            id
            date
        }
    }
    ${MEDIUM_CARD_FRAGMENT}
`;
