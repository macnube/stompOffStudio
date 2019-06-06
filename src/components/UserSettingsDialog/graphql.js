import gql from 'graphql-tag';

export const GET_USERS = gql`
    query UserSettingsCurrentUser {
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

export const UPDATE_USER_EMAIL_PASSWORD = gql`
    mutation UserSettingsUpdateUserEmailPassword($id: ID!) {
        updateUserEmailPassword(id: $id) {
            id
            email
            admin
        }
    }
`;
