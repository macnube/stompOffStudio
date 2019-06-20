import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_STUDENT_CARDS } from './graphql';
import StudentCards from './StudentCards';
import { withUser } from 'core/user';

const getStudentCards = ({ render, id }) => (
    <Query query={GET_STUDENT_CARDS} variables={{ id }}>
        {render}
    </Query>
);

const mapper = {
    getStudentCards,
};

const StudentCardsContainer = ({ user }) => (
    <Adopt mapper={mapper} id={user.student.id}>
        {({ getStudentCards: { data, loading, error } }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.studentCards) return `404: Session not found`;

            return <StudentCards cards={data.studentCards} />;
        }}
    </Adopt>
);

StudentCardsContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

export default withUser(StudentCardsContainer);
