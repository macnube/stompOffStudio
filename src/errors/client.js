import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';
import { config } from 'dotenv';
config();

let client;

export const setupClient = () => {
    client = bugsnag(process.env.REACT_APP_BUGSNAG_API_KEY);
    client.use(bugsnagReact, React);
};

export const getErrorBoundary = () => client.getPlugin('react');

const defineMethod = fn => (...args) => fn(client, ...args);

export const notify = defineMethod((client, rawErr, opts) => {
    const err = rawErr instanceof Error ? rawErr : new Error(rawErr);
    if (opts) {
        client.notify(err, opts);
    } else {
        client.notify(err);
    }
});
