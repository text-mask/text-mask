var StatsPlugin = require('stats-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname, './src/index.js'),

  mode: 'production',

  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
    ]
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'textMaskCore.js',
    libraryTarget: 'module',
    module: true
  },
  experiments: {
    outputModule: true
  },

  resolve: {
    extensions: ['', '.js']
  },

  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     screw_ie8: true,
    //     warnings: false
    //   }
    // }),
    new StatsPlugin('stats.json', {
      chunkModules: true
    })
  ]
}
