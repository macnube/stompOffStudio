import gql from 'graphql-tag';

export const SMALL_STUDENT_FRAGMENT = gql`
    fragment SmallStudentFragment on Student {
        id
        name
        email
        mobile
    }
`;
