import gql from 'graphql-tag';

export const SMALL_COURSE_INSTANCE_FRAGMENT = gql`
    fragment SmallCourseInstanceFragment on CourseInstance {
        id
        date
        topic
    }
`;

export const MEDIUM_COURSE_INSTANCE_FRAGMENT = gql`
    fragment MediumCourseInstanceFragment on CourseInstance {
        ...SmallCourseInstanceFragment
        notes
        recapUrl
    }
    ${SMALL_COURSE_INSTANCE_FRAGMENT}
`;
