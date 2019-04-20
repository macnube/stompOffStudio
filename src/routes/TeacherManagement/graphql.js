import gql from 'graphql-tag';

export const GET_TEACHERS = gql`
    query TeacherManagementGetTeachers {
        teachers {
            id
            name
            email
            mobile
            classes {
                id
                name
            }
        }
    }
`;

export const CREATE_TEACHER = gql`
    mutation TeacherManagementCreateTeacher(
        $name: String!
        $email: String!
        $mobile: String
    ) {
        createTeacher(name: $name, email: $email, mobile: $mobile) {
            id
            name
            email
            mobile
            classes {
                id
                name
            }
        }
    }
`;

export const UPDATE_TEACHER = gql`
    mutation TeacherManagementUpdateTeacher(
        $id: ID!
        $name: String!
        $email: String!
        $mobile: String
    ) {
        updateTeacher(id: $id, name: $name, email: $email, mobile: $mobile) {
            id
            name
            email
            mobile
            classes {
                id
                name
            }
        }
    }
`;

export const DELETE_TEACHER = gql`
    mutation TeacherManagementDeleteTeacher($id: ID!) {
        deleteTeacher(id: $id) {
            id
            name
        }
    }
`;
