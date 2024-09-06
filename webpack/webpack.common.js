const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // developement server options
  devServer: {
    port: 10010
  },
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  // where to put compiled bundle file and how to name it
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js'
  },
  plugins: [
    //inject bundle.js file into index.html and copy it into the build folder
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html')
    })
  ],
  // process all files with extentions
  resolve: {
    //allows to import modules without extensions
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [{
      // process files by regex
      test: /\.(ts|js)x?$/,
      exclude: /\.?(node_modules|tmp)/,
      use: [{
        loader: 'babel-loader',
      }]
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },{
      test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
      type: 'asset/resource'
    },{
      test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
      type: 'asset/inline'
    }]
  }
}
