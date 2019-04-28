import React from 'react';
import { Redirect } from 'react-router-dom';
import filter from 'lodash/filter';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_STUDIOS, DELETE_STUDIO, CREATE_STUDIO } from './graphql';
import StudioManagement from './StudioManagement';

const getStudios = ({ render }) => <Query query={GET_STUDIOS}>{render}</Query>;

const deleteStudio = ({ render }) => (
    <Mutation
        mutation={DELETE_STUDIO}
        update={(cache, { data: { deleteStudio } }) => {
            const { studios } = cache.readQuery({ query: GET_STUDIOS });
            cache.writeQuery({
                query: GET_STUDIOS,
                data: {
                    studios: filter(
                        studios,
                        studio => studio.id !== deleteStudio.id
                    ),
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const createStudio = ({ render }) => (
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
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getStudios,
    deleteStudio,
    createStudio,
};

const StudioManagementContainer = () => (
    <Adopt mapper={mapper}>
        {({
            getStudios: { data, loading, error },
            deleteStudio: { mutation: deleteStudioMutation },
            createStudio: {
                mutation: createStudioMutation,
                result: createStudioResult,
            },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.studios) return `404: Session not found`;
            if (data.studios === 0) {
                return `Error: Studios is empty. Please create one or handle this error more gracefully`;
            }
            if (createStudioResult.data) {
                return (
                    <Redirect
                        to={{
                            pathname: '/studioDetail',
                            search: `id=${
                                createStudioResult.data.createStudio.id
                            }`,
                        }}
                    />
                );
            }

            return (
                <StudioManagement
                    studios={data.studios}
                    deleteStudio={deleteStudioMutation}
                    createStudio={createStudioMutation}
                />
            );
        }}
    </Adopt>
);

export default StudioManagementContainer;
