var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: './app/app.js'
  },
  //entry: [
    //'webpack-dev-server/client?http://localhost:3000',
    //'webpack/hot/only-dev-server',
    //'./index'
  //],
  output: {
    path: __dirname + './app',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/app/'
  },
  //output: {
    //path: path.join(__dirname, 'dist'),
    //filename: 'bundle.js',
    //publicPath: '/static/'
  //},
  devServer: {
    contentBase: './app',
    publicPath: 'http://localhost:8080/app/'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    },
  //  {
  //     test: /\.less/,
  //     loader: "style!css!less"
  //   },
    {
      test: /\.css?$/,
      loaders: ['style-loader','css-loader'],
      include: __dirname
    }]
  },
  plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
  ],
  resolve: {
    //alias: {
      //'redux': path.join(__dirname, '..', '..', 'src')
    //},
    "react": __dirname + './node_modules/react',
    extensions: ['', '.js', '.jsx']
  }
}
