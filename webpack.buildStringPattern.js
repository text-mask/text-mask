'use strict';

var StatsPlugin = require('stats-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/}
    ]
  },

  output: {
    library: 'stringPattern',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.js']
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new StatsPlugin('stats.json', {
      chunkModules: true
    })
  ]
}
