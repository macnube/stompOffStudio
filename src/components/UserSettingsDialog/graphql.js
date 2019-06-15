import gql from 'graphql-tag';

import { SMALL_USER_FRAGMENT } from 'graphql';

export const GET_CURRENT_USER = gql`
    query UserSettingsCurrentUser {
        currentUser {
            ...SmallUserFragment
        }
    }
    ${SMALL_USER_FRAGMENT}
`;

export const UPDATE_USER_EMAIL_PASSWORD = gql`
    mutation UserSettingsUpdateUserEmailPassword(
        $id: ID!
        $email: String
        $password: String
    ) {
        updateUserEmailPassword(id: $id, email: $email, password: $password) {
            ...SmallUserFragment
        }
    }
    ${SMALL_USER_FRAGMENT}
`;
