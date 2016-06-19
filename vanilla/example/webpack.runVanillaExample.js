var path = require('path')
var webpack = require('webpack')
var coreLoaders = require('../../core/webpack.buildCore.js').module.loaders

module.exports = {
  devtool: 'eval',
  entry: [path.join(__dirname, '/index.js')],
  output: {
    path: path.join(__dirname, '/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [new webpack.NoErrorsPlugin()],
  resolve: {extensions: ['', '.js']},
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel-loader'],
      include: [
        __dirname,
        path.join(__dirname, '../src'),
        path.join(__dirname, '../../core/src')
      ]
    }].concat(coreLoaders)
  }
}
