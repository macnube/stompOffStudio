import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { CURRENT_USER, UPDATE_USER_EMAIL_PASSWORD } from './graphql';
import UserSettings from './UserSettings';

const currentUser = ({ render }) => (
    <Query query={CURRENT_USER}>{render}</Query>
);

const updateUserEmailPassword = ({ render }) => (
    <Mutation mutation={UPDATE_USER_EMAIL_PASSWORD}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    currentUser,
    updateUserEmailPassword,
};

const UserSettingsContainer = () => (
    <Adopt mapper={mapper}>
        {({
            currentUser: { data, loading, error },
            updateUserEmailPassword: {
                mutation: updateUserEmailPasswordMutation,
            },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.users) return `404: Session not found`;
            return (
                <UserSettings
                    user={data.user}
                    updateUserEmailPassword={updateUserEmailPasswordMutation}
                />
            );
        }}
    </Adopt>
);

export default UserSettingsContainer;
