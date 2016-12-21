
'use strict';

const path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'app/src'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './app'
  },
  module: {
    loaders: [{
      test: /.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-0']
      },
      progress: true
    }]
  }
};
