import React from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_COURSE_STUDENTS, CREATE_PARTICIPANT } from './graphql';
import AddParticipantToInstanceDialog from './AddParticipantToInstanceDialog';

const getCourseStudents = ({ render, courseInstanceId }) => (
    <Query query={GET_COURSE_STUDENTS} variables={{ courseInstanceId }}>
        {render}
    </Query>
);

const createParticipant = ({ render }) => (
    <Mutation mutation={CREATE_PARTICIPANT}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCourseStudents,
    createParticipant,
};

const AddParticipantToInstanceDialogContainer = ({
    open,
    handleClose,
    courseInstanceId,
    participantCourseStudentIds,
}) => (
    <Adopt mapper={mapper} courseInstanceId={courseInstanceId}>
        {({
            getCourseStudents: { data, loading, error },
            createParticipant: {
                mutation: createParticipantMutation,
                result: createParticipantResult,
            },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (createParticipantResult) {
                console.log(
                    'createParticipantResult is: ',
                    createParticipantResult.data
                );
            }
            if (data.courseStudentsByCourseInstance) {
                return (
                    <AddParticipantToInstanceDialog
                        open={open}
                        handleClose={handleClose}
                        courseInstanceId={courseInstanceId}
                        createParticipant={createParticipantMutation}
                        courseStudents={data.courseStudentsByCourseInstance}
                        participantCourseStudentIds={
                            participantCourseStudentIds
                        }
                    />
                );
            }
        }}
    </Adopt>
);

AddParticipantToInstanceDialogContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    courseInstanceId: PropTypes.string.isRequired,
    participantCourseStudentIds: PropTypes.array.isRequired,
};

export default AddParticipantToInstanceDialogContainer;
