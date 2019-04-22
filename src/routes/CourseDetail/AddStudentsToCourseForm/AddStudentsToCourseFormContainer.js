import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_STUDENTS, CREATE_COURSE_STUDENT } from './graphql';
import AddStudentsToCourseForm from './AddStudentsToCourseForm';

const getStudents = ({ render }) => (
    <Query query={GET_STUDENTS}>{render}</Query>
);

const createCourseStudent = ({ render }) => (
    <Mutation mutation={CREATE_COURSE_STUDENT}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getStudents,
    createCourseStudent,
};

const AddStudentsToCourseFormContainer = ({
    open,
    handleClose,
    courseId,
    title,
}) => (
    <Adopt mapper={mapper}>
        {({
            getStudents: { data, loading, error },
            createCourseStudent: { mutation: createCourseStudentMutation },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            return (
                <AddStudentsToCourseForm
                    open={open}
                    handleClose={handleClose}
                    courseId={courseId}
                    createCourseStudent={createCourseStudentMutation}
                    students={data.students}
                    title={title}
                />
            );
        }}
    </Adopt>
);

AddStudentsToCourseFormContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    courseId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default AddStudentsToCourseFormContainer;
