/* eslint-disable no-console */

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.runWebsiteWithHotReloading.js')

const compiler = webpack({...config, mode: 'development'})

new WebpackDevServer(
  {
    hot: true,
    port: 3000,
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: '/website/static/index.html',
        },
      ],
    },
    devMiddleware: {
      publicPath: config.output.publicPath,
    },
  },
  compiler
).startCallback(function(err) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at localhost:3000')
})
