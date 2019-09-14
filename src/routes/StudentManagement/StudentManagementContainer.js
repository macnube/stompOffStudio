import React from 'react';
import filter from 'lodash/filter';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_STUDENTS,
    DELETE_STUDENT,
    CREATE_STUDENT,
    SEND_MAILGUN_EMAIL,
} from './graphql';
import StudentManagement from './StudentManagement';

const getStudents = ({ render }) => (
    <Query query={GET_STUDENTS}>{render}</Query>
);

const deleteStudent = ({ render }) => (
    <Mutation
        mutation={DELETE_STUDENT}
        update={(cache, { data: { deleteStudent } }) => {
            const { students } = cache.readQuery({ query: GET_STUDENTS });
            cache.writeQuery({
                query: GET_STUDENTS,
                data: {
                    students: filter(
                        students,
                        student => student.id !== deleteStudent.id
                    ),
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const createStudent = ({ render }) => (
    <Mutation
        mutation={CREATE_STUDENT}
        update={(cache, { data: { createStudent } }) => {
            const { students } = cache.readQuery({ query: GET_STUDENTS });
            cache.writeQuery({
                query: GET_STUDENTS,
                data: { students: students.concat([createStudent]) },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const sendMailgunEmail = ({ render }) => (
    <Mutation mutation={SEND_MAILGUN_EMAIL}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getStudents,
    deleteStudent,
    createStudent,
    sendMailgunEmail,
};

const StudentManagementContainer = () => (
    <Adopt mapper={mapper}>
        {({
            getStudents: { data, loading, error },
            deleteStudent: { mutation: deleteStudentMutation },
            createStudent: { mutation: createStudentMutation },
            sendMailgunEmail: { mutation: sendMailgunEmailMutation },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.students) return `404: Session not found`;
            return (
                <StudentManagement
                    students={data.students}
                    deleteStudent={deleteStudentMutation}
                    createStudent={createStudentMutation}
                    sendMailgunEmail={sendMailgunEmailMutation}
                />
            );
        }}
    </Adopt>
);

export default StudentManagementContainer;
