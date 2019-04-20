import React from 'react';
import filter from 'lodash/filter';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_STUDIO, DELETE_ROOM, CREATE_ROOM } from './graphql';
import StudioDetail from './StudioDetail';

const getStudio = ({ render, id }) => (
    <Query query={GET_STUDIO} variables={{ id }}>
        {render}
    </Query>
);

const deleteRoom = ({ render, id }) => (
    <Mutation
        mutation={DELETE_ROOM}
        update={(cache, { data: { deleteRoom } }) => {
            const { studio } = cache.readQuery({
                query: GET_STUDIO,
                variables: { id },
            });
            studio.rooms = cache.writeQuery({
                query: GET_STUDIO,
                data: {
                    studio: {
                        ...studio,
                        rooms: filter(
                            studio.rooms,
                            room => room.id !== deleteRoom.id
                        ),
                    },
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const createRoom = ({ render, id }) => (
    <Mutation mutation={CREATE_ROOM}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getStudio,
    deleteRoom,
    createRoom,
};

const StudioDetailContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({
                    getStudio: { data, loading, error },
                    deleteRoom: {
                        mutation: deleteRoomMutation,
                        result: deleteRoomResult,
                    },
                    createRoom: {
                        mutation: createRoomMutation,
                        result: createRoomResult,
                    },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    if (!data.studio) return `Error: 404`;
                    return (
                        <StudioDetail
                            studio={data.studio}
                            deleteRoom={deleteRoomMutation}
                            createRoom={createRoomMutation}
                        />
                    );
                }}
            </Adopt>
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
