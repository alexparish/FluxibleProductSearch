/*global document, window */

import React from 'react';
import debug from 'debug';
import { createElementWithContext } from 'fluxible-addons-react';
import app from './app';

const debugClient = debug('fluxibleproductsearch');
const dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support

// expose debug object to browser, so that it can be enabled/disabled from browser:
// https://github.com/visionmedia/debug#browser-support
window.fluxibleDebug = debug;

debugClient('rehydrating app');

// pass in the dehydrated server state from server.js
app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
        throw err;
    }
    window.context = context;
    const mountNode = document.getElementById('app');

    debugClient('React Rendering');
    React.render(
        createElementWithContext(context),
        mountNode,
        () => debugClient('React Rendered')
    );
});
