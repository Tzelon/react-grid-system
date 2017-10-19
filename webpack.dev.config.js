const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const plugins = [
  new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
  new webpack.NoEmitOnErrorsPlugin(),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/, // exclude node_modules
    failOnError: false, // show a warning when there is a circular dependency
  }),
];

module.exports = require('./webpack.base')({
  entry: [
    'eventsource-polyfill', // Necessary for hot reloading with IE
    path.resolve(process.cwd(), 'examples/index.js'),
  ],

  output: {
    path: '/',
    filename: 'bundle.js',
    sourceMapFilename: '[file].map',
  },

  // Add development plugins
  plugins,

  // Tell babel that we want to hot-reload
  babelQuery: {
    // require.resolve solves the issue of relative presets when dealing with
    // locally linked packages. This is an issue with babel and webpack.
    // See https://github.com/babel/babel-loader/issues/149 and
    // https://github.com/webpack/webpack/issues/1866
    presets: ['babel-preset-react-hmre'].map(require.resolve),
  },

  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map',

  performance: {
    hints: false,
  },
});
