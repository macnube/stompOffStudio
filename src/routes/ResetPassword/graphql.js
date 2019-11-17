import gql from 'graphql-tag';

import { SMALL_USER_FRAGMENT, SMALL_STUDENT_FRAGMENT } from 'graphql';

export const RESET_PASSWORD = gql`
    mutation ResetPassword(
        $email: String!
        $encryptedEmail: String!
        $encryptedDate: String!
        $password: String!
    ) {
        resetPassword(
            email: $email
            encryptedEmail: $encryptedEmail
            encryptedDate: $encryptedDate
            password: $password
        ) {
            token
            user {
                ...SmallUserFragment
                student {
                    ...SmallStudentFragment
                }
            }
        }
    }
    ${SMALL_USER_FRAGMENT}
    ${SMALL_STUDENT_FRAGMENT}
`;
