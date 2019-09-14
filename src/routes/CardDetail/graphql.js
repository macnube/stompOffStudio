import gql from 'graphql-tag';

import {
    MEDIUM_CARD_FRAGMENT,
    SMALL_PARTICIPANT_FRAGMENT,
    SMALL_COURSE_INSTANCE_FRAGMENT,
    SMALL_STUDENT_FRAGMENT,
} from 'graphql';

const CARD_DETAIL_CARD_FRAGMENT = gql`
    fragment CardDetailCardFragment on Card {
        ...MediumCardFragment
        participationHistory {
            ...SmallParticipantFragment
            courseInstance {
                ...SmallCourseInstanceFragment
                course {
                    name
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
    ) {
        updateCard(id: $id, expirationDate: $expirationDate, value: $value) {
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
