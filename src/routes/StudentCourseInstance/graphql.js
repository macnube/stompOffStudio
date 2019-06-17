import gql from 'graphql-tag';

import { MEDIUM_COURSE_INSTANCE_FRAGMENT } from 'graphql';

export const COURSE_INSTANCE_FRAGMENT = gql`
    fragment StudentCourseInstanceFragment on CourseInstance {
        ...MediumCourseInstanceFragment
    }
    ${MEDIUM_COURSE_INSTANCE_FRAGMENT}
`;

export const STUDENT_GET_COURSE_INSTANCE = gql`
    query StudentCourseInstanceGetCourseInstance($id: ID!) {
        courseInstance(id: $id) {
            ...StudentCourseInstanceFragment
        }
    }
    ${COURSE_INSTANCE_FRAGMENT}
`;
