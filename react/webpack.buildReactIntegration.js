var StatsPlugin = require('stats-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, './src/reactTextMask.js'),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.join(__dirname, 'babel.config.js'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
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
