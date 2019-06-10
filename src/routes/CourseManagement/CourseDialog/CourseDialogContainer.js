import React from 'react';
import { Query } from 'react-apollo';

import { GET_STUDIOS } from './graphql';
import CourseDialog from './CourseDialog';

const CourseDialogContainer = props => (
    <Query query={GET_STUDIOS}>
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.studios) return `404: Session not found`;
            return <CourseDialog {...props} studios={data.studios} />;
        }}
    </Query>
);

export default CourseDialogContainer;
