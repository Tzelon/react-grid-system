/**
 * index.js
 *
 * This is the entry file for the module in dev environment
 */
// Needed for es6 generator support
import 'babel-polyfill';
// Import react
import React from 'react';
import ReactDOM from 'react-dom';
import ShowcaseLayout from './0-showcase';
import '../css/styles.css';

const render = () => {
  ReactDOM.render(
    <div>
      <ShowcaseLayout showGrid/>
    </div>,
    document.getElementById('app'),
  );
};


// Render React
render();
