'use strict';

var StatsPlugin = require('stats-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname, './src/MaskedTextInput.jsx'),

  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['babel-loader']}
    ]
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'MaskedTextInput.js',
    library: 'MaskedTextInput',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
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
  ],

  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      },
      "react/lib/ReactInputSelection": {
        root: "react/lib/ReactInputSelection",
        commonjs2: "react/lib/ReactInputSelection",
        commonjs: "react/lib/ReactInputSelection",
        amd: "react/lib/ReactInputSelection"
      }
    }
  ]
}
