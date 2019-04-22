import gql from 'graphql-tag';

export const GET_STUDENTS = gql`
    query CourseDetailGetStudents {
        students {
            id
            email
            name
            courses {
                id
            }
        }
    }
`;

// Probably need to start using fragments
// This mutation needs to update the necessary UI for Course Detail
// And for student detail
export const CREATE_COURSE_STUDENT = gql`
    mutation StudentDetailCreateCourseStudent(
        $courseId: ID!
        $studentId: ID!
        $role: DanceRole!
    ) {
        createCourseStudent(
            courseId: $courseId
            studentId: $studentId
            role: $role
        ) {
            id
            role
            course {
                id
                name
                courseStudents {
                    id
                }
            }
            student {
                id
                name
                email
                courses {
                    id
                }
            }
        }
    }
`;
