// The basic build process
'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    './src/shutter.js'
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        test: /\.js$/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'shutter.js',
    library: 'Shutter',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: false,
      mangle: false
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  }
}

