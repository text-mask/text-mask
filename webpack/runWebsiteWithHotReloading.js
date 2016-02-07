var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../website/src/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '../website/static'),
    filename: 'bundle.js',
    publicPath: '/website/static/'
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
      include: path.join(__dirname, '../website/src/')
    }, {
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, '../src/')
    }, {
      test: /\.md/,
      loaders: ["html-loader", "markdown-loader"]
    }, {
      // Process website/src/styles.scss as a regular Sass file
      test: /\.scss$/,
      loaders: ["style", "css", "sass"],
      include: path.join(__dirname, '../website/src/styles.scss')
    }, {
      // Process all Sass files other than website/src/styles.scss as CSS Modules
      test: /\.scss$/,
      loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass'],
      exclude: path.join(__dirname, '../website/src/styles.scss'),
    }, {
      test: /\.(woff2?|svg)$/,
      loader: 'url?limit=10000'
    }, {
      test: /\.(ttf|eot)$/,
      loader: 'file'
    }]
  }
};
