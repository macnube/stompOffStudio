import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { LOGIN } from './graphql';
import Login from './Login';
import { withUser } from 'core/user';

const login = ({ render }) => (
    <Mutation mutation={LOGIN}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    login,
};

const LoginContainer = ({ setUser }) => {
    return (
        <Adopt mapper={mapper}>
            {({ login: { mutation: loginMutation, result: loginResult } }) => {
                if (loginResult.data) {
                    const authUser = JSON.stringify(loginResult.data.login);
                    localStorage.setItem('authUser', authUser);
                    const {
                        admin,
                        student,
                        email,
                    } = loginResult.data.login.user;
                    setUser({
                        admin,
                        isAuthenticated: true,
                        student,
                        email,
                    });
                    const redirectPath = admin
                        ? '/overview'
                        : 'studentOverview';
                    return (
                        <Redirect
                            to={{
                                pathname: redirectPath,
                            }}
                        />
                    );
                }

                return <Login login={loginMutation} />;
            }}
        </Adopt>
    );
};

LoginContainer.propTypes = {
    setUser: PropTypes.func.isRequired,
};

export default withUser(LoginContainer);
