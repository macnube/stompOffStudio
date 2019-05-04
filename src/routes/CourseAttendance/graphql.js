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
