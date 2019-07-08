import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';
import startOfDay from 'date-fns/startOfDay';

import {
    GET_INSTANCES_BY_STUDENT,
    UPCOMING_ABSENCES_BY_STUDENT,
} from './graphql';
import StudentOverview from './StudentOverview';
import { withUser } from 'core/user';

const getInstancesByStudent = ({ render, id }) => (
    <Query query={GET_INSTANCES_BY_STUDENT} variables={{ id }}>
        {render}
    </Query>
);

const upcomingAbsences = ({ render, id }) => (
    <Query query={UPCOMING_ABSENCES_BY_STUDENT} variables={{ id }}>
        {render}
    </Query>
);

const mapper = {
    getInstancesByStudent,
    upcomingAbsences,
};

const StudentOverviewContainer = ({ user }) => {
    return user.student.id ? (
        <Adopt mapper={mapper} id={user.student.id}>
            {({
                getInstancesByStudent: {
                    data: instancesByStudentData,
                    error: overviewInstancesError,
                    loading: overviewLoading,
                },
                upcomingAbsences: { data: absencesData },
            }) => {
                if (overviewLoading) return null;
                if (overviewInstancesError)
                    return `Error: ${overviewInstancesError}`;
                if (instancesByStudentData && absencesData) {
                    return (
                        <StudentOverview
                            instances={
                                instancesByStudentData.instancesByStudent
                            }
                            absences={absencesData.upcomingAbsencesByStudent}
                        />
                    );
                }
            }}
        </Adopt>
    ) : null;
};

StudentOverviewContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

export default withUser(StudentOverviewContainer);
