import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import StudioManagement from './StudioManagement';

const GET_STUDIOS = gql`
    query {
        studios {
            id
            name
            address
            rooms {
                name
                capacity
            }
        }
    }
`;

const StudioManagementContainer = () => (
    <Query query={GET_STUDIOS}>
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.studios) return `404: Session not found`;
            if (data.studios === 0) {
                console.log('data is: ', data);
                return `Error: Studios is empty. Please create one or handle this error more gracefully`;
            }

            return <StudioManagement studios={data.studios} />;
        }}
    </Query>
);

export default StudioManagementContainer;
