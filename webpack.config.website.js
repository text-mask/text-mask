var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./website/index.jsx'],
  output: {
    path: path.join(__dirname, 'website/static'),
    filename: 'bundle.js',
    publicPath: '/website/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ],
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
      test: /\.md/, loaders: ["html-loader", "markdown-loader"]
    }]
  }
};
