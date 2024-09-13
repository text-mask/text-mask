var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/index.js'),
  ],
  output: {
    path: path.join(__dirname, '/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    emitOnErrors: false,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
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
}
