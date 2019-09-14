import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { LOG_PARTICIPANT_STATUS } from 'routes/CourseInstance/graphql';
import { CREATE_CARD } from 'routes/StudentDetail/graphql';
import { REMOVE_CARD_PARTICIPATION } from 'routes/CardDetail/graphql';
import { GET_COURSE_INSTANCE, LOG_CARD_PARTICIPATION } from './graphql';
import CourseAttendance from './CourseAttendance';
import { getEndOfYesterday } from 'utils/date';

const getCourseInstance = ({ render, id }) => {
    return (
        <Query
            query={GET_COURSE_INSTANCE}
            variables={{ id, date: getEndOfYesterday() }}
        >
            {render}
        </Query>
    );
};

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

const removeCardParticipation = ({ render }) => (
    <Mutation mutation={REMOVE_CARD_PARTICIPATION}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCourseInstance,
    logParticipantStatus,
    logCardParticipation,
    createCard,
    removeCardParticipation,
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
                    removeCardParticipation: {
                        mutation: removeCardParticipationMutation,
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
                            removeCardParticipation={
                                removeCardParticipationMutation
                            }
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
