import React from 'react';
import filter from 'lodash/filter';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_STUDENT,
    DELETE_COURSE_STUDENT,
    UPDATE_STUDENT,
    GET_COURSE_STUDENTS,
} from './graphql';
import StudentDetail from './StudentDetail';

const getStudent = ({ render, id }) => (
    <Query query={GET_STUDENT} variables={{ id }}>
        {render}
    </Query>
);

const updateStudent = ({ render }) => (
    <Mutation mutation={UPDATE_STUDENT}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const deleteCourseStudent = ({ render, id }) => (
    <Mutation
        mutation={DELETE_COURSE_STUDENT}
        update={(cache, { data: { deleteCourseStudent } }) => {
            const { student } = cache.readQuery({
                query: GET_STUDENT,
                variables: {
                    id,
                },
            });
            cache.writeQuery({
                query: GET_STUDENT,
                variables: {
                    id,
                },
                data: {
                    student: {
                        ...student,
                        courses: filter(
                            student.courses,
                            studio => studio.id !== deleteCourseStudent.id
                        ),
                    },
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getStudent,
    deleteCourseStudent,
    updateStudent,
};

const StudioDetailContainer = ({ location }) => {
    const params = parse(location.search);
    console.log('params are: ', params);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({
                    getStudent: { data, loading, error },
                    deleteCourseStudent: {
                        mutation: deleteCourseStudentMutation,
                        result: deleteCourseStudentResult,
                    },
                    updateStudent: { mutation: updateStudentMutation },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    if (!data.student) return `Error: 404`;
                    console.log('student is: ', data.student);
                    console.log('result is :', deleteCourseStudentResult.data);
                    return (
                        <StudentDetail
                            student={data.student}
                            deleteCourseStudent={deleteCourseStudentMutation}
                            updateStudent={updateStudentMutation}
                        />
                    );
                }}
            </Adopt>
        );
    }
    return (
        <Redirect
            to={{
                pathname: '/studentManagement',
            }}
        />
    );
};

export default StudioDetailContainer;
