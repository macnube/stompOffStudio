import React from 'react';
import filter from 'lodash/filter';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_STUDENTS, DELETE_STUDENT, CREATE_STUDENT } from './graphql';
import { GET_USERS, CREATE_USER } from 'routes/UserManagement/graphql';
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

const mapper = {
    getStudents,
    deleteStudent,
    createStudent,
};

const StudentManagementContainer = () => (
    <Adopt mapper={mapper}>
        {({
            getStudents: { data, loading, error },
            deleteStudent: { mutation: deleteStudentMutation },
            createStudent: { mutation: createStudentMutation },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.students) return `404: Session not found`;
            return (
                <StudentManagement
                    students={data.students}
                    deleteStudent={deleteStudentMutation}
                    createStudent={createStudentMutation}
                />
            );
        }}
    </Adopt>
);

export default StudentManagementContainer;
