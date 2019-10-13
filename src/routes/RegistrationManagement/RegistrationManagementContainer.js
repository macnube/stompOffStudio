import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_COURSE_IDS, GET_STUDENTS, IMPORT_STUDENT } from './graphql';
import RegistrationManagement from './RegistrationManagement';

const getCourses = ({ render }) => (
    <Query query={GET_COURSE_IDS}>{render}</Query>
);

const getStudents = ({ render }) => (
    <Query query={GET_STUDENTS}>{render}</Query>
);

const importStudent = ({ render }) => (
    <Mutation
        mutation={IMPORT_STUDENT}
        update={(cache, { data: { importStudent } }) => {
            const { students } = cache.readQuery({ query: GET_STUDENTS });
            cache.writeQuery({
                query: GET_STUDENTS,
                data: { students: students.concat([importStudent]) },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);
const mapper = {
    getCourses,
    getStudents,
    importStudent,
};

const RegistrationManagementContainer = () => (
    <Adopt mapper={mapper}>
        {({
            getCourses: { data, loading, error },
            getStudents: {
                data: studentData,
                loading: studentLoading,
                error: studentError,
            },
            importStudent: { mutation: importStudentMutation, result },
        }) => {
            if (loading || studentLoading) return null;
            if (error || studentError) return `Error: ${error}`;
            if (data.courses && studentData.students) {
                console.log('import data is: ', studentData.students);
                return (
                    <RegistrationManagement
                        importStudent={importStudentMutation}
                        addedStudent={result.data && result.data.importStudent}
                        courses={data.courses}
                        students={studentData.students}
                    />
                );
            }
        }}
    </Adopt>
);

export default RegistrationManagementContainer;
