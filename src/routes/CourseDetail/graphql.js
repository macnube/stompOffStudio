import gql from 'graphql-tag';

export const GET_COURSE = gql`
    query CourseDetailGetCourse($id: ID!) {
        course(id: $id) {
            id
            name
            description
            startDate
            startTime
            duration
            studentLimit
            teachers {
                id
                name
                email
            }
            courseStudents {
                id
                student {
                    id
                    email
                    name
                }
                role
            }
            courseHistory {
                id
            }
            room {
                id
                name
                capacity
                studio {
                    id
                    name
                }
            }
        }
    }
`;

export const UPDATE_COURSE = gql`
    mutation CourseDetailUpdateCourse(
        $id: ID!
        $name: String!
        $description: String
        $startDate: DateTime
        $startTime: String
        $duration: Int
        $studentLimit: Int
    ) {
        updateCourse(
            id: $id
            name: $name
            description: $description
            startDate: $startDate
            startTime: $startTime
            duration: $duration
            studentLimit: $studentLimit
        ) {
            id
            name
            description
            startDate
            startTime
            duration
            studentLimit
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
