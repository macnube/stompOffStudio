import React from 'react';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { LOGIN } from './graphql';
import Login from './Login';

const login = ({ render }) => (
    <Mutation mutation={LOGIN}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    login,
};

const LoginContainer = () => (
    <Adopt mapper={mapper}>
        {({ login: { mutation: loginMutation, result: loginResult } }) => {
            if (loginResult.data) {
                localStorage.setItem('jwtToken', loginResult.data.login.token);
                return (
                    <Redirect
                        to={{
                            pathname: '/dashboard/overview',
                        }}
                    />
                );
            }

            return <Login login={loginMutation} />;
        }}
    </Adopt>
);

export default LoginContainer;
