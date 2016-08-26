var StatsPlugin = require('stats-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname, './src/ionic2InputMask.ts'),

  module: {
    loaders: [
      {test: /\.ts$/, loader: 'awesome-typescript-loader', query: {
        tsconfig: './ionic2/tsconfig.json'
      }},
      {test: /\.js/, loaders: ['babel-loader']}
    ]
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'ionic2InputMask.js',
    library: 'ionic2InputMask',
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
      beautify: false,

      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },

      compress: {
        screw_ie8: true
      },

      comments: false
    }),
    new StatsPlugin('stats.json', {
      chunkModules: true
    })
  ],

  externals: [
    {
      '@angular/core': {
        root: ['ng', 'core'],
        commonjs: '@angular/core',
        commonjs2: '@angular/core',
        amd: '@angular/core'
      },

      '@angular/forms': {
        root: ['ng', 'forms'],
        commonjs: '@angular/forms',
        commonjs2: '@angular/forms',
        amd: '@angular/forms'
      }
    }
  ]
}
