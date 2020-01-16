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
    query StudentCardDetailGetCard($id: ID!) {
        card(id: $id) {
            ...CardDetailCardFragment
        }
    }
    ${CARD_DETAIL_CARD_FRAGMENT}
`;
