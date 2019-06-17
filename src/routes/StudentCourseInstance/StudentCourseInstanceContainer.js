import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { STUDENT_GET_COURSE_INSTANCE } from './graphql';
import StudentCourseInstance from './StudentCourseInstance';

const getCourseInstance = ({ render, id }) => (
    <Query query={STUDENT_GET_COURSE_INSTANCE} variables={{ id }}>
        {render}
    </Query>
);

const mapper = {
    getCourseInstance,
};

const StudentCourseInstanceContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({ getCourseInstance: { data, loading, error } }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    return (
                        <StudentCourseInstance
                            courseInstance={data.courseInstance}
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

StudentCourseInstanceContainer.propTypes = {
    location: PropTypes.object.isRequired,
};

export default StudentCourseInstanceContainer;
