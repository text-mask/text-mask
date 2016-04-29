var path = require('path')

module.exports = {
  entry: relative('./app.ts'),
  output: {
    path: __dirname,
    filename: './dist/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      {test: /\.ts/, loaders: ['ts-loader']},

      {test: /\.js/, loaders: ['babel-loader']}
    ]
  }
}

function relative(_path) {
  return path.join(__dirname, _path)
}
