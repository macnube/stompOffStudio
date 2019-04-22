import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_COURSES, CREATE_COURSE_STUDENT } from './graphql';
import AddCourseStudentForm from './AddCourseStudentForm';

const getCourses = ({ render, id }) => (
    <Query query={GET_COURSES}>{render}</Query>
);

const createCourseStudent = ({ render }) => (
    <Mutation mutation={CREATE_COURSE_STUDENT}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCourses,
    createCourseStudent,
};

const AddTeacherFormContainer = ({ open, handleClose, studentId }) => (
    <Adopt mapper={mapper}>
        {({
            getCourses: { data, loading, error },
            createCourseStudent: { mutation: createCourseStudentMutation },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            return (
                <AddCourseStudentForm
                    open={open}
                    handleClose={handleClose}
                    studentId={studentId}
                    createCourseStudent={createCourseStudentMutation}
                    courses={data.courses}
                />
            );
        }}
    </Adopt>
);

AddTeacherFormContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    studentId: PropTypes.string.isRequired,
};

export default AddTeacherFormContainer;
