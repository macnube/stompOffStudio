import React from 'react';
import startOfDay from 'date-fns/startOfDay';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_COURSE,
    LOG_COURSE_ABSENCE,
    CLEAR_COURSE_ABSENCE,
    LOG_PARTICIPANT_ABSENCE,
    CLEAR_PARTICIPANT_ABSENCE,
} from './graphql';
import { UPCOMING_ABSENCES_BY_STUDENT } from 'routes/StudentOverviewTab/graphql';
import StudentCourseDetail from './StudentCourseDetail';
import { withUser } from 'core/user';

const getCourse = ({ render, id, studentId, date }) => {
    return (
        <Query query={GET_COURSE} variables={{ id, studentId, date }}>
            {render}
        </Query>
    );
};
const logCourseAbsence = ({ render, id, studentId, date }) => (
    <Mutation
        mutation={LOG_COURSE_ABSENCE}
        update={(cache, { data: { logCourseAbsence } }) => {
            const { course } = cache.readQuery({
                query: GET_COURSE,
                variables: { id, date, studentId },
            });
            const newCourse = {
                ...course,
                absences: course.absences.concat([logCourseAbsence]),
            };
            cache.writeQuery({
                query: GET_COURSE,
                variables: { id, date, studentId },
                data: {
                    course: newCourse,
                },
            });
            try {
                const { upcomingAbsencesByStudent } = cache.readQuery({
                    query: UPCOMING_ABSENCES_BY_STUDENT,
                    variables: { id: studentId },
                });
                if (upcomingAbsencesByStudent) {
                    cache.writeQuery({
                        query: UPCOMING_ABSENCES_BY_STUDENT,
                        variables: { id: studentId },
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
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const clearCourseAbsence = ({ render, id, studentId, date }) => (
    <Mutation
        mutation={CLEAR_COURSE_ABSENCE}
        update={(cache, { data: { clearCourseAbsence } }) => {
            const { course } = cache.readQuery({
                query: GET_COURSE,
                variables: { id, date, studentId },
            });
            const newCourse = {
                ...course,
                absences: filter(
                    course.absences,
                    absence => absence.id !== clearCourseAbsence.id
                ),
            };
            cache.writeQuery({
                query: GET_COURSE,
                variables: { id, date, studentId },
                data: {
                    course: newCourse,
                },
            });
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

const clearParticipantAbsence = ({ render, id }) => (
    <Mutation mutation={CLEAR_PARTICIPANT_ABSENCE}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCourse,
    logCourseAbsence,
    clearCourseAbsence,
    logParticipantAbsence,
    clearParticipantAbsence,
};

const StudentCourseDetailContainer = ({ location, user }) => {
    const params = parse(location.search);
    const date = startOfDay(new Date());
    if (params.id) {
        return (
            <Adopt
                mapper={mapper}
                id={params.id}
                studentId={user.student.id}
                date={date}
            >
                {({
                    getCourse: { data, loading, error },
                    logCourseAbsence: { mutation: logCourseAbsenceMutation },
                    clearCourseAbsence: {
                        mutation: clearCourseAbsenceMutation,
                    },
                    logParticipantAbsence: {
                        mutation: logParticipantAbsenceMutation,
                    },
                    clearParticipantAbsence: {
                        mutation: clearParticipantAbsenceMutation,
                    },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    return (
                        <StudentCourseDetail
                            course={data.course}
                            logCourseAbsence={logCourseAbsenceMutation}
                            logParticipantAbsence={
                                logParticipantAbsenceMutation
                            }
                            clearParticipantAbsence={
                                clearParticipantAbsenceMutation
                            }
                            clearCourseAbsence={clearCourseAbsenceMutation}
                        />
                    );
                }}
            </Adopt>
        );
    }
    return (
        <Redirect
            to={{
                pathname: '/studentCourses',
            }}
        />
    );
};

StudentCourseDetailContainer.propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default withUser(StudentCourseDetailContainer);
