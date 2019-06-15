import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import get from 'lodash/get';
import 'video-react/dist/video-react.css';

import './App.css';

import UserAuthContext from './UserAuthContext';
import Dashboard from './dashboard';

const setupClient = (user, setUser) =>
    new ApolloClient({
        uri:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:4000'
                : 'http://165.22.201.30:4000',
        request: async operation => {
            const authUser = localStorage.getItem('authUser');
            if (authUser) {
                const { token } = JSON.parse(authUser);
                operation.setContext({
                    headers: {
                        authorization: token,
                    },
                });
            }
        },
        onError: ({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                console.log('errors are: ', graphQLErrors);
                const message = get(graphQLErrors[0], 'message');
                if (message === 'Not Authorised!' && user.isAuthenticated) {
                    setUser({ admin: false, isAuthenticated: false });
                }
            }
            if (networkError) {
                console.log('networkError: ', networkError);
            }
        },
    });

const App = () => {
    const [user, setUser] = useState({
        token: '',
        isAuthenticated: false,
        isAdmin: false,
    });

    useEffect(() => {
        const getAuthUser = async () => {
            const authUser = await localStorage.getItem('authUser');
            if (authUser) {
                const { token, user } = JSON.parse(authUser);
                setUser({ token, admin: user.admin, isAuthenticated: true });
            }
        };

        getAuthUser();
    }, []);
    return (
        <UserAuthContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            <ApolloProvider client={setupClient(user, setUser)}>
                <Router>
                    <Route path="/" component={Dashboard} />
                </Router>
            </ApolloProvider>
        </UserAuthContext.Provider>
    );
};

export default App;
