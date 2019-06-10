import gql from 'graphql-tag';

export const SMALL_STUDIO_FRAGMENT = gql`
    fragment SmallStudioFragment on Studio {
        id
        name
        address
    }
`;

export const MEDIUM_STUDIO_FRAGMENT = gql`
    fragment MediumStudioFragment on Studio {
        ...SmallStudioFragment
        rooms {
            id
            name
            capacity
        }
    }
    ${SMALL_STUDIO_FRAGMENT}
`;
