import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_TEACHERS, ADD_TEACHER_TO_COURSE } from './graphql';
import AddTeacherForm from './AddTeacherForm';

const getTeachers = ({ render, id }) => (
    <Query query={GET_TEACHERS}>{render}</Query>
);

const addTeacherToCourse = ({ render }) => (
    <Mutation mutation={ADD_TEACHER_TO_COURSE}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getTeachers,
    addTeacherToCourse,
};

const AddTeacherFormContainer = props => (
    <Adopt mapper={mapper}>
        {({
            getTeachers: { data, loading, error },
            addTeacherToCourse: {
                mutation: addTeacherToCourseMutation,
                result: addTeacherToCourseResult,
            },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            console.log('data is: ', data.teachers);
            if (addTeacherToCourseResult.data) {
                return (
                    <AddTeacherForm
                        {...props}
                        open={false}
                        addTeacherToCourse={addTeacherToCourseMutation}
                        teachers={data.teachers}
                    />
                );
            }
            return (
                <AddTeacherForm
                    {...props}
                    addTeacherToCourse={addTeacherToCourseMutation}
                    teachers={data.teachers}
                />
            );
        }}
    </Adopt>
);

export default AddTeacherFormContainer;
