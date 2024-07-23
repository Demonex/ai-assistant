import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {App} from './components/App.js';
import {Router} from 'wouter';

export const SSRRender = (url: string) => {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <Router ssrPath={url}>
        <App/>
      </Router>
    </React.StrictMode>
  );
};
