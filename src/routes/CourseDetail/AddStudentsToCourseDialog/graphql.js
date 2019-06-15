import gql from 'graphql-tag';

import {
    SMALL_STUDENT_FRAGMENT,
    SMALL_MEMBERSHIP_FRAGMENT,
    SMALL_COURSE_FRAGMENT,
} from 'graphql';

export const GET_STUDENTS = gql`
    query CourseDetailGetStudents {
        students {
            ...SmallStudentFragment
            memberships {
                ...SmallMembershipFragment
                course {
                    ...SmallCourseFragment
                }
            }
        }
    }
    ${SMALL_MEMBERSHIP_FRAGMENT}
    ${SMALL_COURSE_FRAGMENT}
    ${SMALL_STUDENT_FRAGMENT}
`;
