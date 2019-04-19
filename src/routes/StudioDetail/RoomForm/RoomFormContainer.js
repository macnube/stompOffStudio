import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import RoomForm from './RoomForm';

const CREATE_ROOM = gql`
    mutation CreateRoom($name: String!, $capacity: Int!, $studioId: ID!) {
        createRoom(name: $name, capacity: $capacity, studioId: $studioId) {
            id
            name
            capacity
            studio {
                id
                name
                address
                rooms {
                    name
                    capacity
                }
            }
        }
    }
`;

const RoomFormContainer = props => (
    <Mutation mutation={CREATE_ROOM}>
        {(createRoom, { data, loading, error }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (data) {
                console.log('successful mutation with data: ', data);
                return (
                    <RoomForm createRoom={createRoom} {...props} open={false} />
                );
            }

            return <RoomForm createRoom={createRoom} {...props} />;
        }}
    </Mutation>
);

export default RoomFormContainer;
