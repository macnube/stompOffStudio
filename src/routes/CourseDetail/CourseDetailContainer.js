import React from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import find from 'lodash/find';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_COURSE,
    UPDATE_COURSE,
    REMOVE_TEACHER_FROM_COURSE,
    DELETE_COURSE_STUDENT,
    GET_STUDENT_FRAGMENT,
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

const deleteCourseStudent = ({ render, id }) => (
    <Mutation
        mutation={DELETE_COURSE_STUDENT}
        update={(cache, { data: { deleteCourseStudent } }) => {
            const { course } = cache.readQuery({
                query: GET_COURSE,
                variables: {
                    id,
                },
            });
            const courseStudent = find(course.courseStudents, {
                id: deleteCourseStudent.id,
            });
            const student = cache.readFragment({
                id: `Student:${courseStudent.student.id}`,
                fragment: GET_STUDENT_FRAGMENT,
            });
            cache.writeQuery({
                query: GET_COURSE,
                variables: {
                    id,
                },
                data: {
                    course: {
                        ...course,
                        courseStudents: filter(
                            course.courseStudents,
                            courseStudent =>
                                courseStudent.id !== deleteCourseStudent.id
                        ),
                    },
                },
            });
            if (student) {
                cache.writeFragment({
                    id: `Student:${student.id}`,
                    fragment: GET_STUDENT_FRAGMENT,
                    data: {
                        ...student,
                        courses: filter(
                            student.courses,
                            courses => courses.id !== deleteCourseStudent.id
                        ),
                    },
                });
            }
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCourse,
    updateCourse,
    removeTeacherFromCourse,
    deleteCourseStudent,
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
                    deleteCourseStudent: {
                        mutation: deleteCourseStudentMutation,
                    },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    if (!data.course) return `Error: 404`;
                    return (
                        <CourseDetail
                            course={data.course}
                            updateCourse={updateCourseMutation}
                            deleteCourseStudent={deleteCourseStudentMutation}
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
