var StatsPlugin = require('stats-webpack-plugin')
var path = require('path')
var webpack = require('webpack')
var {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '../website/src/index.js'),
  output: {
    path: path.join(__dirname, '../website/static'),
    filename: 'bundle.js',
    publicPath: 'website/static/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new StatsPlugin('stats.json', {
      chunkModules: true,
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.join(__dirname, '.babelrc'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        // Process website/src/styles.scss as a regular Sass file
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.join(__dirname, '../website/src/styles.scss'),
      },
      {
        // Process all Sass files other than website/src/styles.scss as CSS Modules
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
        exclude: path.join(__dirname, '../website/src/styles.scss'),
      },
      {
        test: /\.(woff2?|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader',
      },
    ],
  },
}
