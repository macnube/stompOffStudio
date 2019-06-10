import gql from 'graphql-tag';

export const SMALL_ROOM_FRAGMENT = gql`
    fragment SmallRoomFragment on Room {
        id
        name
        capacity
    }
`;

export const MEDIUM_ROOM_FRAGMENT = gql`
    fragment MediumRoomFragment on Room {
        ...SmallRoomFragment
        studio {
            id
            name
        }
    }
    ${SMALL_ROOM_FRAGMENT}
`;
