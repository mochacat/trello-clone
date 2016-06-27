var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'sourcemaps',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.png|svg|jpg$/, loader: 'url-loader?limit=1024' },
      { test: /\.(otf|eot|ttf|woff|woff2)$/, loader: 'file' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};