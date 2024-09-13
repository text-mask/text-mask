var StatsPlugin = require('stats-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, './src/index.js'),

  module: {
    rules: [{test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/}],
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'textMaskCore.js',
    library: 'textMaskCore',
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
