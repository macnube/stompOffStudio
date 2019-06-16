import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_INSTANCES_BY_STUDENT,
    GET_UNPAID_CARDS_BY_STUDENT,
} from './graphql';
import StudentOverview from './StudentOverview';
import { withUser } from 'core/user';

const getInstancesByStudent = ({ render, id }) => (
    <Query query={GET_INSTANCES_BY_STUDENT} variables={{ id }}>
        {render}
    </Query>
);

const getUnpaidCardsByStudent = ({ render, id }) => (
    <Query query={GET_UNPAID_CARDS_BY_STUDENT} variables={{ id }}>
        {render}
    </Query>
);

const mapper = {
    getInstancesByStudent,
    getUnpaidCardsByStudent,
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
                getUnpaidCardsByStudent: { data: cardsData },
            }) => {
                if (overviewLoading) return null;
                if (overviewInstancesError)
                    return `Error: ${overviewInstancesError}`;
                if (instancesByStudentData && cardsData) {
                    return (
                        <StudentOverview
                            instances={
                                instancesByStudentData.instancesByStudent
                            }
                            unpaidCards={cardsData.unpaidCardsByStudent}
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
