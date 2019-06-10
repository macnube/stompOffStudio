import gql from 'graphql-tag';

export const SMALL_COURSE_FRAGMENT = gql`
    fragment SmallCourseFragment on Course {
        id
        name
    }
`;
