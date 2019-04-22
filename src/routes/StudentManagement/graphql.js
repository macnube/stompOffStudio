import gql from 'graphql-tag';

export const GET_STUDENTS = gql`
    query StudentManagementGetStudents {
        students {
            id
            name
            email
            mobile
            courses {
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
            courses {
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
