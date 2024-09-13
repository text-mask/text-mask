var StatsPlugin = require('stats-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname, './src/reactTextMask.js'),

  module: {
    loaders: [{test: /\.jsx?$/, loaders: ['babel-loader']}],
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'reactTextMask.js',
    library: 'reactTextMask',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['', '.jsx', '.js'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new StatsPlugin('stats.json', {
      chunkModules: true,
    }),
  ],

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
  ],
}
