import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_STUDENTS, ADD_PARTICIPANT_TO_INSTANCE } from './graphql';
import AddMembershipsToCourseInstanceDialog from './AddMembershipsToCourseInstanceDialog';

const getStudents = ({ render }) => (
    <Query query={GET_STUDENTS}>{render}</Query>
);

const addParticipantToCourseInstance = ({ render }) => (
    <Mutation mutation={ADD_PARTICIPANT_TO_INSTANCE}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getStudents,
    addParticipantToCourseInstance,
};

const AddMembershipsToCourseInstanceDialogContainer = ({
    open,
    handleClose,
    courseInstance,
}) => (
    <Adopt mapper={mapper}>
        {({
            getStudents: { data, loading, error },
            addParticipantToCourseInstance: {
                mutation: addParticipantToCourseInstanceMutation,
            },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            return (
                <AddMembershipsToCourseInstanceDialog
                    open={open}
                    handleClose={handleClose}
                    courseInstance={courseInstance}
                    students={data.students}
                    addParticipantToCourseInstance={
                        addParticipantToCourseInstanceMutation
                    }
                />
            );
        }}
    </Adopt>
);

AddMembershipsToCourseInstanceDialogContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    courseInstance: PropTypes.object.isRequired,
};

export default AddMembershipsToCourseInstanceDialogContainer;
