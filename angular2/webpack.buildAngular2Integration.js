var StatsPlugin = require('stats-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname, './src/angular2TextMask.ts'),

  module: {
    loaders: [
      {test: /\.ts/, loaders: ['ts-loader']},
      {test: /\.js/, loaders: ['babel-loader']}
    ]
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'textMask.js',
    library: 'textMask',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.ts', '.js']
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

  externals: [
    {
      'angular2/core': {
        root: ['ng', 'core'],
        commonjs: 'angular2/core',
        commonjs2: 'angular2/core',
        amd: 'angular2/core'
      },

      'angular2/common': {
        root: ['ng', 'common'],
        commonjs: 'angular2/common',
        commonjs2: 'angular2/common',
        amd: 'angular2/common'
      }
    }
  ]
}
