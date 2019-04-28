import gql from 'graphql-tag';

export const GET_COURSES = gql`
    query CourseManagementGetCourses {
        courses {
            id
            name
            description
            startDate
            startTime
            duration
            teachers {
                id
                name
            }
            courseStudents {
                id
                student {
                    id
                    name
                }
                course {
                    id
                }
                role
            }
            instances {
                id
            }
            studentLimit
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

export const CREATE_COURSE = gql`
    mutation CourseManagementCreateCourse(
        $name: String!
        $description: String
        $startDate: DateTime
        $startTime: String
        $duration: Int
        $studentLimit: Int
        $roomId: ID!
    ) {
        createCourse(
            name: $name
            description: $description
            startDate: $startDate
            startTime: $startTime
            duration: $duration
            studentLimit: $studentLimit
            roomId: $roomId
        ) {
            id
            name
            description
            startDate
            startTime
            duration
            teachers {
                id
                name
            }
            courseStudents {
                id
                student {
                    id
                    name
                }
                role
            }
            instances {
                id
            }
            studentLimit
            room {
                id
                name
            }
        }
    }
`;

export const DELETE_COURSE = gql`
    mutation CourseManagementDeleteCourse($id: ID!) {
        deleteCourse(id: $id) {
            id
            name
        }
    }
`;
