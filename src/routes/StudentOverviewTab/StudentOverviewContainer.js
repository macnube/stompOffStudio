import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_ACTIVE_CARD_BY_STUDENT,
    UPCOMING_ABSENCES_BY_STUDENT,
} from './graphql';
import StudentOverview from './StudentOverview';
import { withUser } from 'core/user';

const getActiveCardByStudent = ({ render, id }) => (
    <Query query={GET_ACTIVE_CARD_BY_STUDENT} variables={{ id }}>
        {render}
    </Query>
);

const upcomingAbsences = ({ render, id }) => (
    <Query query={UPCOMING_ABSENCES_BY_STUDENT} variables={{ id }}>
        {render}
    </Query>
);

const mapper = {
    getActiveCardByStudent,
    upcomingAbsences,
};

const StudentOverviewContainer = ({ user }) => {
    return user.student.id ? (
        <Adopt mapper={mapper} id={user.student.id}>
            {({
                getActiveCardByStudent: {
                    data: activeCardData,
                    loading: activeCardLoading,
                },
                upcomingAbsences: {
                    data: absencesData,
                    loading: upcomingAbsencesLoading,
                },
            }) => {
                if (activeCardLoading || upcomingAbsencesLoading) return null;
                if (activeCardData && absencesData) {
                    return (
                        <StudentOverview
                            card={activeCardData.activeCardByStudent}
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
