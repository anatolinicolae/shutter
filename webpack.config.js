// The basic build process
module.exports = {
  entry: [
    './src/Shutter.js',
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel'],
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'main.js',
    library: 'Shutter',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};

