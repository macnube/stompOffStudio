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
    }
    ${SMALL_CARD_FRAGMENT}
`;

