import gql from 'graphql-tag';

import { SMALL_COURSE_FRAGMENT } from './course';

export const SMALL_TEACHER_FRAGMENT = gql`
    fragment SmallTeacherFragment on Teacher {
        id
        name
        email
        mobile
    }
`;

export const MEDIUM_TEACHER_FRAGMENT = gql`
    fragment MediumTeacherFragment on Teacher {
        ...SmallTeacherFragment
        courses {
            ...SmallCourseFragment
        }
    }
    ${SMALL_TEACHER_FRAGMENT}
    ${SMALL_COURSE_FRAGMENT}
`;
