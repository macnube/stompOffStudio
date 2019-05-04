import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    UPDATE_COURSE_INSTANCE,
    LOG_PARTICIPANT_STATUS,
    GET_COURSE_INSTANCE,
    LOG_CARD_USAGE,
} from './graphql';
import { CREATE_CARD } from 'routes/StudentDetail/graphql';
import CourseInstance from './CourseInstance';

const getCourseInstance = ({ render, id }) => (
    <Query query={GET_COURSE_INSTANCE} variables={{ id }}>
        {render}
    </Query>
);

const updateCourseInstance = ({ render }) => (
    <Mutation mutation={UPDATE_COURSE_INSTANCE}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const logParticipantStatus = ({ render, id }) => (
    <Mutation mutation={LOG_PARTICIPANT_STATUS}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const logCardUsage = ({ render, id }) => (
    <Mutation mutation={LOG_CARD_USAGE}>
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
    updateCourseInstance,
    logParticipantStatus,
    logCardUsage,
    createCard,
};

const CourseInstanceContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({
                    getCourseInstance: { data, loading, error },
                    updateCourseInstance: { mutation: updateCourseMutation },
                    logParticipantStatus: {
                        mutation: logParticipantStatusMutation,
                    },
                    logCardUsage: { mutation: logCardUsageMutation },
                    createCard: { mutation: createCardMutation },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    return (
                        <CourseInstance
                            courseInstance={data.courseInstance}
                            updateCourseInstance={updateCourseMutation}
                            logParticipantStatus={logParticipantStatusMutation}
                            logCardUsage={logCardUsageMutation}
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
                pathname: '/courseManagement',
            }}
        />
    );
};

CourseInstanceContainer.propTypes = {
    location: PropTypes.object.isRequired,
};

export default CourseInstanceContainer;
