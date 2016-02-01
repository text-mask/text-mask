var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './gh-pages/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/gh-pages/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      'redux': path.join(__dirname, 'node_modules/redux')
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel-loader'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, '..', '..', 'src')
    }, {
      test: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
    }, {
      test: /\.md/, loaders: ["html-loader", "markdown-loader"]
    }]
  }
};
