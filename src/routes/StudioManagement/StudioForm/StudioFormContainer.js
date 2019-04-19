import React from 'react';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import StudioForm from './StudioForm';
import { GET_STUDIOS } from 'routes/StudioManagement/StudioManagementContainer';

const CREATE_STUDIO = gql`
    mutation CreateStudio($name: String!, $address: String!) {
        createStudio(name: $name, address: $address) {
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

const StudioFormContainer = props => (
    <Mutation
        mutation={CREATE_STUDIO}
        update={(cache, { data: { createStudio } }) => {
            const { studios } = cache.readQuery({ query: GET_STUDIOS });
            cache.writeQuery({
                query: GET_STUDIOS,
                data: { studios: studios.concat([createStudio]) },
            });
        }}
    >
        {(createStudio, { data, loading, error }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (data) {
                console.log('data is: ', data);
                return (
                    <Redirect
                        to={{
                            pathname: '/studioDetail',
                            search: `id=${data.createStudio.id}`,
                            state: { selectedStudio: data.createStudio },
                        }}
                    />
                );
            }

            return (
                <StudioForm
                    success={false}
                    createStudio={createStudio}
                    {...props}
                />
            );
        }}
    </Mutation>
);

export default StudioFormContainer;
