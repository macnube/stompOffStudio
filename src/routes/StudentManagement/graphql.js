import gql from 'graphql-tag';

import {
    SMALL_STUDENT_FRAGMENT,
    SMALL_COURSE_FRAGMENT,
    SMALL_MEMBERSHIP_FRAGMENT,
    SMALL_CARD_FRAGMENT,
} from 'graphql';

const STUDENT_MANAGEMENT_STUDENT_FRAGMENT = gql`
    fragment StudentManagementStudentFragment on Student {
        ...SmallStudentFragment
        memberships {
            ...SmallMembershipFragment
            course {
                ...SmallCourseFragment
            }
        }
        cards {
            ...SmallCardFragment
        }
    }
    ${SMALL_CARD_FRAGMENT}
    ${SMALL_COURSE_FRAGMENT}
    ${SMALL_MEMBERSHIP_FRAGMENT}
    ${SMALL_STUDENT_FRAGMENT}
`;

export const GET_STUDENTS = gql`
    query StudentManagementGetStudents {
        students {
            ...StudentManagementStudentFragment
        }
    }
    ${STUDENT_MANAGEMENT_STUDENT_FRAGMENT}
`;

export const CREATE_STUDENT = gql`
    mutation StudentManagementCreateStudent(
        $name: String!
        $email: String!
        $mobile: String
    ) {
        createStudent(name: $name, email: $email, mobile: $mobile) {
            ...StudentManagementStudentFragment
        }
    }
    ${STUDENT_MANAGEMENT_STUDENT_FRAGMENT}
`;

export const DELETE_STUDENT = gql`
    mutation StudentManagementDeleteStudent($id: ID!) {
        deleteStudent(id: $id) {
            id
            name
        }
    }
`;
