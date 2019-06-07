import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';
import filter from 'lodash/filter';

import { GET_USERS, TOGGLE_USER_ADMIN_STATUS, DELETE_USER } from './graphql';
import UserManagement from './UserManagement';

const getUsers = ({ render }) => <Query query={GET_USERS}>{render}</Query>;

const toggleUserAdminStatus = ({ render }) => (
    <Mutation mutation={TOGGLE_USER_ADMIN_STATUS}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const deleteUser = ({ render }) => (
    <Mutation
        mutation={DELETE_USER}
        update={(cache, { data: { deleteUser } }) => {
            const { users } = cache.readQuery({
                query: GET_USERS,
            });
            cache.writeQuery({
                query: GET_USERS,
                data: {
                    users: filter(users, user => user.id !== deleteUser.id),
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getUsers,
    toggleUserAdminStatus,
    deleteUser,
};

const UserManagementContainer = () => (
    <Adopt mapper={mapper}>
        {({
            getUsers: { data, loading, error },
            toggleUserAdminStatus: { mutation: toggleUserAdminMutation },
            deleteUser: { mutation: deleteUserMutation },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.users) return `404: Session not found`;
            return (
                <UserManagement
                    users={data.users}
                    toggleUserAdminStatus={toggleUserAdminMutation}
                    deleteUser={deleteUserMutation}
                />
            );
        }}
    </Adopt>
);

export default UserManagementContainer;
