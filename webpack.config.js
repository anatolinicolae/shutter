module.exports = {
  entry: [
    './src/Recorder.js',
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
    filename: 'bundle.js',
    library: 'Recorder'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};

