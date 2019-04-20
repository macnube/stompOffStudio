import React from 'react';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import StudioDetail from './StudioDetail';

export const GET_STUDIO = gql`
    query StudioDetailQuery($id: ID!) {
        studio(id: $id) {
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

const StudioDetailContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Query query={GET_STUDIO} variables={{ id: params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    if (!data.studio) return `404: Session not found`;
                    console.log('data is: ', data);

                    return <StudioDetail studio={data.studio} />;
                }}
            </Query>
        );
    }
    return (
        <Redirect
            to={{
                pathname: '/studioManagement',
            }}
        />
    );
};

export default StudioDetailContainer;
