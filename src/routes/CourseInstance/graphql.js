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
                        cards {
                            id
                            expirationDate
                            active
                            value
                            useHistory {
                                id
                            }
                            payment {
                                id
                                date
                            }
                            paid
                        }
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

export const LOG_PARTICIPANT_STATUS = gql`
    mutation CourseInstanceLogParticipantStatus(
        $id: ID!
        $status: ParticipantStatus!
    ) {
        logParticipantStatus(id: $id, status: $status) {
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

export const LOG_CARD_USAGE = gql`
    mutation CourseInstanceLogCardUsage(
        $id: ID!
        $courseInstanceId: ID!
        $value: Int!
    ) {
        logCardUsage(
            id: $id
            courseInstanceId: $courseInstanceId
            value: $value
        ) {
            id
            expirationDate
            active
            value
            useHistory {
                id
            }
            payment {
                id
                date
            }
            paid
        }
    }
`;
