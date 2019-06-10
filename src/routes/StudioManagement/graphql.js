import gql from 'graphql-tag';
import { MEDIUM_STUDIO_FRAGMENT } from 'graphql';

export const GET_STUDIOS = gql`
    query StudioManagementGetStudios {
        studios {
            ...MediumStudioFragment
        }
    }
    ${MEDIUM_STUDIO_FRAGMENT}
`;

export const CREATE_STUDIO = gql`
    mutation StudioManagementCreateStudio($name: String!, $address: String!) {
        createStudio(name: $name, address: $address) {
            ...MediumStudioFragment
        }
    }
    ${MEDIUM_STUDIO_FRAGMENT}
`;

export const DELETE_STUDIO = gql`
    mutation StudioManagementDeleteStudio($id: ID!) {
        deleteStudio(id: $id) {
            ...MediumStudioFragment
        }
    }
    ${MEDIUM_STUDIO_FRAGMENT}
`;
