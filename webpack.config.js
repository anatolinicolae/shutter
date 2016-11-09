// The basic build process
module.exports = {
  entry: [
    './src/Shutter.js',
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'Shutter.js',
    library: 'Shutter',
    libraryTarget: 'umd',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};

