import React from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    UPDATE_COURSE_INSTANCE,
    DELETE_PARTICIPANT,
    GET_COURSE_INSTANCE,
} from './graphql';
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

const deleteParticipant = ({ render, id }) => (
    <Mutation
        mutation={DELETE_PARTICIPANT}
        update={(cache, { data: { deleteParticipant } }) => {
            const { courseInstance } = cache.readQuery({
                query: GET_COURSE_INSTANCE,
                variables: {
                    id,
                },
            });
            cache.writeQuery({
                query: GET_COURSE_INSTANCE,
                variables: {
                    id,
                },
                data: {
                    courseInstance: {
                        ...courseInstance,
                        participants: filter(
                            courseInstance.participants,
                            participant =>
                                participant.id !== deleteParticipant.id
                        ),
                    },
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
                    deleteParticipant: { mutation: removeParticipantMutation },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    console.log('data is: ', data);
                    return (
                        <CourseInstance
                            courseInstance={data.courseInstance}
                            updateCourseInstance={updateCourseMutation}
                            deleteParticipant={removeParticipantMutation}
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
