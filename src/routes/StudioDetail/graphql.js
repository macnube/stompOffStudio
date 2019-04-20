import gql from 'graphql-tag';

export const GET_STUDIO = gql`
    query StudioDetailGetStudio($id: ID!) {
        studio(id: $id) {
            id
            name
            address
            rooms {
                id
                name
                capacity
                studio {
                    id
                }
            }
        }
    }
`;

export const UPDATE_STUDIO = gql`
    mutation StudioDetailUpdateStudio(
        $id: ID!
        $name: String!
        $address: String!
    ) {
        updateStudio(id: $id, name: $name, address: $address) {
            id
            name
            address
        }
    }
`;

export const CREATE_ROOM = gql`
    mutation StudioDetailCreateRoom(
        $name: String!
        $capacity: Int!
        $studioId: ID!
    ) {
        createRoom(name: $name, capacity: $capacity, studioId: $studioId) {
            id
            name
            capacity
            studio {
                id
                name
                address
                rooms {
                    id
                    name
                    capacity
                }
            }
        }
    }
`;

export const DELETE_ROOM = gql`
    mutation StudioDetailDeleteRoom($id: ID!) {
        deleteRoom(id: $id) {
            id
            name
            capacity
        }
    }
`;

export const UPDATE_ROOM = gql`
    mutation StudioDetailUpdateRoom($id: ID!, $name: String!, $capacity: Int!) {
        updateRoom(id: $id, name: $name, capacity: $capacity) {
            id
            name
            capacity
        }
    }
`;
