import gql from 'graphql-tag';

import { SMALL_USER_FRAGMENT, SMALL_STUDENT_FRAGMENT } from 'graphql';

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
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
