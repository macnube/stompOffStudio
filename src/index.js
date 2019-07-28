import React from 'react';
import ReactDOM from 'react-dom';

import 'src/errors/setup';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getErrorBoundary } from 'src/errors';

var ErrorBoundary = getErrorBoundary();

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
