import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_CURRENT_USER, UPDATE_USER_EMAIL_PASSWORD } from './graphql';
import UserSettings from './UserSettings';

const currentUser = ({ render }) => (
    <Query query={GET_CURRENT_USER}>{render}</Query>
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

const UserSettingsContainer = ({ open, handleClose, handleLogout }) => (
    <Adopt mapper={mapper}>
        {({
            currentUser: { data, loading, error },
            updateUserEmailPassword: {
                mutation: updateUserEmailPasswordMutation,
            },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            return (
                <UserSettings
                    user={data.currentUser}
                    updateUserEmailPassword={updateUserEmailPasswordMutation}
                    open={open}
                    handleClose={handleClose}
                    handleLogout={handleLogout}
                />
            );
        }}
    </Adopt>
);

UserSettingsContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default UserSettingsContainer;
