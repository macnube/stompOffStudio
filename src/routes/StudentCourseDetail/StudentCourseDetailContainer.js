import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_COURSE } from './graphql';
import StudentCourseDetail from './StudentCourseDetail';

const getCourse = ({ render, id }) => (
    <Query query={GET_COURSE} variables={{ id }}>
        {render}
    </Query>
);

const mapper = {
    getCourse,
};

const StudentCourseDetailContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({ getCourse: { data, loading, error } }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    if (data.course) {
                        return <StudentCourseDetail course={data.course} />;
                    }
                    return null;
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
};

export default StudentCourseDetailContainer;
