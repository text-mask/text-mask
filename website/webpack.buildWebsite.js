var StatsPlugin = require('stats-webpack-plugin')
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, '../website/src/index.js'),
  output: {
    path: path.join(__dirname, '../website/static'),
    filename: 'bundle.js',
    publicPath: 'website/static/'
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
    }),
    new StatsPlugin('stats.json', {
      chunkModules: true
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      include: [
        path.join(__dirname, 'src/'),
        path.join(__dirname, '../react/src/'),
        path.join(__dirname, '../core/src'),
        path.join(__dirname, '../addons/src'),
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
    }]
  }
}
