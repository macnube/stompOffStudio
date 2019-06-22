import gql from 'graphql-tag';

export const SMALL_COURSE_ABSENCE_FRAGMENT = gql`
    fragment SmallCourseAbsenceFragment on CourseAbsence {
        id
        date
    }
`;
