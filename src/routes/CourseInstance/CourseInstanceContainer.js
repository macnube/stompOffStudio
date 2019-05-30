import React from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    UPDATE_COURSE_INSTANCE,
    LOG_PARTICIPANT_STATUS,
    GET_COURSE_INSTANCE,
    LOG_CARD_PARTICIPATION,
    DEACTIVATE_CARD,
    DELETE_PARTICIPANT,
    GET_COURSE_INSTANCE_FRAGMENT,
} from './graphql';
import { CREATE_CARD } from '~/routes/StudentDetail/graphql';
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

const deactivateCard = ({ render }) => (
    <Mutation mutation={DEACTIVATE_CARD}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const deleteParticipant = ({ render, id }) => (
    <Mutation
        mutation={DELETE_PARTICIPANT}
        update={(cache, { data: { deleteParticipant } }) => {
            const courseInstance = cache.readFragment({
                id: `CourseInstance:${id}`,
                fragment: GET_COURSE_INSTANCE_FRAGMENT,
            });
            cache.writeFragment({
                id: `CourseInstance:${id}`,
                fragment: GET_COURSE_INSTANCE_FRAGMENT,
                data: {
                    ...courseInstance,
                    participants: filter(
                        courseInstance.participants,
                        participant => participant.id !== deleteParticipant.id
                    ),
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCourseInstance,
    updateCourseInstance,
    logParticipantStatus,
    logCardParticipation,
    createCard,
    deactivateCard,
    deleteParticipant,
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
                    logCardParticipation: {
                        mutation: logCardParticipationMutation,
                    },
                    createCard: {
                        mutation: createCardMutation,
                        result: createCardResult,
                    },
                    deactivateCard: { mutation: deactivateCardMutation },
                    deleteParticipant: { mutation: deleteParticipantMutation },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    if (createCardResult.data) {
                        return (
                            <CourseInstance
                                courseInstance={data.courseInstance}
                                updateCourseInstance={updateCourseMutation}
                                logParticipantStatus={
                                    logParticipantStatusMutation
                                }
                                logCardParticipation={
                                    logCardParticipationMutation
                                }
                                createCard={createCardMutation}
                                deactivateCard={deactivateCardMutation}
                                card={createCardResult.data.createCard}
                                deleteParticipant={deleteParticipantMutation}
                            />
                        );
                    }
                    return (
                        <CourseInstance
                            courseInstance={data.courseInstance}
                            updateCourseInstance={updateCourseMutation}
                            logParticipantStatus={logParticipantStatusMutation}
                            logCardParticipation={logCardParticipationMutation}
                            createCard={createCardMutation}
                            deactivateCard={deactivateCardMutation}
                            deleteParticipant={deleteParticipantMutation}
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
