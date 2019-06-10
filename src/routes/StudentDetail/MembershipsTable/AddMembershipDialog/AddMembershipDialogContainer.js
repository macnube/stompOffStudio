import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_COURSES, CREATE_COURSE_STUDENT } from './graphql';
import AddMembershipDialog from './AddMembershipDialog';

const getCourses = ({ render, id }) => (
    <Query query={GET_COURSES}>{render}</Query>
);

const createMembership = ({ render }) => (
    <Mutation mutation={CREATE_COURSE_STUDENT}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCourses,
    createMembership,
};

const AddMembershipDialogContainer = ({ open, handleClose, studentId }) => (
    <Adopt mapper={mapper}>
        {({
            getCourses: { data, loading, error },
            createMembership: { mutation: createMembershipMutation },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            return (
                <AddMembershipDialog
                    open={open}
                    handleClose={handleClose}
                    studentId={studentId}
                    createMembership={createMembershipMutation}
                    courses={data.courses}
                />
            );
        }}
    </Adopt>
);

AddMembershipDialogContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    studentId: PropTypes.string.isRequired,
};

export default AddMembershipDialogContainer;
