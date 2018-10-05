const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/app.js'),
    appCompat: path.resolve(__dirname, './src/appCompat.js'),
    test: path.resolve(__dirname, './src/test.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: ['babel-loader'],
      exclude: /node_modules/
    }]
  }
}
