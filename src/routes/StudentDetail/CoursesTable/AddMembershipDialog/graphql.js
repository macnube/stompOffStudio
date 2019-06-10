import gql from 'graphql-tag';

export const GET_COURSES = gql`
    query StudentDetailGetCourses {
        courses {
            id
            name
            description
            startDate
            startTime
            duration
            studentLimit
            teachers {
                id
                name
            }
            memberships {
                id
                course {
                    id
                }
                student {
                    id
                }
                role
            }
        }
    }
`;

// Probably need to start using fragments
// This mutation needs to update the necessary UI for Course Detail
// And for student detail
export const CREATE_COURSE_STUDENT = gql`
    mutation StudentDetailCreateMembership(
        $courseId: ID!
        $studentId: ID!
        $role: DanceRole!
    ) {
        createMembership(
            courseId: $courseId
            studentId: $studentId
            role: $role
        ) {
            id
            role
            course {
                id
                name
                memberships {
                    id
                }
            }
            student {
                id
                name
                email
                memberships {
                    id
                }
            }
        }
    }
`;
