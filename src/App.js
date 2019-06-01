import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'video-react/dist/video-react.css';

import './App.css';

import UserAuthContext from './UserAuthContext';
import Dashboard from './dashboard';

const setupClient = (user, setUser) =>
    new ApolloClient({
        uri:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:4000'
                : 'https://dance-cam-server.herokuapp.com',
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
                //localStorage.removeItem('authUser');
                setUser({ admin: false, isAuthenticated: false });
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
