const path = require('path')

module.exports = {
  entry: './src/shutter.js',

  output: {
    path: path.resolve('dist'),
    filename: 'shutter.js',
    library: 'Shutter',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }]
  }
}
