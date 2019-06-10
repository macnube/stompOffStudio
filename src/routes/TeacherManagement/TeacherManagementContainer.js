import React from 'react';
import filter from 'lodash/filter';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_TEACHERS,
    DELETE_TEACHER,
    CREATE_TEACHER,
    UPDATE_TEACHER,
} from './graphql';
import TeacherManagement from './TeacherManagement';

const getTeachers = ({ render }) => (
    <Query query={GET_TEACHERS}>{render}</Query>
);

const deleteTeacher = ({ render }) => (
    <Mutation
        mutation={DELETE_TEACHER}
        update={(cache, { data: { deleteTeacher } }) => {
            const { teachers } = cache.readQuery({ query: GET_TEACHERS });
            cache.writeQuery({
                query: GET_TEACHERS,
                data: {
                    teachers: filter(
                        teachers,
                        studio => studio.id !== deleteTeacher.id
                    ),
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const updateTeacher = ({ render }) => (
    <Mutation mutation={UPDATE_TEACHER}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const createTeacher = ({ render }) => (
    <Mutation
        mutation={CREATE_TEACHER}
        update={(cache, { data: { createTeacher } }) => {
            const { teachers } = cache.readQuery({ query: GET_TEACHERS });
            cache.writeQuery({
                query: GET_TEACHERS,
                data: { teachers: teachers.concat([createTeacher]) },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getTeachers,
    deleteTeacher,
    createTeacher,
    updateTeacher,
};

const TeacherManagementContainer = () => (
    <Adopt mapper={mapper}>
        {({
            getTeachers: { data, loading, error },
            deleteTeacher: { mutation: deleteTeacherMutation },
            createTeacher: { mutation: createTeacherMutation },
            updateTeacher: { mutation: updateTeacherMutation },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.teachers) return `404: Session not found`;
            return (
                <TeacherManagement
                    teachers={data.teachers}
                    deleteTeacher={deleteTeacherMutation}
                    createTeacher={createTeacherMutation}
                    updateTeacher={updateTeacherMutation}
                />
            );
        }}
    </Adopt>
);

export default TeacherManagementContainer;
