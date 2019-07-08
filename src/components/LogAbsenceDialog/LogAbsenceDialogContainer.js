import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';
import startOfDay from 'date-fns/startOfDay';

import { GET_COURSES_BY_STUDENT } from './graphql';
import {
    LOG_COURSE_ABSENCE,
    LOG_PARTICIPANT_ABSENCE,
} from 'routes/StudentCourseDetail/graphql';
import LogAbsenceDialog from './LogAbsenceDialog';
import { withUser } from 'core/user';

const getCourses = ({ render, id, date }) => (
    <Query query={GET_COURSES_BY_STUDENT} variables={{ id, date }}>
        {render}
    </Query>
);

const logCourseAbsence = ({ render }) => (
    <Mutation mutation={LOG_COURSE_ABSENCE}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const logParticipantAbsence = ({ render, id }) => (
    <Mutation mutation={LOG_PARTICIPANT_ABSENCE}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCourses,
    logCourseAbsence,
    logParticipantAbsence,
};

const LogAbsenceDialogContainer = ({ open, handleClose, user }) => {
    const date = startOfDay(new Date());
    return user.student && user.student.id ? (
        <Adopt mapper={mapper} id={user.student.id} date={date}>
            {({
                getCourses: { data, loading, error },
                logCourseAbsence: { mutation: logCourseAbsenceMutation },
                logParticipantAbsence: {
                    mutation: logParticipantAbsenceMutation,
                },
            }) => {
                if (loading) return null;
                if (error) return null;
                return (
                    <LogAbsenceDialog
                        courses={data.coursesByStudent}
                        logCourseAbsence={logCourseAbsenceMutation}
                        logParticipantAbsence={logParticipantAbsenceMutation}
                        open={open}
                        handleClose={handleClose}
                        user={user}
                    />
                );
            }}
        </Adopt>
    ) : null;
};

LogAbsenceDialogContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default withUser(LogAbsenceDialogContainer);
