var path = require("path");
var webpack = require("webpack");
var _ = require('lodash');
var argv = require('minimist')(process.argv.slice(2));
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/app.js'
  },
  output: {
    path: __dirname + './app',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/app/'
  },
  devServer: {
    contentBase: './app',
    publicPath: 'http://localhost:8080/app/'
  },
  module: {
   loaders: [
     { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
     { test: /\.css$/, loader: 'style-loader!css-loader' },
     { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
   ]
  },
   plugins: [
     new webpack.HotModuleReplacementPlugin()
   ]
}
