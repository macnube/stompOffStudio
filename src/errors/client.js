import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';
import { config } from 'dotenv';
const appVersion = require('../../package.json').version;
config();

let client;

export const setupClient = () => {
    client = bugsnag({
        apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
        appVersion,
    });
    client.use(bugsnagReact, React);
};

export const getErrorBoundary = () => client.getPlugin('react');

const defineMethod = fn => (...args) => fn(client, ...args);

export const serializeValue = v =>
    !v || Array.isArray(v) || typeof v === 'object'
        ? JSON.stringify(v || null, null, 2)
        : v.toString();

export const notify = defineMethod((client, rawErr, opts) => {
    const err = rawErr instanceof Error ? rawErr : new Error(rawErr);
    if (opts) {
        client.notify(err, opts);
    } else {
        client.notify(err);
    }
});

export const setUser = defineMethod((client, user) => {
    client.user = {
        id: user.id,
        email: user.email,
    };
});
