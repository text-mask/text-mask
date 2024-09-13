var StatsPlugin = require('stats-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname, './src/angular1TextMask.js'),

  module: {
    loaders: [{test: /\.js$/, loaders: ['babel-loader']}],
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'angular1TextMask.js',
    library: 'angular1TextMask',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['', '.js'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new StatsPlugin('stats.json', {
      chunkModules: true,
    }),
  ],
}
