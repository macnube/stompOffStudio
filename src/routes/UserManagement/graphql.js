import gql from 'graphql-tag';

import {
    SMALL_USER_FRAGMENT,
    MEDIUM_USER_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
} from 'graphql';

export const GET_USERS = gql`
    query UserManagementGetUsers {
        users {
            ...MediumUserFragment
        }
    }
    ${MEDIUM_USER_FRAGMENT}
`;

export const TOGGLE_USER_ADMIN_STATUS = gql`
    mutation UserManagementToggleUserAdminStatus($id: ID!) {
        toggleUserAdminStatus(id: $id) {
            ...SmallUserFragment
        }
    }
    ${SMALL_USER_FRAGMENT}
`;

export const DELETE_USER = gql`
    mutation UserManagementDeleteUser($id: ID!) {
        deleteUser(id: $id) {
            ...SmallUserFragment
        }
    }
    ${SMALL_USER_FRAGMENT}
`;

export const USER_MANAGEMENT_STUDENT_FRAGMENT = gql`
    fragment UserManagementStudentFragment on Student {
        ...SmallStudentFragment
        user {
            ...SmallUserFragment
        }
    }
    ${SMALL_STUDENT_FRAGMENT}
    ${SMALL_USER_FRAGMENT}
`;
