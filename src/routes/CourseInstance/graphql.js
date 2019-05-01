import gql from 'graphql-tag';

export const GET_COURSE_INSTANCE = gql`
    query CourseInstanceGetCourseInstance($id: ID!) {
        courseInstance(id: $id) {
            id
            topic
            notes
            date
            recapUrl
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
            course {
                id
                courseStudents {
                    id
                    student {
                        id
                        name
                        email
                    }
                }
            }
        }
    }
`;

export const UPDATE_COURSE_INSTANCE = gql`
    mutation CourseDetailUpdateCourseInstance(
        $id: ID!
        $topic: String!
        $notes: String
        $date: DateTime!
        $recapUrl: String
    ) {
        updateCourseInstance(
            id: $id
            topic: $topic
            notes: $notes
            date: $date
            recapUrl: $recapUrl
        ) {
            id
            topic
            notes
            date
            recapUrl
        }
    }
`;

export const DELETE_PARTICIPANT = gql`
    mutation CourseInstanceDeleteParticipant($id: ID!) {
        deleteParticipant(id: $id) {
            id
        }
    }
`;
