var path = require('path')
var webpack = require('webpack')
var coreLoaders = require('../../core/webpack.buildCore.js').module.loaders

module.exports = {
  devtool: 'eval',
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, '/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  optimization: {
    emitOnErrors: false,
  },
  resolve: {
    alias: {vue: 'vue/dist/vue.js'},
    extensions: ['', '.js', '.vue'],
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ].concat(coreLoaders),
  },
}
