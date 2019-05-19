import gql from 'graphql-tag';

export const GET_USERS = gql`
    query UserManagementGetUsers {
        users {
            id
            email
            admin
            student {
                id
                name
            }
        }
    }
`;

export const TOGGLE_USER_ADMIN_STATUS = gql`
    mutation UserManagementToggleUserAdminStatus($id: ID!) {
        toggleUserAdminStatus(id: $id) {
            id
            email
            admin
        }
    }
`;

export const DELETE_USER = gql`
    mutation UserManagementDeleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;
