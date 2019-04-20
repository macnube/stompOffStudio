import React from 'react';
import { Redirect } from 'react-router-dom';
import filter from 'lodash/filter';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_COURSES,
    DELETE_COURSE,
    CREATE_COURSE,
    GET_STUDIOS,
} from './graphql';
import CourseManagement from './CourseManagement';

const getCourses = ({ render }) => <Query query={GET_COURSES}>{render}</Query>;

const getStudios = ({ render }) => <Query query={GET_STUDIOS}>{render}</Query>;

const deleteCourse = ({ render }) => (
    <Mutation
        mutation={DELETE_COURSE}
        update={(cache, { data: { deleteCourse } }) => {
            const { courses } = cache.readQuery({ query: GET_COURSES });
            cache.writeQuery({
                query: GET_COURSES,
                data: {
                    courses: filter(courses, c => c.id !== deleteCourse.id),
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const createCourse = ({ render }) => (
    <Mutation
        mutation={CREATE_COURSE}
        update={(cache, { data: { createCourse } }) => {
            const { courses } = cache.readQuery({ query: GET_COURSES });
            cache.writeQuery({
                query: GET_COURSES,
                data: { courses: courses.concat([createCourse]) },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getStudios,
    getCourses,
    deleteCourse,
    createCourse,
};

const CourseManagementContainer = () => (
    <Adopt mapper={mapper}>
        {({
            getStudios: { data: studiosData },
            getCourses: { data, loading, error },
            deleteCourse: { mutation: deleteCourseMutation },
            createCourse: {
                mutation: createCourseMutation,
                result: createCourseResult,
            },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.courses) return `404: Session not found`;
            if (createCourseResult.data) {
                console.log('createCourseResult is: ', createCourseResult);
                return (
                    <Redirect
                        to={{
                            pathname: '/courseDetail',
                            search: `id=${
                                createCourseResult.data.createCourse.id
                            }`,
                        }}
                    />
                );
            }
            console.log('studiosData is: ', studiosData);
            console.log('coursesData is: ', data);
            return (
                <CourseManagement
                    studios={studiosData.studios}
                    courses={data.courses}
                    deleteCourse={deleteCourseMutation}
                    createCourse={createCourseMutation}
                />
            );
        }}
    </Adopt>
);

export default CourseManagementContainer;
