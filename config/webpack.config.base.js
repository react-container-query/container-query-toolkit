'use strict';

module.exports = {
  devtool: 'source-map',
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /node_modules/,
        test: /\.js$/
      }
    ]
  }
};
