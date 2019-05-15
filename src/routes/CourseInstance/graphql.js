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
                    student {
                        id
                        name
                        email
                    }
                    status
                }
            }
        }
    }
`;

export const LOG_CARD_PARTICIPATION = gql`
    mutation CourseInstanceLogCardParticipation(
        $id: ID!
        $participantId: ID!
        $value: Int!
    ) {
        logCardParticipation(
            id: $id
            participantId: $participantId
            value: $value
        ) {
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
`;

export const DEACTIVATE_CARD = gql`
    mutation CourseInstanceDeactivateCard($id: ID!) {
        deactivateCard(id: $id) {
            id
            active
        }
    }
`;
