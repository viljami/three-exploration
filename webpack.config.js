
'use strict';

const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'bundle.js'
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
