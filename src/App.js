import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'video-react/dist/video-react.css';

import './App.css';

import Dashboard from './dashboard';
import Login from 'routes/Login';

const client = new ApolloClient({
    uri:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:4000'
            : 'https://dance-cam-server.herokuapp.com',
    request: async operation => {
        const token = await localStorage.getItem('jwtToken');
        if (token) {
            operation.setContext({
                headers: {
                    authorization: token,
                },
            });
        }
    },
    onError: ({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            console.log('graphQLErrors are: ', graphQLErrors);
            //window.location.replace('http://localhost:3000/login');
        }
        if (networkError) {
            console.log('networkError: ', networkError);
        }
    },
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route exact path="/login" component={Login} />
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
