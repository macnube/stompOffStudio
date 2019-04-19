import React from 'react';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import SelectedToolbar from './SelectedToolbar';
import { GET_STUDIOS } from 'routes/StudioManagement';

const DELETE_STUDIO = gql`
    mutation DeleteStudio($id: ID!) {
        deleteStudio(id: $id) {
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

const SelectedToolbarContainer = ({ selectedRows, displayData, ...props }) => {
    console.log('selectedRows: ', selectedRows);
    console.log('displayData: ', displayData);
    const selectedIndexes = keys(selectedRows.lookup);
    console.log('selectedIndexes are: ', selectedIndexes);
    const idsToDelete = reduce(
        displayData,
        (result, row, index) => {
            if (selectedIndexes.includes(index.toString())) {
                result.push(row.data[0]);
                return result;
            }
            return result;
        },
        []
    );
    return (
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
            {(deleteStudio, { data, loading, error }) => {
                if (loading) return null;
                if (error) return `Error: ${error}`;
                if (data)
                    return (
                        <SelectedToolbar
                            deleteStudio={deleteStudio}
                            idsToDelete={idsToDelete}
                            {...props}
                        />
                    );

                return (
                    <SelectedToolbar
                        deleteStudio={deleteStudio}
                        idsToDelete={idsToDelete}
                        {...props}
                    />
                );
            }}
        </Mutation>
    );
};

SelectedToolbarContainer.propTypes = {
    displayData: PropTypes.array.isRequired,
    selectedRows: PropTypes.array.isRequired,
};

export default SelectedToolbarContainer;
