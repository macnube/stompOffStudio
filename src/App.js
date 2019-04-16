import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './App.css';

import Dashboard from './dashboard';

const client = new ApolloClient({
    uri:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:4000'
            : 'https://dance-cam-server.herokuapp.com',
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <Dashboard />
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
