var path = require('path')

module.exports = {
  entry: relative('./app.ts'),

  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {tsconfig: relative('../tsconfig.json')}
      },

      {test: /\.js/, loaders: ['babel-loader']}
    ]
  }
}

function relative(_path) {
  return path.join(__dirname, _path)
}
