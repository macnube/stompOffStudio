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
        day
    }
    ${SMALL_COURSE_FRAGMENT}
`;

export const LARGE_COURSE_FRAGMENT = gql`
    fragment LargeCourseFragment on Course {
        ...MediumCourseFragment
        description
        startTime
        startDate
        duration
        studentLimit
    }
    ${MEDIUM_COURSE_FRAGMENT}
`;
