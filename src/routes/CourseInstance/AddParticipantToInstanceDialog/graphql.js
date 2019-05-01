import gql from 'graphql-tag';

export const GET_COURSE_STUDENTS = gql`
    query CourseInstanceGetStudents($courseInstanceId: ID!) {
        courseStudentsByCourseInstance(courseInstanceId: $courseInstanceId) {
            id
            student {
                id
                name
                email
            }
            role
        }
    }
`;

// Probably need to start using fragments
// This mutation needs to update the necessary UI for Course Instance
export const CREATE_PARTICIPANT = gql`
    mutation CourseInstanceCreateParticipant(
        $courseInstanceId: ID!
        $courseStudentId: ID!
        $status: ParticipantStatus!
    ) {
        createParticipant(
            courseInstanceId: $courseInstanceId
            courseStudentId: $courseStudentId
            status: $status
        ) {
            id
            status
            courseInstance {
                id
                participants {
                    id
                    courseStudent {
                        id
                        student {
                            id
                            name
                            email
                        }
                        role
                    }
                    status
                }
            }
        }
    }
`;
