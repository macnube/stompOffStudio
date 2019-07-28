import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';
import startOfDay from 'date-fns/startOfDay';

import {
    LOG_ABSENCE_GET_COURSES_BY_STUDENT,
    LOG_ABSENCE_LOG_COURSE_ABSENCE,
} from './graphql';
import {
    LOG_PARTICIPANT_ABSENCE,
    GET_COURSE,
} from 'routes/StudentCourseDetail/graphql';
import { UPCOMING_ABSENCES_BY_STUDENT } from 'routes/StudentOverviewTab/graphql';
import LogAbsenceDialog from './LogAbsenceDialog';
import { withUser } from 'core/user';

const getCourses = ({ render, id, date }) => (
    <Query query={LOG_ABSENCE_GET_COURSES_BY_STUDENT} variables={{ id, date }}>
        {render}
    </Query>
);

const logCourseAbsence = ({ render, id, date }) => (
    <Mutation
        mutation={LOG_ABSENCE_LOG_COURSE_ABSENCE}
        update={(cache, { data: { logCourseAbsence } }) => {
            try {
                const { upcomingAbsencesByStudent } = cache.readQuery({
                    query: UPCOMING_ABSENCES_BY_STUDENT,
                    variables: { id },
                });
                if (upcomingAbsencesByStudent) {
                    cache.writeQuery({
                        query: UPCOMING_ABSENCES_BY_STUDENT,
                        variables: { id },
                        data: {
                            upcomingAbsencesByStudent: upcomingAbsencesByStudent.concat(
                                [logCourseAbsence]
                            ),
                        },
                    });
                }
            } catch (e) {
                console.log('error is: ', e);
            }
            try {
                const { course } = cache.readQuery({
                    query: GET_COURSE,
                    variables: {
                        id: logCourseAbsence.course.id,
                        date,
                        studentId: id,
                    },
                });
                const newCourse = {
                    ...course,
                    absences: course.absences.concat([logCourseAbsence]),
                };
                cache.writeQuery({
                    query: GET_COURSE,
                    variables: {
                        id: logCourseAbsence.course.id,
                        date,
                        studentId: id,
                    },
                    data: {
                        course: newCourse,
                    },
                });
            } catch (e) {
                console.log('e is: ', e);
            }
        }}
    >
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
                logCourseAbsence: {
                    mutation: logCourseAbsenceMutation,
                    result: logCourseAbsenceMutationResult,
                },
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
                        successDate={
                            logCourseAbsenceMutationResult.data
                                ? logCourseAbsenceMutationResult.data
                                      .logCourseAbsence.date
                                : ''
                        }
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
