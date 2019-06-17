import gql from 'graphql-tag';

import {
    LARGE_COURSE_FRAGMENT,
    SMALL_COURSE_INSTANCE_FRAGMENT,
    MEDIUM_ROOM_FRAGMENT,
} from 'graphql';

const DETAIL_COURSE_FRAGMENT = gql`
    fragment DetailCourseFragment on Course {
        ...LargeCourseFragment
        instances {
            ...SmallCourseInstanceFragment
        }
        room {
            ...MediumRoomFragment
        }
    }
    ${MEDIUM_ROOM_FRAGMENT}
    ${SMALL_COURSE_INSTANCE_FRAGMENT}
    ${LARGE_COURSE_FRAGMENT}
`;

export const GET_COURSE = gql`
    query CourseDetailGetCourse($id: ID!) {
        course(id: $id) {
            ...DetailCourseFragment
        }
    }
    ${DETAIL_COURSE_FRAGMENT}
`;
