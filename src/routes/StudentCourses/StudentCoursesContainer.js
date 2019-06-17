import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_COURSES_BY_STUDENT } from './graphql';
import StudentCourses from './StudentCourses';
import { withUser } from 'core/user';

const getCoursesByStudent = ({ render, id }) => (
    <Query query={GET_COURSES_BY_STUDENT} variables={{ id }}>
        {render}
    </Query>
);

const mapper = {
    getCoursesByStudent,
};

const StudentCoursesContainer = ({ user }) =>
    user.student && user.student.id ? (
        <Adopt mapper={mapper} id={user.student.id}>
            {({ getCoursesByStudent: { data, loading, error } }) => {
                if (loading) return null;
                if (error) return `Error: ${error}`;
                if (!data.coursesByStudent) return `404: Session not found`;
                console.log('data is; ', data);
                return <StudentCourses courses={data.coursesByStudent} />;
            }}
        </Adopt>
    ) : null;

StudentCoursesContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

export default withUser(StudentCoursesContainer);
