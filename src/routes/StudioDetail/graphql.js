import gql from 'graphql-tag';

import {
    SMALL_STUDIO_FRAGMENT,
    SMALL_ROOM_FRAGMENT,
    MEDIUM_STUDIO_FRAGMENT,
} from 'graphql';

export const GET_STUDIO = gql`
    query StudioDetailGetStudio($id: ID!) {
        studio(id: $id) {
            ...MediumStudioFragment
        }
    }
    ${MEDIUM_STUDIO_FRAGMENT}
`;

export const UPDATE_STUDIO = gql`
    mutation StudioDetailUpdateStudio(
        $id: ID!
        $name: String!
        $address: String!
    ) {
        updateStudio(id: $id, name: $name, address: $address) {
            ...SmallStudioFragment
        }
    }
    ${SMALL_STUDIO_FRAGMENT}
`;

export const CREATE_ROOM = gql`
    mutation StudioDetailCreateRoom(
        $name: String!
        $capacity: Int!
        $studioId: ID!
    ) {
        createRoom(name: $name, capacity: $capacity, studioId: $studioId) {
            ...SmallRoomFragment
            studio {
                ...MediumStudioFragment
            }
        }
    }
    ${SMALL_ROOM_FRAGMENT}
    ${MEDIUM_STUDIO_FRAGMENT}
`;

export const DELETE_ROOM = gql`
    mutation StudioDetailDeleteRoom($id: ID!) {
        deleteRoom(id: $id) {
            ...SmallRoomFragment
        }
    }
    ${SMALL_ROOM_FRAGMENT}
`;

export const UPDATE_ROOM = gql`
    mutation StudioDetailUpdateRoom($id: ID!, $name: String!, $capacity: Int!) {
        updateRoom(id: $id, name: $name, capacity: $capacity) {
            ...SmallRoomFragment
        }
    }
    ${SMALL_ROOM_FRAGMENT}
`;
