var StatsPlugin = require('stats-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname, './src/vanillaTextMask.js'),

  module: {
    loaders: [{test: /\.js$/, loaders: ['babel-loader']}],
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'vanillaTextMask.js',
    library: 'vanillaTextMask',
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
