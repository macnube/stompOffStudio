import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router } from 'react-router-dom';

import './App.css';

import Dashboard from './dashboard';

class App extends Component {
    render() {
        return (
            <Router>
                <Dashboard />
            </Router>
        );
    }
}

export default App;
