import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_COURSE,
    UPDATE_COURSE,
    REMOVE_TEACHER_FROM_COURSE,
} from './graphql';
import CourseDetail from './CourseDetail';

const getCourse = ({ render, id }) => (
    <Query query={GET_COURSE} variables={{ id }}>
        {render}
    </Query>
);

const updateCourse = ({ render }) => (
    <Mutation mutation={UPDATE_COURSE}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const removeTeacherFromCourse = ({ render }) => (
    <Mutation mutation={REMOVE_TEACHER_FROM_COURSE}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCourse,
    updateCourse,
    removeTeacherFromCourse,
};

const CourseDetailContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({
                    getCourse: { data, loading, error },
                    updateCourse: { mutation: updateCourseMutation },
                    removeTeacherFromCourse: {
                        mutation: removeTeacherFromCourseMutation,
                    },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    if (!data.course) return `Error: 404`;
                    return (
                        <CourseDetail
                            course={data.course}
                            updateCourse={updateCourseMutation}
                            removeTeacherFromCourse={
                                removeTeacherFromCourseMutation
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
                pathname: '/courseManagement',
            }}
        />
    );
};

CourseDetailContainer.propTypes = {
    location: PropTypes.object.isRequired,
};

export default CourseDetailContainer;
