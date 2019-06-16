import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_MEMBERSHIPS_BY_COURSE_INSTANCE,
    ADD_PARTICIPANT_TO_INSTANCE,
} from './graphql';
import AddMembershipsToCourseInstanceDialog from './AddMembershipsToCourseInstanceDialog';

const getMemberships = ({ render, id }) => (
    <Query
        query={GET_MEMBERSHIPS_BY_COURSE_INSTANCE}
        variables={{ courseInstanceId: id }}
        fetchPolicy="network-only"
    >
        {render}
    </Query>
);

const addParticipantToCourseInstance = ({ render }) => (
    <Mutation mutation={ADD_PARTICIPANT_TO_INSTANCE}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getMemberships,
    addParticipantToCourseInstance,
};

const AddMembershipsToCourseInstanceDialogContainer = ({
    open,
    handleClose,
    courseInstance,
}) => (
    <Adopt mapper={mapper} id={courseInstance.id}>
        {({
            getMemberships: { data, loading, error },
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
                    memberships={data.membershipsByCourseInstance}
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
