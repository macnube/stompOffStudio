import gql from 'graphql-tag';

export const GET_STUDENT = gql`
    query StudentDetailGetStudent($id: ID!) {
        student(id: $id) {
            id
            name
            email
            mobile
            courses {
                id
                course {
                    id
                    name
                }
                student {
                    id
                    name
                }
                role
            }
            cards {
                id
                expirationDate
                active
                validCount
                paid
                useHistory {
                    id
                }
            }
        }
    }
`;

export const UPDATE_STUDENT = gql`
    mutation StudentDetailUpdateStudent(
        $id: ID!
        $name: String!
        $email: String!
        $mobile: String
    ) {
        updateStudent(id: $id, name: $name, email: $email, mobile: $mobile) {
            id
            name
            email
            mobile
        }
    }
`;

export const DELETE_COURSE_STUDENT = gql`
    mutation StudentDetailDeleteCourseStudent($id: ID!) {
        deleteCourseStudent(id: $id) {
            id
        }
    }
`;

export const CREATE_CARD = gql`
    mutation StudentDetailCreateCard(
        $studentId: ID!
        $expirationDate: DateTime!
        $validCount: Int!
    ) {
        createCard(
            studentId: $studentId
            expirationDate: $expirationDate
            validCount: $validCount
        ) {
            id
            validCount
            expirationDate
            active
            paid
            useHistory {
                id
            }
        }
    }
`;

export const DELETE_CARD = gql`
    mutation StudentDetailDeleteCard($id: ID!) {
        deleteCard(id: $id) {
            id
        }
    }
`;
