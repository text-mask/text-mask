var path = require('path')
var webpack = require('webpack')
var coreLoaders = require('../core/webpack.buildCore.js').module.loaders

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../website/src/index.js')
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
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel-loader'],
      include: [
        path.join(__dirname, '../website/src/'),
        path.join(__dirname, '../react/')
      ]
    }, {
      // Process website/src/styles.scss as a regular Sass file
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
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
    }].concat(coreLoaders)
  }
}
