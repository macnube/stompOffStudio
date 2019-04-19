import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import SelectedToolbar from './SelectedToolbar';

const DELETE_STUDIO = gql`
    mutation DeleteStudio($id: ID!, $name: String!) {
        deleteStudio(id: $id, name: $name) {
            id
            name
            address
        }
    }
`;

const SelectedToolbarContainer = props => (
    <Mutation mutation={DELETE_STUDIO}>
        {(deleteStudio, { data, loading, error }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (data)
                return (
                    <SelectedToolbar
                        success={true}
                        deleteStudio={deleteStudio}
                        {...props}
                    />
                );

            return (
                <SelectedToolbar
                    success={false}
                    deleteStudio={deleteStudio}
                    {...props}
                />
            );
        }}
    </Mutation>
);

export default SelectedToolbarContainer;
