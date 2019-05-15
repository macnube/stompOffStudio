import gql from 'graphql-tag';

export const GET_STUDENTS = gql`
    query CourseDetailGetStudents {
        students {
            id
            email
            name
            courses {
                id
                course {
                    id
                }
            }
        }
    }
`;

// Probably need to start using fragments
// This mutation needs to update the necessary UI for Course Detail
// And for student detail
export const ADD_PARTICIPANT_TO_INSTANCE = gql`
    mutation CourseInstanceAddParticipantToCourseInstance(
        $id: ID!
        $studentId: ID!
    ) {
        addParticipantToCourseInstance(id: $id, studentId: $studentId) {
            id
            topic
            notes
            date
            recapUrl
            participants {
                id
                student {
                    id
                    name
                    email
                    courses {
                        id
                    }
                    cards {
                        id
                        expirationDate
                        active
                        value
                        participationHistory {
                            id
                        }
                        payment {
                            id
                            date
                        }
                        paid
                    }
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
                    role
                }
            }
        }
    }
`;
