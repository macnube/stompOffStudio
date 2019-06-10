import gql from 'graphql-tag';

export const GET_STUDENTS = gql`
    query CourseDetailGetStudents {
        students {
            id
            email
            name
            memberships {
                id
                course {
                    id
                }
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
