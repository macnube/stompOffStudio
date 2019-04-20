import gql from 'graphql-tag';

export const GET_STUDIOS = gql`
    query StudioManagementGetStudios {
        studios {
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
`;

export const CREATE_STUDIO = gql`
    mutation StudioManagementCreateStudio($name: String!, $address: String!) {
        createStudio(name: $name, address: $address) {
            id
            name
            address
            rooms {
                name
                capacity
            }
        }
    }
`;

export const DELETE_STUDIO = gql`
    mutation StudioManagementDeleteStudio($id: ID!) {
        deleteStudio(id: $id) {
            id
            name
            address
            rooms {
                name
                capacity
            }
        }
    }
`;
