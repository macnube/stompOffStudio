import gql from 'graphql-tag';

import { SMALL_ROOM_FRAGMENT } from './room';

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
            ...SmallRoomFragment
        }
    }
    ${SMALL_STUDIO_FRAGMENT}
    ${SMALL_ROOM_FRAGMENT}
`;
