import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { Adopt } from 'react-adopt';
import { parse } from 'query-string';

import { RESET_PASSWORD } from './graphql';
import ResetPassword from './ResetPassword';
import { withUser } from 'core/user';

const resetPassword = ({ render }) => (
    <Mutation mutation={RESET_PASSWORD}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    resetPassword,
};

const ResetPasswordContainer = ({ setUser, location }) => {
    const { user, e, d } = parse(location.search);
    if (user && e && d) {
        return (
            <Adopt mapper={mapper}>
                {({
                    resetPassword: {
                        mutation: resetPasswordMutation,
                        result: resetPasswordResult,
                    },
                }) => {
                    if (resetPasswordResult.data) {
                        const authUser = JSON.stringify(
                            resetPasswordResult.data.resetPassword
                        );
                        localStorage.setItem('authUser', authUser);
                        const {
                            admin,
                            student,
                        } = resetPasswordResult.data.resetPassword.user;
                        setUser({
                            admin,
                            isAuthenticated: true,
                            student,
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

                    return (
                        <ResetPassword
                            resetPassword={resetPasswordMutation}
                            email={user}
                            encryptedEmail={e}
                            encryptedDate={d}
                        />
                    );
                }}
            </Adopt>
        );
    }
    return (
        <Redirect
            to={{
                pathname: '/login',
            }}
        />
    );
};

ResetPasswordContainer.propTypes = {
    setUser: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
};

export default withUser(ResetPasswordContainer);
