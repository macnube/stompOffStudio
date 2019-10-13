import gql from 'graphql-tag';
import {
    SMALL_CARD_FRAGMENT,
    SMALL_COURSE_FRAGMENT,
    SMALL_MEMBERSHIP_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
} from 'graphql';

const REGISTRATION_MANAGEMENT_STUDENT_FRAGMENT = gql`
    fragment RegistrationManagementStudentFragment on Student {
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

export const GET_COURSE_IDS = gql`
    query RegistrationManagementGetCourseIds {
        courses {
            ...SmallCourseFragment
        }
    }
    ${SMALL_COURSE_FRAGMENT}
`;

export const GET_STUDENTS = gql`
    query RegistrationManagementGetStudents {
        students {
            ...SmallStudentFragment
        }
    }
    ${SMALL_STUDENT_FRAGMENT}
`;

export const IMPORT_STUDENT = gql`
    mutation RegistrationManagementImportStudent(
        $name: String!
        $email: String!
        $mobile: String
        $role: DanceRole!
        $courseId: ID!
        $waitlistDate: DateTime!
    ) {
        importStudent(
            name: $name
            email: $email
            mobile: $mobile
            courseId: $courseId
            role: $role
            waitlistDate: $waitlistDate
        ) {
            ...RegistrationManagementStudentFragment
        }
    }
    ${REGISTRATION_MANAGEMENT_STUDENT_FRAGMENT}
`;
