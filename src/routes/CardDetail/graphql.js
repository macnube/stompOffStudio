import gql from 'graphql-tag';

import {
    MEDIUM_CARD_FRAGMENT,
    SMALL_PARTICIPANT_FRAGMENT,
    SMALL_COURSE_INSTANCE_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
    SMALL_COURSE_FRAGMENT,
} from 'graphql';

export const CARD_DETAIL_CARD_FRAGMENT = gql`
    fragment CardDetailCardFragment on Card {
        ...MediumCardFragment
        participationHistory {
            ...SmallParticipantFragment
            courseInstance {
                ...SmallCourseInstanceFragment
                course {
                    ...SmallCourseFragment
                }
            }
        }
        student {
            ...SmallStudentFragment
        }
    }
    ${SMALL_STUDENT_FRAGMENT}
    ${MEDIUM_CARD_FRAGMENT}
    ${SMALL_PARTICIPANT_FRAGMENT}
    ${SMALL_COURSE_INSTANCE_FRAGMENT}
    ${SMALL_COURSE_FRAGMENT}
`;

export const GET_CARD = gql`
    query CardDetailGetCard($id: ID!) {
        card(id: $id) {
            ...CardDetailCardFragment
        }
    }
    ${CARD_DETAIL_CARD_FRAGMENT}
`;

export const GET_PARTICIPANT_BY_STUDENT = gql`
    query CardDetailGetParticipantByStudent($id: ID!) {
        getParticipantByStudent(id: $id) {
            ...SmallParticipantFragment
        }
    }
    ${SMALL_PARTICIPANT_FRAGMENT}
`;

export const UPDATE_CARD = gql`
    mutation CardDetailUpdateCard(
        $id: ID!
        $expirationDate: DateTime!
        $value: Int!
        $privateLessonLength: Int!
    ) {
        updateCard(
            id: $id
            expirationDate: $expirationDate
            value: $value
            privateLessonLength: $privateLessonLength
        ) {
            ...MediumCardFragment
        }
    }
    ${MEDIUM_CARD_FRAGMENT}
`;

export const REMOVE_CARD_PARTICIPATION = gql`
    mutation CardDetailRemoveCardParticipation($id: ID!, $participantId: ID!) {
        removeCardParticipation(id: $id, participantId: $participantId) {
            ...CardDetailCardFragment
        }
    }
    ${CARD_DETAIL_CARD_FRAGMENT}
`;

export const MARK_PRIVATE_LESSON_USED = gql`
    mutation CardDetailMarkPrivateLessonUsed(
        $id: ID!
        $privateLessonUseDate: DateTime!
    ) {
        markPrivateLessonUsed(
            id: $id
            privateLessonUseDate: $privateLessonUseDate
        ) {
            ...CardDetailCardFragment
        }
    }
    ${CARD_DETAIL_CARD_FRAGMENT}
`;
