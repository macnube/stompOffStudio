import gql from 'graphql-tag';

import { MEDIUM_TEACHER_FRAGMENT } from 'graphql';

export const GET_TEACHERS = gql`
    query TeacherManagementGetTeachers {
        teachers {
            ...MediumTeacherFragment
        }
    }
    ${MEDIUM_TEACHER_FRAGMENT}
`;

export const CREATE_TEACHER = gql`
    mutation TeacherManagementCreateTeacher(
        $name: String!
        $email: String!
        $mobile: String
    ) {
        createTeacher(name: $name, email: $email, mobile: $mobile) {
            ...MediumTeacherFragment
        }
        ${MEDIUM_TEACHER_FRAGMENT}
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
            ...MediumTeacherFragment
        }
        ${MEDIUM_TEACHER_FRAGMENT}
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
