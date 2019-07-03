import gql from 'graphql-tag';

import {
    MEDIUM_COURSE_INSTANCE_FRAGMENT,
    SMALL_PARTICIPANT_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
    SMALL_COURSE_FRAGMENT,
    SMALL_MEMBERSHIP_FRAGMENT,
    MEDIUM_CARD_FRAGMENT,
    LARGE_CARD_FRAGMENT,
} from 'graphql';

export const GET_COURSE_INSTANCE_FRAGMENT = gql`
    fragment GetCourseInstanceFragment on CourseInstance {
        id
        participants {
            id
        }
    }
`;

const COURSE_INSTANCE_PARTICIPANT_FRAGMENT = gql`
    fragment CourseInstanceParticipantFragment on Participant {
        ...SmallParticipantFragment
        membership {
            ...SmallMembershipFragment
            course {
                ...SmallCourseFragment
            }
            student {
                ...SmallStudentFragment

                cards {
                    ...MediumCardFragment
                }
            }
        }
    }
    ${MEDIUM_CARD_FRAGMENT}
    ${SMALL_COURSE_FRAGMENT}
    ${SMALL_MEMBERSHIP_FRAGMENT}
    ${SMALL_STUDENT_FRAGMENT}
    ${SMALL_PARTICIPANT_FRAGMENT}
`;

export const COURSE_INSTANCE_FRAGMENT = gql`
    fragment CourseInstanceFragment on CourseInstance {
        ...MediumCourseInstanceFragment
        participants {
            ...CourseInstanceParticipantFragment
        }
        course {
            ...SmallCourseFragment
        }
    }
    ${SMALL_COURSE_FRAGMENT}
    ${COURSE_INSTANCE_PARTICIPANT_FRAGMENT}
    ${MEDIUM_COURSE_INSTANCE_FRAGMENT}
`;

export const GET_COURSE_INSTANCE = gql`
    query CourseInstanceGetCourseInstance($id: ID!) {
        courseInstance(id: $id) {
            ...CourseInstanceFragment
        }
    }
    ${COURSE_INSTANCE_FRAGMENT}
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
            ...MediumCourseInstanceFragment
        }
    }
    ${MEDIUM_COURSE_INSTANCE_FRAGMENT}
`;

export const LOG_PARTICIPANT_STATUS = gql`
    mutation CourseInstanceLogParticipantStatus(
        $id: ID!
        $status: ParticipantStatus!
    ) {
        logParticipantStatus(id: $id, status: $status) {
            ...CourseInstanceParticipantFragment
        }
    }
    ${COURSE_INSTANCE_PARTICIPANT_FRAGMENT}
`;

export const DELETE_PARTICIPANT = gql`
    mutation CourseInstanceDeleteParticipant($id: ID!) {
        deleteParticipant(id: $id) {
            id
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
            ...LargeCardFragment
        }
    }
    ${LARGE_CARD_FRAGMENT}
`;

export const DEACTIVATE_CARD = gql`
    mutation CourseInstanceDeactivateCard($id: ID!) {
        deactivateCard(id: $id) {
            id
            active
        }
    }
`;
