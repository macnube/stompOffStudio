import gql from 'graphql-tag';

export const SMALL_COURSE_FRAGMENT = gql`
    fragment SmallCourseFragment on Course {
        id
        name
    }
`;

export const MEDIUM_COURSE_FRAGMENT = gql`
    fragment MediumCourseFragment on Course {
        ...SmallCourseFragment
        description
        day
        startTime
        duration
        studentLimit
    }
    ${SMALL_COURSE_FRAGMENT}
`;
