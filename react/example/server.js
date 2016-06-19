/* eslint-disable no-console */

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.runReactExample.js')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: __dirname,
  stats: {
    colors: true
  }
}).listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at localhost:3000')
})
