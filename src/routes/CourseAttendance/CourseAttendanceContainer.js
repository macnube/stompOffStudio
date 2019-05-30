import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_COURSE_INSTANCE,
    LOG_CARD_PARTICIPATION,
    LOG_PARTICIPANT_STATUS,
} from 'src/routes/CourseInstance/graphql';
import { CREATE_CARD } from 'src/routes/StudentDetail/graphql';
import CourseAttendance from './CourseAttendance';

const getCourseInstance = ({ render, id }) => (
    <Query query={GET_COURSE_INSTANCE} variables={{ id }}>
        {render}
    </Query>
);

const logParticipantStatus = ({ render, id }) => (
    <Mutation mutation={LOG_PARTICIPANT_STATUS}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const logCardParticipation = ({ render, id }) => (
    <Mutation mutation={LOG_CARD_PARTICIPATION}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const createCard = ({ render }) => (
    <Mutation mutation={CREATE_CARD}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCourseInstance,
    logParticipantStatus,
    logCardParticipation,
    createCard,
};

const CourseAttendanceContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({
                    getCourseInstance: { data, loading, error },
                    logParticipantStatus: {
                        mutation: logParticipantStatusMutation,
                    },
                    logCardParticipation: {
                        mutation: logCardParticipationMutation,
                    },
                    createCard: {
                        mutation: createCardMutation,
                        result: createCardResult,
                    },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;

                    if (createCardResult.data) {
                        return (
                            <CourseAttendance
                                courseInstance={data.courseInstance}
                                logParticipantStatus={
                                    logParticipantStatusMutation
                                }
                                logCardParticipation={
                                    logCardParticipationMutation
                                }
                                createCard={createCardMutation}
                                card={createCardResult.data.createCard}
                            />
                        );
                    }
                    return (
                        <CourseAttendance
                            courseInstance={data.courseInstance}
                            logParticipantStatus={logParticipantStatusMutation}
                            logCardParticipation={logCardParticipationMutation}
                            createCard={createCardMutation}
                        />
                    );
                }}
            </Adopt>
        );
    }
    return (
        <Redirect
            to={{
                pathname: '/courseAttendance',
            }}
        />
    );
};

CourseAttendanceContainer.propTypes = {
    location: PropTypes.object.isRequired,
};

export default CourseAttendanceContainer;
