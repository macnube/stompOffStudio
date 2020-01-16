import gql from 'graphql-tag';

import { SMALL_COURSE_FRAGMENT, MEDIUM_CARD_FRAGMENT } from 'graphql';

export const GET_ACTIVE_CARD_BY_STUDENT = gql`
    query OverviewActiveCard($id: ID!) {
        activeCardByStudent(id: $id) {
            ...MediumCardFragment
        }
    }
    ${MEDIUM_CARD_FRAGMENT}
`;

export const UPCOMING_ABSENCES_BY_STUDENT = gql`
    query OverviewGetAbsences($id: ID!) {
        upcomingAbsencesByStudent(id: $id) {
            id
            date
            course {
                ...SmallCourseFragment
            }
        }
    }
    ${SMALL_COURSE_FRAGMENT}
`;
