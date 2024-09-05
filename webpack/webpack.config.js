const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // set  process.env.NODE_ENV to development
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
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      }
    ]
  }
}
