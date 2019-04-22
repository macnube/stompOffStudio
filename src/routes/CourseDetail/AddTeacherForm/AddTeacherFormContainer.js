import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_TEACHERS, ADD_TEACHER_TO_COURSE } from './graphql';
import AddTeacherForm from './AddTeacherForm';

const getTeachers = ({ render }) => (
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

const AddTeacherFormContainer = ({ open, handleClose, courseId }) => (
    <Adopt mapper={mapper}>
        {({
            getTeachers: { data, loading, error },
            addTeacherToCourse: { mutation: addTeacherToCourseMutation },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            return (
                <AddTeacherForm
                    open={open}
                    handleClose={handleClose}
                    courseId={courseId}
                    addTeacherToCourse={addTeacherToCourseMutation}
                    teachers={data.teachers}
                />
            );
        }}
    </Adopt>
);

AddTeacherFormContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    courseId: PropTypes.string.isRequired,
};

export default AddTeacherFormContainer;
