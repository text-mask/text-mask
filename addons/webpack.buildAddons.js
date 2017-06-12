var StatsPlugin = require('stats-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    textMaskAddons: path.join(__dirname, './src/index.js'),
    createAutoCorrectedDatePipe: [path.join(__dirname, './src/createAutoCorrectedDatePipe.js')],
    createNumberMask: [path.join(__dirname, './src/createNumberMask.js')],
    emailMask: [path.join(__dirname, './src/emailMask.js')]
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/}
    ]
  },

  resolve: {
    extensions: ['', '.js']
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
  ]
}
