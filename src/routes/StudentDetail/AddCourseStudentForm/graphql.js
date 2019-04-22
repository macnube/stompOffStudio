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
            courseStudents {
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
