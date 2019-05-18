import gql from 'graphql-tag';

const DETAIL_COURSE_FRAGMENT = gql`
    fragment DetailCourseFragment on Course {
        id
        name
        description
        startDate
        startTime
        day
        duration
        studentLimit
        teachers {
            id
            name
            email
        }
        courseStudents {
            id
            student {
                id
                email
                name
            }
            course {
                id
            }
            role
            status
            waitlistDate
        }
        instances {
            id
            date
            topic
            notes
            recapUrl
            participants {
                id
                status
            }
        }
        room {
            id
            name
            capacity
            studio {
                id
                name
            }
        }
    }
`;

const DETAIL_COURSE_INSTANCE_FRAGMENT = gql`
    fragment CreateCourseInstanceFragment on CourseInstance {
        topic
        notes
        date
        recapUrl
        course {
            ...DetailCourseFragment
        }
    }
    ${DETAIL_COURSE_FRAGMENT}
`;

export const GET_COURSE = gql`
    query CourseDetailGetCourse($id: ID!) {
        course(id: $id) {
            ...DetailCourseFragment
        }
    }
    ${DETAIL_COURSE_FRAGMENT}
`;

export const UPDATE_COURSE = gql`
    mutation CourseDetailUpdateCourse(
        $id: ID!
        $name: String!
        $description: String
        $startDate: DateTime
        $startTime: String
        $duration: Int
        $studentLimit: Int
        $day: CourseDay
    ) {
        updateCourse(
            id: $id
            name: $name
            description: $description
            startDate: $startDate
            startTime: $startTime
            duration: $duration
            studentLimit: $studentLimit
            day: $day
        ) {
            id
            name
            description
            startDate
            startTime
            duration
            studentLimit
            day
        }
    }
`;

export const REMOVE_TEACHER_FROM_COURSE = gql`
    mutation CourseDetailAddTeacherToCourse($id: ID!, $teacherId: ID!) {
        removeTeacherFromCourse(id: $id, teacherId: $teacherId) {
            id
            name
            teachers {
                id
                name
                email
            }
        }
    }
`;

export const CREATE_COURSE_STUDENT = gql`
    mutation StudentDetailCreateCourseStudent(
        $courseId: ID!
        $studentId: ID!
        $role: DanceRole!
        $status: CourseStudentStatus
    ) {
        createCourseStudent(
            courseId: $courseId
            studentId: $studentId
            role: $role
            status: $status
        ) {
            id
            role
            course {
                ...DetailCourseFragment
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
    ${DETAIL_COURSE_FRAGMENT}
`;

export const DELETE_COURSE_STUDENT = gql`
    mutation StudentDetailDeleteCourseStudent($id: ID!) {
        deleteCourseStudent(id: $id) {
            id
        }
    }
`;

export const UPDATE_COURSE_STUDENT_STATUS = gql`
    mutation StudentDetailUpdateCourseStudentStatus(
        $id: ID!
        $status: CourseStudentStatus!
    ) {
        updateCourseStudentStatus(id: $id, status: $status) {
            id
            student {
                id
                email
                name
            }
            course {
                id
            }
            role
            status
            waitlistDate
        }
    }
`;

export const GET_STUDENT_FRAGMENT = gql`
    fragment CourseDetailStudent on Student {
        id
        courses {
            id
        }
    }
`;

export const CREATE_COURSE_INSTANCE = gql`
    mutation StudentDetailCreateCourseInstance(
        $topic: String!
        $notes: String
        $date: DateTime!
        $recapUrl: String
        $courseId: ID!
        $studentIds: [ID!]!
    ) {
        createCourseInstance(
            topic: $topic
            notes: $notes
            date: $date
            recapUrl: $recapUrl
            courseId: $courseId
            studentIds: $studentIds
        ) {
            ...CreateCourseInstanceFragment
        }
    }
    ${DETAIL_COURSE_INSTANCE_FRAGMENT}
`;

export const DELETE_COURSE_INSTANCE = gql`
    mutation StudentDetailDeleteCourseInstance($id: ID!) {
        deleteCourseInstance(id: $id) {
            id
        }
    }
`;
