import gql from 'graphql-tag';

import { SMALL_STUDENT_FRAGMENT } from './student';

export const SMALL_USER_FRAGMENT = gql`
    fragment SmallUserFragment on User {
        id
        email
        password
        admin
    }
`;

export const MEDIUM_USER_FRAGMENT = gql`
    fragment MediumUserFragment on User {
        ...SmallUserFragment
        student {
            ...SmallStudentFragment
        }
    }
    ${SMALL_USER_FRAGMENT}
    ${SMALL_STUDENT_FRAGMENT}
`;
