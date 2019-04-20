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
