import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_COURSE_INSTANCE } from './graphql';
import CourseInstance from './CourseInstance';

const getCourseInstance = ({ render, id }) => (
    <Query query={GET_COURSE_INSTANCE} variables={{ id }}>
        {render}
    </Query>
);

const mapper = {
    getCourseInstance,
};

const CourseInstanceContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({ getCourseInstance: { data, loading, error } }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    return (
                        <CourseInstance courseInstance={data.courseInstance} />
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

CourseInstanceContainer.propTypes = {
    location: PropTypes.object.isRequired,
};

export default CourseInstanceContainer;
