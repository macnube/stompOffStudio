import gql from 'graphql-tag';

export const GET_TEACHERS = gql`
    query CourseDetailGetTeachers {
        teachers {
            id
            name
            email
        }
    }
`;

export const ADD_TEACHER_TO_COURSE = gql`
    mutation CourseDetailAddTeacherToCourse($id: ID!, $teacherId: ID!) {
        addTeacherToCourse(id: $id, teacherId: $teacherId) {
            id
            name
            teachers {
                id
                name
                email
            }
        }
    }
`;

export const REMOVE_TEACHER_FROM_COURSE = gql`
    mutation CourseDetailAddTeacherToCourse($id: ID!, $teacherId: ID!) {
        removeTeacherFromCourse(id: $id, teacherId: $teacherId) {
            id
            name
            teachers {
                id
                name
                email
            }
        }
    }
`;
