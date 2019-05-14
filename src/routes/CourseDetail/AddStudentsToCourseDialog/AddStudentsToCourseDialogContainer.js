import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_STUDENTS } from './graphql';
import AddStudentsToCourseDialog from './AddStudentsToCourseDialog';

const getStudents = ({ render }) => (
    <Query query={GET_STUDENTS}>{render}</Query>
);

const mapper = {
    getStudents,
};

const AddStudentsToCourseDialogContainer = ({
    open,
    handleClose,
    title,
    courseId,
    customToolbarSelect,
}) => (
    <Adopt mapper={mapper}>
        {({ getStudents: { data, loading, error } }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            return (
                <AddStudentsToCourseDialog
                    open={open}
                    handleClose={handleClose}
                    courseId={courseId}
                    students={data.students}
                    title={title}
                    customToolbarSelect={customToolbarSelect}
                />
            );
        }}
    </Adopt>
);

AddStudentsToCourseDialogContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    customToolbarSelect: PropTypes.func.isRequired,
    courseId: PropTypes.string.isRequired,
};

export default AddStudentsToCourseDialogContainer;
