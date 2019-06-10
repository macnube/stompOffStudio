import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { LOGIN } from './graphql';
import Login from './Login';
import UserAuthContext from 'src/UserAuthContext';

const login = ({ render }) => (
    <Mutation mutation={LOGIN}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    login,
};

const LoginContainer = () => {
    const { setUser } = useContext(UserAuthContext);
    return (
        <Adopt mapper={mapper}>
            {({ login: { mutation: loginMutation, result: loginResult } }) => {
                if (loginResult.data) {
                    const authUser = JSON.stringify(loginResult.data.login);
                    localStorage.setItem('authUser', authUser);
                    setUser({
                        admin: loginResult.data.login.user.admin,
                        isAuthenticated: true,
                    });
                    return (
                        <Redirect
                            to={{
                                pathname: '/overview',
                            }}
                        />
                    );
                }

                return <Login login={loginMutation} />;
            }}
        </Adopt>
    );
};

export default LoginContainer;
