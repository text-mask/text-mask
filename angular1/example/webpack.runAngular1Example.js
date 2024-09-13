var path = require('path')
var webpack = require('webpack')
var coreLoaders = require('../../core/webpack.buildCore.js').module.loaders

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      path.join(__dirname, '../src/angular1TextMask.js'),
      path.join(__dirname, '/app.js'),
    ],
    vendor: ['angular'],
  },
  output: {
    path: path.join(__dirname, '/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  ],
  optimization: {
    emitOnErrors: false,
  },
  resolve: {extensions: ['', '.js']},
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel-loader'],
        include: [
          __dirname,
          path.join(__dirname, '../src'),
          path.join(__dirname, '../../core/src'),
        ],
      },
    ].concat(coreLoaders),
  },
}
