var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'eval-source-map',
  entry: [path.join(__dirname, '../website/src/index.js')],
  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
  },
  output: {
    path: path.join(__dirname, '../website/static'),
    filename: 'bundle.js',
    publicPath: '/website/static/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html'),
      inject: false,
    }),
  ],
  optimization: {
    emitOnErrors: false,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react-dom': require.resolve(
        '@hot-loader/react-dom/cjs/react-dom.development.js'
      ),
      'react/jsx-runtime': require.resolve(
        'react/cjs/react-jsx-runtime.development.js'
      ),
      react$: require.resolve('react/cjs/react.development.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-hot-loader/babel'],
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
