import gql from 'graphql-tag';

import { SMALL_STUDENT_FRAGMENT } from 'graphql';

const STUDENT_MANAGEMENT_STUDENT_FRAGMENT = gql`
    fragment StudentManagementStudentFragment on Student {
        ...SmallStudentFragment
    }
    ${SMALL_STUDENT_FRAGMENT}
`;

export const GET_STUDENTS = gql`
    query StudentManagementGetStudents {
        students {
            id
            name
            email
            mobile
            memberships {
                id
                course {
                    id
                    name
                }
                student {
                    id
                    name
                }
                role
            }
            cards {
                id
            }
        }
    }
`;

export const CREATE_STUDENT = gql`
    mutation StudentManagementCreateStudent(
        $name: String!
        $email: String!
        $mobile: String
    ) {
        createStudent(name: $name, email: $email, mobile: $mobile) {
            id
            name
            email
            mobile
            memberships {
                id
                course {
                    id
                    name
                }
                role
            }
            cards {
                id
            }
        }
    }
`;

export const DELETE_STUDENT = gql`
    mutation StudentManagementDeleteStudent($id: ID!) {
        deleteStudent(id: $id) {
            id
            name
        }
    }
`;
