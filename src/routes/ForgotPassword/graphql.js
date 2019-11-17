import gql from 'graphql-tag';

import { SMALL_USER_FRAGMENT } from 'graphql';

export const SEND_RESET_EMAIL = gql`
    mutation SendResetEmail($email: String!) {
        sendResetEmail(email: $email) {
            ...SmallUserFragment
        }
    }
    ${SMALL_USER_FRAGMENT}
`;
