var path = require('path')
var webpack = require('webpack')
var coreLoaders = require('../../core/webpack.buildCore.js').module.loaders

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/index.js')
  ],
  output: {
    path: path.join(__dirname, '/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel-loader'],
      include: [
        __dirname,
        path.join(__dirname, '../src'),
        path.join(__dirname, '../../core/src')
      ]
    }].concat(coreLoaders)
  }
}
